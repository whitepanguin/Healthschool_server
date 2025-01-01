
import express from "express";
import bodyParser from "body-parser";
import connect from "./connect/connect.js";
import cors from "cors";

import dotenv from "dotenv";
import rootRouter from "./routes/index.js";
import passport from "passport";
import { initializePassport } from "./auth/auth.js";

//이미지 등록
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connect(); // Mongoose 연결
dotenv.config(); // dotenv 연결

const app = express();
const port = 8000;

// CORS 설정 (여기 추가)
app.use(cors({
  origin: "*", // 모든 도메인 허용 (개발 환경)
  methods: ["GET", "POST", "DELETE", "PUT"], // 허용할 HTTP 메서드
  credentials: true // 인증 정보 포함 여부
}));

// 정적 파일 제공 및 비디오 디렉토리 설정
const videoDirectory = path.join(__dirname, "videos");
app.use("/videos", express.static(videoDirectory));

// 미들웨어 설정
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// 비디오 목록 API
app.get("/api/videos", (req, res) => {
  fs.readdir(videoDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "비디오 파일 목록을 불러오지 못했습니다." });
    }

    const videoList = files.map((file) => ({
      name: file,
      url: `http://localhost:${port}/videos/${file}`,
    }));

    res.status(200).json(videoList);
  });
});

// Passport 초기화
app.use(passport.initialize());
initializePassport();

// 이미지 업로드 설정
const uploadFolder = "uploads/profiles";
const getUniqueFileName = (originalName, uploadFolder) => {
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  let uniqueName = originalName;
  let counter = 1;

  while (fs.existsSync(path.join(uploadFolder, uniqueName))) {
    uniqueName = `${baseName}(${counter})${ext}`;
    counter++;
  }
  return uniqueName;
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.join(__dirname, "./uploads/profiles"));
    },
    filename(req, file, done) {
      const uniqueFileName = getUniqueFileName(file.originalname, uploadFolder);
      done(null, uniqueFileName);
    },
  }),
});

const uploadMiddleware = upload.single("picture");

// 정적 파일 및 라우터 설정
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(uploadMiddleware);
app.use("/", rootRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${port}`);
});

