import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
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
            type="text"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          console.log(" " + UserId + " " + Password);
        }}
      >
        확인
      </button>
    </>
  );
};

export default Login;
