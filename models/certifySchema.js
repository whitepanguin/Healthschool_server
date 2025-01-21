import mongoose from 'mongoose';

// 강사 인증 스키마 정의
const certifySchema = new mongoose.Schema({
  email: { type: String, required: true },          
  qualifyNumber: { type: String, required: true }, 
  imageUrls: [{ type: String, required: true }],
  isCertified : { type : Boolean, default: false }   
}, { timestamps: true }); 

const Certify = mongoose.model('Certify', certifySchema, 'certify');

export default Certify;
