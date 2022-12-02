import React from "react";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.Header}>
        <a href="/">메뉴</a>
        <div>빈공간</div>
        <div>
          {sessionStorage.getItem("logined") ? (
            <>
              <span>{sessionStorage.getItem("loginid")}</span>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  alert("로그아웃 했습니다.");
                  window.location.reload();
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <a href="/signup">회원가입</a>
              <a href="/login">로그인</a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
