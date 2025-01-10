// controller/videoController.js
import Video from '../../models/videoSchema.js';
import Comment from '../../models/commentSchema.js';
import mongoose from 'mongoose';
import ReplyComment from '../../models/replyCommentScehema.js';
// 동영상 목록 조회
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos); // 동영상 목록 반환
    console.log(videos)
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export const getReplyComments = async (req, res) => {
  const { commentId } = req.params;  // URL에서 commentId 받아오기

  try {
    // 부모 댓글에 해당하는 대댓글들을 찾음
    const replies = await ReplyComment.find({ parentCommentId: commentId }).sort({ uploadDate: -1 });  // 최신 순으로 정렬

    if (!replies || replies.length === 0) {
      return res.status(404).json({ error: '대댓글이 없습니다.' });
    }

    res.status(200).json(replies);  // 대댓글 목록 반환
  } catch (err) {
    console.error("대댓글 조회 중 오류 발생:", err);
    res.status(500).json({ error: "서버 오류" });
  }
};

export const getComments = async (req, res) => {
  const { videoId } = req.params;  // URL에서 videoId 받기
  console.log(videoId)
  try {
    // 해당 동영상에 속한 댓글 조회
    const comments = await Comment.find({ videoId }).sort({ uploadDate: -1 });  // 최신 댓글 먼저 가져오기

    if (!comments) {
      return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
    }
    console.log(comments)
    res.status(200).json(comments);  // 댓글 목록 반환
  } catch (error) {
    console.error('댓글 조회 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류' });
  }
}; 
// 동영상 추가
export const addVideo = async (req, res) => {
  const { title, email, nickname, viewCount, likeCount, tags, videoUrl, imageUrl, description } = req.body;

  const newVideo = new Video({
    title,
    email,
    nickname,
    viewCount,
    likeCount,
    tags,
    videoUrl,
    imageUrl,
    description,
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo); // 동영상 추가 후 응답
  } catch (err) {
    console.error("Error saving video:", err);
    res.status(500).json({ error: "Failed to add video" });
  }
};

export const addComments = async (req, res) => {
  const { content, nickname, email, userProfile, videoId, replyCount } = req.body;

  // 댓글 정보로 새로운 댓글 객체 생성
  const newComment = new Comment({
    content,
    nickname,
    email,
    userProfile,
    videoId, // 해당 댓글이 속한 동영상의 ID
    replyCount, // 대댓글 수 (기본 0)
  });

  try {
    // 댓글 저장
    const savedComment = await newComment.save();

    // 저장된 댓글 응답
    res.status(201).json(savedComment); 
  } catch (err) {
    console.error('댓글 추가 중 오류 발생:', err);
    res.status(500).json({ error: '댓글을 저장하는 데 실패했습니다.' });
  }
};
