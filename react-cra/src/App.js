import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import FortuneTeller from "./pages/teller/FortuneTeller";
import MyPage from "./pages/mypage/MyPage";
import Board from "./pages/board/Board";
import FortuneDetail from "./pages/board/fortune_id/FortunePostDetail";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/common/Header";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/teller" element={<FortuneTeller />} />
        <Route path="/mypage" element={<MyPage />}/>
        <Route path="/board" element={<Board userFilter={false}/>} />
        <Route path="/board/:fortune_id" element={<FortuneDetail />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
