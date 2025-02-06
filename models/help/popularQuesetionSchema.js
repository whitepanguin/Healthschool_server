import { Schema, model } from "mongoose";
import { getCurrentTime } from "../../utils/utils.js";


const popularQuesetionSchema = new Schema({
    topic : {type: String, require : true},
    title : {type: String, require : true},
    answer : {type: String, require : true},
    createdAt: { type: String, default: getCurrentTime },
    updatedAt: { type: String, default: getCurrentTime },
  });
  
  // model("객체명", 스키마, "컬렉션(테이블)명");
  export default model("PopularQuesetion", popularQuesetionSchema, "quesetions");