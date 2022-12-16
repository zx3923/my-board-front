import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/styles.module.css";

const AccountModify = () => {
  const navigete = useNavigate();
  const [password, setPassword] = useState("");
  const [changePassword, setCgangePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (password === "") {
        alert("비밀번호를 확인하세요");
      } else {
        cehckPassword();
      }
    }
  };
  const handleKeyPress2 = (e) => {
    if (e.key === "Enter") {
      if (changePassword === "") {
        alert("비밀번호를 확인하세요");
      } else if (confirmPassword === "") {
        alert("비밀번호를 확인하세요");
      } else {
        modifyPassword();
      }
    }
  };

  const cehckPassword = () => {
    axios({
      method: "post",
      url: "http://localhost:8090/user/check",
      data: {
        userId: sessionStorage.getItem("loginid"),
        password: password,
      },
    }).then((response) => {
      if (!response.data) {
        alert("비밀번호를 확인하세요");
      } else {
        setLoginCheck(response.data);
        alert("확인되었습니다.");
      }
    });
  };
  const modifyPassword = () => {
    axios({
      method: "patch",
      url: "http://localhost:8090/user/modify",
      data: {
        userId: sessionStorage.getItem("loginid"),
        password: changePassword,
        confirmPassword: confirmPassword,
      },
    }).then((response) => {
      if (response.data) {
        alert("비밀번호를 변경했습니다.");
        sessionStorage.clear();
        navigete("/");
      } else {
        alert("비밀번호를 확인하세요");
      }
    });
  };
  const deleteAccount = () => {
    axios({
      method: "delete",
      url: "http://localhost:8090/user/delete",
      data: {
        userId: sessionStorage.getItem("loginid"),
      },
    }).then((response) => {
      alert(response.data);
      sessionStorage.clear();
      navigete("/");
    });
  };
  return (
    <>
      <div className={styles.container}>
        <div>회원 정보 수정</div>
        <div>
          <div>
            <span> 이름 : {sessionStorage.getItem("named")}</span>
          </div>
          <div>
            <span> 아이디 : {sessionStorage.getItem("loginid")}</span>
          </div>
          <div>
            {loginCheck ? (
              <>
                <div>
                  <span>비밀번호 </span>
                  <input
                    type="password"
                    value={changePassword}
                    onChange={(e) => {
                      setCgangePassword(e.target.value);
                    }}
                  />

                  <span>비밀번호 확인</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onKeyUp={handleKeyPress2}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      modifyPassword();
                    }}
                  >
                    확인
                  </button>
                </div>
                <div>
                  <span>회원 탈퇴 : </span>{" "}
                  <button
                    onClick={() => {
                      deleteAccount();
                    }}
                  >
                    회원 탈퇴
                  </button>
                </div>
              </>
            ) : (
              <>
                <span> 현재 비밀번호</span>{" "}
                <input
                  type="password"
                  value={password}
                  onKeyUp={handleKeyPress}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />{" "}
                <button
                  onClick={() => {
                    if (password === "") {
                      alert("비밀번호를 확인하세요");
                    } else {
                      cehckPassword();
                    }
                  }}
                >
                  확인
                </button>
              </>
            )}
          </div>
          {/* <div>{loginCheck ? <></> : <></>}</div> */}
        </div>
      </div>
    </>
  );
};

export default AccountModify;
