import React from "react";

const Main = () => {
  // sessionStorage.getItem("logined")
  return (
    <div>
      <a href="/write">글 쓰기</a>
      <button
        onClick={() => {
          console.log(sessionStorage.getItem("logined"));
          console.log(sessionStorage.getItem("named"));
        }}
      >
        확인
      </button>
    </div>
  );
};

export default Main;
