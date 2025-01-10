import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  userProfile: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },  // 동영상 ID를 참조
  replyCount: { type: Number, default: 0 },  // 대댓글 수 추가
});

const Comment = mongoose.model('Comment', commentSchema, "comments");

export default Comment;
