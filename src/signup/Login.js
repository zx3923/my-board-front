import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      post();
    }
  };

  const post = () => {
    axios({
      method: "post",
      url: "http://localhost:8090/user/login",
      data: {
        userId: UserId,
        password: Password,
      },
    }).then((response) => {
      console.log(response.data);
      if (response.data.aboolean) {
        sessionStorage.setItem("loginid", response.data.userId);
        sessionStorage.setItem("logined", response.data.aboolean);
        sessionStorage.setItem("named", response.data.userName);
        alert("로그인에 성공했습니다.");
        navigate("/");
        window.location.reload();
      } else {
        alert("실패!");
      }
    });
  };
  return (
    <>
      <div>로그인</div>
      <div>
        <div>
          <span>아이디 : </span>
          <input
            type="text"
            value={UserId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        </div>
        <div>
          <span>비밀번호 : </span>
          <input
            type="password"
            value={Password}
            onKeyUp={handleKeyPress}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          post();
        }}
      >
        확인
      </button>
    </>
  );
};

export default Login;
