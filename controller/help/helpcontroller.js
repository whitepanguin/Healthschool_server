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


export const postChat = async (req, res) => {
  const { title, email,content } = req.body;

  try {
    await PostChat.create({
      title : req.boy.title,
      email: req.body.email,
      content : req.body.content
    });
    const saveChat = await newChat.save();
    res.status(201).json(saveChat); // 동영상 추가 후 응답
  } catch (err) {
    console.error("Error saving store:", err);
    res.status(500).json({ error: "Failed to add chat" });
  }
};



