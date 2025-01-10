import PopularQuesetion from "../../models/help/popularQuesetionSchema.js"

export const getPopularQuestion = async  (req, res) => {
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


