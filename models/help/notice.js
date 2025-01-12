import { Schema, model } from "mongoose";
import { getCurrentTime } from "../../utils/utils.js";

//제목 내용 날짜짜
const noticeSchema = new Schema({
    title : {type: String, require : true},
    content : {type: String, require : true},
    createdAt: { type: String, default: getCurrentTime },
    updatedAt: { type: String, default: getCurrentTime },
  });
  
  // model("객체명", 스키마, "컬렉션(테이블)명");
  export default model("Notice", noticeSchema, "notices");
