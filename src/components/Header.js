import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.Header}>
          <div className={styles.mainLogo}>
            <a href="/">메인 로고</a>
          </div>
          <div></div>
          <div>
            {sessionStorage.getItem("logined") ? (
              <>
                <span
                  className={styles.headerName}
                  onClick={() => {
                    navigate("/account");
                  }}
                >
                  {sessionStorage.getItem("loginid")} 님
                </span>
                <button
                  className={styles.logoutBtn}
                  onClick={() => {
                    sessionStorage.clear();
                    alert("로그아웃 했습니다.");
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <div className={styles.headerBar}>
                  <div className={styles.signBtn}>
                    <a href="/signup">회원가입</a>
                  </div>
                  <div className={styles.loginBtn}>
                    <a href="/login">로그인</a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
