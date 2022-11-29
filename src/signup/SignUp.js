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
    axios
      .post("http://localhost:8088/", {
        UserName,
        UserId,
        Password,
        ConfirmPassword,
      })
      .then((resopnse) => {
        if (resopnse.data == true) {
          alert("회원가입 성공");
          navigate("/");
        } else if (resopnse.data == false) {
          alert("다시 입력해 주세요");
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
            type="text"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <span>비밀번호 확인 : </span>
          <input
            type="text"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          console.log(
            UserName + " " + UserId + " " + Password + " " + ConfirmPassword
          );
          post();
        }}
      >
        확인
      </button>
    </>
  );
};

export default SignUp;
