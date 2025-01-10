import mongoose from 'mongoose';
import Comment from '../../models/commentSchema.js';  // 댓글 모델 불러오기
const connection_url = `mongodb+srv://app:1234@app.lixyw.mongodb.net/`;  // DB 연결 URL

const connect = async () => {
  try {
    await mongoose.connect(connection_url, { dbName: 'app' });  // DB에 연결
    console.log("MongoDB connected successfully.");
    
    // 모든 댓글에 replyCount 필드를 0으로 업데이트
    const result = await Comment.updateMany({}, { $set: { replyCount: 0 } });
    
    console.log(`Successfully added replyCount to ${result.nModified} comments.`);
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    mongoose.disconnect();  // 연결 종료
  }
};

connect();
