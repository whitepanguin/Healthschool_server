import Video from '../../models/videoSchema.js';
import Comment from '../../models/commentSchema.js';
import ReplyComment from '../../models/replyCommentScehema.js';
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from 'mongoose';

const createFolderIfNotExists = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// ✅ [2] Multer 저장소 설정 (비디오 & 썸네일)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "thumbnail" ? "uploads/thumbnails" : "uploads/videos";
    createFolderIfNotExists(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// ✅ [3] Multer 미들웨어 설정 (비디오 & 썸네일 동시 업로드)
export const upload = multer({ storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 }
]);

// ✅ 비디오 & 썸네일 업로드 API (최종 수정)
export const uploadVideoWithThumbnail = async (req, res) => {
  try {
    console.log("📂 요청된 바디 데이터:", req.body);
    console.log("📂 요청된 파일들:", req.files);

    // ✅ 파일이 정상적으로 업로드되었는지 확인
    if (!req.files || !req.files["thumbnail"] || !req.files["video"]) {
      return res.status(400).json({ error: "비디오 및 썸네일을 모두 업로드해야 합니다." });
    }

    const thumbnailFile = req.files["thumbnail"][0];
    const videoFile = req.files["video"][0];
    const baseUrl="http://localhost:8000";
    const imageUrl = `${baseUrl}/uploads/thumbnails/${thumbnailFile.filename}`;
    const videoUrl = `${baseUrl}/uploads/videos/${videoFile.filename}`;

    // ✅ 현재 날짜 저장
    const currentDate = new Date();

    // ✅ DB에 저장
    const newVideo = new Video({
      title: req.body.title || "제목 없음",
      email: req.body.email || "unknown@example.com",
      nickname: req.body.nickname || "익명 사용자",
      viewCount: 0,
      likeCount: 0,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      videoUrl,
      imageUrl,
      description: req.body.description || "",
      uploadDate: currentDate, // ✅ 생성 날짜
      updateDate: currentDate, // ✅ 생성 날짜와 동일하게 설정
      userProfile: req.body.userProfile,
    });

      const savedVideo = await newVideo.save();
      res.status(201).json({ message: "비디오 업로드 성공", video: savedVideo });
    } catch (error) {
      console.error("❌ MongoDB 저장 오류:", error);
      res.status(500).json({ error: "비디오 저장 실패" });
    }
    
};
// 🟢 [6] 동영상 목록 조회 API
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
// viewcount증가
export const getVideoAndIncViewCount = async (req, res) => {
  const { videoId } = req.params;

  try {
    // MongoDB의 $inc 연산자를 사용해 viewCount 증가
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { viewCount: 1 } },
      { new: true } // 업데이트된 이후의 문서를 반환
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: '해당 비디오를 찾을 수 없습니다.' });
    }

    // 성공 시 업데이트된 비디오 데이터를 응답
    res.json(updatedVideo);
  } catch (error) {
    console.error('getVideoAndIncViewCount error:', error);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
};

// 🟢 [7] 댓글 및 대댓글 API
export const getComments = async (req, res) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.find({ videoId }).sort({ uploadDate: -1 });
    if (!comments) return res.status(404).json({ error: '댓글이 없습니다.' });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
};

export const addComments = async (req, res) => {
  const { content, nickname, email, userProfile, videoId, replyCount } = req.body;
  const newComment = new Comment({ content, nickname, email, userProfile, videoId, replyCount });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: '댓글 저장 실패' });
  }
};
export const deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const { email } = req.body; // 클라이언트에서 전달된 사용자 이메일 (본인 확인)

  try {
    // 🔹 1️⃣ 삭제할 댓글이 존재하는지 확인
    const comment = await Comment.findOne({ _id: commentId, videoId });

    if (!comment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }

    // 🔹 2️⃣ 삭제 권한 확인 (댓글 작성자만 삭제 가능)
    if (comment.email !== email) {
      return res.status(403).json({ error: "댓글 삭제 권한이 없습니다." });
    }

    // 🔹 3️⃣ 대댓글이 존재하는지 확인
    const replyCount = comment.replyCount;

    // 🔹 4️⃣ 트랜잭션 시작 (원자적 처리)
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 🔹 5️⃣ 대댓글 삭제 (해당 댓글의 대댓글 전체 삭제)
      if (replyCount > 0) {
        await ReplyComment.deleteMany({ parentCommentId: commentId }, { session });
      }

      // 🔹 6️⃣ 댓글 삭제
      await Comment.deleteOne({ _id: commentId, videoId }, { session });

      // 🔹 7️⃣ 트랜잭션 커밋 (완료)
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
    } catch (error) {
      // ❌ 트랜잭션 롤백 (에러 발생 시)
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("❌ 댓글 삭제 오류:", error);
    return res.status(500).json({ error: "서버 오류로 댓글 삭제에 실패했습니다." });
  }
};

export const getReplyComments = async (req, res) => {
  const { commentId } = req.params;
  try {
    const replies = await ReplyComment.find({ parentCommentId: commentId }).sort({ uploadDate: -1 });
    if (!replies.length) return res.status(404).json({ error: '대댓글이 없습니다.' });
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
};

export const addReplyComments = async (req, res) => {
  const { content, email, nickname, userProfile, uploadDate } = req.body;
  const { commentId } = req.params;
  try {
    const newReply = new ReplyComment({ parentCommentId: commentId, content, email, nickname, userProfile, uploadDate });
    const savedReply = await newReply.save();
    await Comment.updateOne({ _id: commentId }, { $inc: { replyCount: 1 } });
    res.status(201).json(savedReply);
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
};

export const deleteReplyComments = async (req, res) => {
  const { parentId, childId } = req.params;
  const { email } = req.body;
  try {
    const reply = await ReplyComment.findOne({ _id: childId, parentCommentId: parentId });
    if (!reply) return res.status(404).json({ error: '대댓글이 없습니다.' });
    if (reply.email !== email) return res.status(403).json({ error: '삭제할 권한이 없습니다.' });

    await ReplyComment.deleteOne({ _id: childId });
    await Comment.updateOne({ _id: parentId }, { $inc: { replyCount: -1 } });

    res.status(200).json({ message: '대댓글 삭제됨' });
  } catch (err) {
    res.status(500).json({ error: '서버 오류' });
  }
};
