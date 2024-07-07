import axiosInstance from "./axiosInstance";

export const userSignin = async (data) => {
  const { userid, userpw } = data;
  try {
    const response = await axiosInstance.post("/signin", {
      userid: userid,
      userpw: userpw,
    });
    return response.data;
  } catch (err) {
    console.error("로그인 실패");
    throw err;
  }
};

export const userSignup = async (data) => {
  const { userid, userpw, name } = data;
  try {
    const response = await axiosInstance.post("/signup", {
      userid: userid,
      userpw: userpw,
      name: name,
    });
    return response.data;
  } catch (err) {
    console.error("회원가입 실패");
    throw err;
  }
};

export const userGet = async (data) => {
  const { userid } = data;
  try {
    const response = await axiosInstance.get(`/user/${userid}`);
    return response;
  } catch (err) {
    console.error("유저 정보 가져오기 실패");
    throw err;
  }
};
