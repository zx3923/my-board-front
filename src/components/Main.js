import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const write = () => {
    if (sessionStorage.getItem("logined")) {
      navigate("/write");
    } else {
      alert("로그인하세요");
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          write();
        }}
      >
        글 쓰기
      </button>
      <button
        onClick={() => {
          navigate("/list");
        }}
      >
        게시글
      </button>
    </div>
  );
};

export default Main;
