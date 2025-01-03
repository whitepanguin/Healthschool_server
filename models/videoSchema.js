// models/videoSchema.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  email: String,
  nickname: String,
  viewCount: Number,
  likeCount: Number,
  uploadDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  tags: [String],
  videoUrl: String,
  imageUrl: String,
  description: String,
});

const Video = mongoose.model('Video', videoSchema,"videos");
export default Video;
