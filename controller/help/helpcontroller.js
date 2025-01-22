import PopularQuesetion from "../../models/help/popularQuesetionSchema.js"
import notice from "../../models/help/notice.js";
import PostChat from "../../models/help/postChat.js";
import { create } from "domain";

export const getPopularQuestion = async (req, res) => {
  console.log("getPopularQuestion")
  try {
    const quesetions = await PopularQuesetion.find();
    res.json(quesetions); // 동영상 목록 반환
    console.log(quesetions)
  } catch (err) {
    console.error("Error fetching quesetions:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const getNotice = async (req, res) => {
  console.log("getPopularQuestion")
  try {
    const notices = await notice.find();
    res.json(notices); // 동영상 목록 반환
    console.log(notices)
  } catch (err) {
    console.error("Error fetching notices:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const getPostChat = async (req, res) => {
  const { email } = req.body;  // URL에서 postChat ID 받기
  console.log(email);
  const foundemail = await PostChat.find({ email: email }).lean();
  console.log(foundemail)
  try {
    // postChat ID를 ObjectId로 변환
    res.status(200).json(foundemail);
    // 댓글에서 content만 조회
    // const content = await Comment.find({ postChat: postChatId })
    //   .select('content')  // content 필드만 가져오기
    //   .sort({ content : -1 });  // 최신 댓글 먼저 가져오
  } catch (error) {
    console.error('댓글 조회 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류' });
  }
}; 



export const postChat = async (req, res) => {
  const { title, content, email } = req.body;

  try {
    // 데이터 생성 후 바로 저장된 데이터 반환
    const saveChat = await PostChat.create({
      title: title,
      email: email,
      content: content
    });

    // 저장된 데이터를 클라이언트에 응답으로 보냄
    res.status(201).json(saveChat);
  } catch (err) {
    console.error("Error saving store:", err);
    res.status(500).json({ error: "Failed to add chat" });
  }
};



