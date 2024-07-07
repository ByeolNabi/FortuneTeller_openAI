import axiosInstance from "./axiosInstance";

export const fetchFortune = async (fortuneData) => {
  const { fortune_type, user_message } = fortuneData;
  console.log(fortuneData);
  try {
    const response = await axiosInstance.post("/fortune", {
      fortune_type: fortune_type,
      user_message: user_message,
    });
    return response.data;
  } catch (err) {
    console.error("GPT fortune API 호출에 실패했습니다.");
    throw err;
  }
};
