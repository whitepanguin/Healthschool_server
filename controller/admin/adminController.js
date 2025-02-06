import Certify from "../../models/certifySchema.js";
import User from "../../models/userSchema.js";

const getCertifyList = async (req, res) => {
  try {
    const certifyRequests = await Certify.find();
    res.json(certifyRequests); // 동영상 목록 반환
    console.log(certifyRequests)
  } catch (err) {
    console.error("Error fetching certifyRequests:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const updateCertifyStatus = async (req, res) => {
  try {
    const { id } = req.params;  // Certify ID
    const { isCertified } = req.body;  // 인증 상태

    // 인증 상태 업데이트
    const updatedCertify = await Certify.findByIdAndUpdate(
      id,
      { isCertified },
      { new: true }
    );

    if (!updatedCertify) {
      return res.status(404).json({ message: "인증 요청을 찾을 수 없습니다." });
    }

    // 해당 유저의 isTeacher 상태 업데이트
    await User.findOneAndUpdate(
      { email: updatedCertify.email },
      { isTeacher: isCertified }
    );

    res.status(200).json({
      success: true,
      message: `강사 인증 상태가 ${isCertified ? "승인" : "거절"}되었습니다.`,
      certify: updatedCertify
    });
  } catch (error) {
    console.error("인증 상태 변경 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};

export {
  getCertifyList
};