// controller/videoController.js
import Store from '../../models/storeSchema.js';
import Receipt from '../../models/receiptSchema.js';

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
export const getreceipt = async (req, res) => {
  try {
    const { ids } = req.body;
    const receipts = await Receipt.find({ _id: { $in: ids } });
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

export const checkStore  = async (req, res) => {
  try {
    const { ids } = req.body;
    const stores = await Store.find({ _id: { $in: ids } });
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

export const addStore = async (req, res) => {
  const { title, subtitle, detail, productName, email, description, additionTitle, productPrice, additionPrice, uploadDate, PayDate, tags, imageUrl,  option1, } = req.body;

  const newStore = new Store({
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
    option1
  });

  try {
    const savedStore = await newStore.save();
    res.status(201).json(savedStore); // 동영상 추가 후 응답
  } catch (err) {
    console.error("Error saving store:", err);
    res.status(500).json({ error: "Failed to add store" });
  }
};

export const addreceipt = async (req, res) => {
  const { storeid, name, email, title, productPrice, option1, additionTitle, additionPrice } = req.body;

  // 댓글 정보로 새로운 댓글 객체 생성
  const newReceipt = new Receipt({
    storeid,
    name, 
    email, 
    title, 
    productPrice, 
    option1, 
    additionTitle, 
    additionPrice,
  });

  try {
    const savedReceipt = await newReceipt.save();

    res.status(201).json(savedReceipt); 
  } catch (err) {
    console.error('결제 중 오류 발생:', err);
    res.status(500).json({ error: '결제을 저장하는 데 실패했습니다.' });
  }
  
};