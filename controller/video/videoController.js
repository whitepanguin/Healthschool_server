// controller/videoController.js
import Video from '../../models/videoSchema.js';

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
