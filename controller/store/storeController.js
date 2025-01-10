// controller/videoController.js
import Store from '../../models/storeSchema.js';

// 동영상 목록 조회
export const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores); // 동영상 목록 반환
    console.log(stores)
  } catch (err) {
    console.error("Error fetching stores:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 동영상 추가
export const addStore = async (req, res) => {
  const { title, subtitle, detail, productName, email, description, additionTitle, productPrice, additionPrice, uploadDate, PayDate, tags, imageUrl } = req.body;

  const newVideo = new Video({
    title,
    subtitle,
    detail,
    productName,
    email,
    description,
    additionTitle,
    productPrice,
    additionPrice,
    uploadDate,
    PayDate, 
    tags, 
    imageUrl,  
  });

  try {
    const savedStore = await newStore.save();
    res.status(201).json(savedStore); // 동영상 추가 후 응답
  } catch (err) {
    console.error("Error saving store:", err);
    res.status(500).json({ error: "Failed to add store" });
  }
};
