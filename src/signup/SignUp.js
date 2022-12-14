import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const post = () => {
    axios({
      method: "post",
      url: "http://localhost:8090/user/signup",
      data: {
        password: Password,
        userName: UserName,
        userId: UserId,
        confirmPassword: ConfirmPassword,
      },
    }).then((response) => {
      if (response.data === "성공했습니다.") {
        alert(response.data);
        navigate("/");
      } else {
        alert(response.data);
      }
    });
  };
  return (
    <>
      <div>회원가입</div>
      <div>
        <div>
          <span>이름 : </span>
          <input
            type="text"
            value={UserName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <span>비밀번호 확인 : </span>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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

export default SignUp;
