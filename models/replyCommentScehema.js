// models/replyCommentSchema.js
import mongoose from 'mongoose';

// 대댓글 스키마 정의
const replyCommentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // 대댓글 내용
  email: { type: String, required: true }, // 작성자 이메일
  nickname: { type: String, required: true }, // 작성자 닉네임
  userProfile: { type: String, required: true }, // 작성자 프로필 사진 URL
  uploadDate: { type: Date, default: Date.now }, // 대댓글 업로드 날짜
  parentCommentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment', 
    required: true 
  }, // 참조하는 댓글의 ObjectId
  likeCount: { type: Number, default: 0 }, // 대댓글 좋아요 수
}, { timestamps: true }); // `timestamps` 옵션으로 createdAt과 updatedAt 자동 생성

// 대댓글 모델 정의
const ReplyComment = mongoose.model('ReplyComment', replyCommentSchema, 'replycomments');

export default ReplyComment;
