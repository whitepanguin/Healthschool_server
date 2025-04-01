import mongoose from "mongoose";

const connection_url = `mongodb+srv://admin:admin@app.lixyw.mongodb.net/?retryWrites=true&w=majority&appName=app`;

const connect = () => {
  if (process.env.NODE_ENV != "production") {
    mongoose.set("debug", true);
  }

  mongoose
    .connect(connection_url, {
      dbName: "app", // 프로젝트 이름
    })
    .then(() => {
      console.log("Connection to MongoDB"); // 연결 성공
    })
    .catch((err) => {
      console.error("Connected fail to MongDB"); // 연결 실패
      console.log(err);
    });
};

export default connect;
