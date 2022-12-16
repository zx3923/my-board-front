import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.listBtn}>
        <button
          onClick={() => {
            navigate("/list");
            // window.location.reload();
          }}
        >
          게시글
        </button>
      </div>
    </div>
  );
};

export default Main;
