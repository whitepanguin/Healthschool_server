import PopularQuesetion from "../../models/help/popularQuesetionSchema.js"
import notice from "../../models/help/notice.js";
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



