import axiosInstance from "./axiosInstance";

export const fortuneSave = async (data) => {
  const { email, fortune_data, fortune_date, show } = data;

  try {
    const response = await axiosInstance.post("/board/fortunes", {
      email: email,
      fortune_data: fortune_data,
      show: show,
    });
    return response.data;
  } catch (err) {
    console.error("생성 실패");
    throw err;
  }
};

// 글 가져오기
export const boardGet = async (data) => {
  const { p, u } = data;
  const APItarget = `/board/fortunes?${p!==undefined?`p=${p}`:''}${u!==undefined?`&u=${u}`:''}`
  try {
    const response = await axiosInstance.get(APItarget);
    return response.data;
  } catch (err) {
    console.error("불러오기 실패");
    throw err;
  }
};

export const postDelete = async (data) => {
  const { postId } = data;
  try{
    const response = await axiosInstance.delete(`/board/fortunes/${postId}`)
    return response.data;
  }catch(err){
    console.error("불러오기 실패");
    throw err;
  }
}