import path from 'path';
import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";

const salt = await bcrypt.genSalt(10);

// 회원가입
const register = async (req, res) => {
  console.log(req.body);
  // 1) 기존 회원이 있는지 검사한다.
  const foundUser = await User.findOne({ email: req.body.email }).lean();
  if (foundUser) {
    // 있으면
    return res.status(409).json({
      registerSuccess: false,
      message: "이미 존재하는 이메일입니다.",
    });
  } else {
    // 2) 비밀번호를 암호화 한다.
    // 높을수록 시간이 오래걸리고, 보안이 높다.
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3) 회원의 정보를 DB에 INSERT한다.
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      birthDate: req.body.birthDate,
      nickname: req.body.nickname,
    });

    return res.status(201).json({
      registerSuccess: true,
      message: "축하합니다. 회원가입이 완료되었습니다.",
    });
  }
};

// 로그인
const login = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email: email }).lean();
  const validPassword = await bcrypt.compare(password, foundUser.password);

  // 방어 코드, early return
  if (!foundUser) {
    // 회원이 없으면
    return res.status(409).json("회원이 아닙니다.");
  } else {
    // 회원인 상태
    if (!validPassword) {
      return res.status(409).json({
        loginSuccess: false,
        message: "이메일과 비밀번호를 확인해 주세요.",
      });
    }
    // 아이디와 비밀번호가 일치하는 유저
    // 1) 회원 정보를 보낸다.
    const { password, ...currentUser } = foundUser;

    res.status(200).json({
      loginSuccess: true,
      message: "로그인 성공하였습니다.",
      currentUser: currentUser,
    });
    // 2) JWT(Json Web Token)토큰은 소셜에서 추후 같이 사용.
  }
};

// 20분
// 회원정보 수정
const modify = async (req, res) => {
  const { email } = req.body;
  // 회원 정보를 수정한다.
  const foundUser = await User.findOne({ email: email }).lean();
  if (!foundUser) {
    res.status(400).json({
      updateSuccess: false,
      message: "업데이트를 할 수 없습니다",
    });
  } else {
    await User.updateOne(foundUser, req.body);
    const updatedUser = await User.findOne({ email: email }).lean();
    res.status(200).json({
      updateSuccess: true,
      message: "성공적으로 업데이트가 완료되었습니다.",
      currentUser: updatedUser,
    });
  }
};

// 회원 탈퇴
const remove = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email: email }).lean();
  await User.deleteOne(foundUser);

  res.status(200).json({
    updateSuccess: true,
    message: "회원탈퇴 완료. 다음생에 만나요",
    currentUser: updatedUser,
  });
};

const updatePicture = async (req, res) => {
  const uploadFolder = "uploads/profiles";
  const relativePath = path.join(uploadFolder, req.file.filename).replaceAll("\\", "/")

  // mongoDB에 저장한다.
  // 유저를 찾는다
  // 유저를 .updateOne(foundUser, {picture})

  res.status(200).json({
    message : "업로드 완료",
    filePath : `${relativePath}`
  })
}

export { register, login, modify, remove, updatePicture };
