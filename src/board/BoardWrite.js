import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import styles from "./Board.module.css";

const BoardWrite = ({ setBoardList }) => {
  const navigate = useNavigate();
  const [Subject, setSubject] = useState("");
  const [Contents, setContents] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      write();
    }
  };
  const toastRef = useRef();

  const write = () => {
    axios({
      method: "post",
      url: "http://localhost:8090/board/write",
      data: {
        subject: Subject,
        contents: toastRef.current?.getInstance().getHTML(),
        author: sessionStorage.getItem("loginid"),
      },
    }).then((response) => {
      console.log(response.data);
      setBoardList(response.data);
    });
  };
  return (
    <>
      <div>글 쓰기</div>
      <div>
        <div>
          <span>제목</span>
          <input
            type="text"
            value={Subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
        </div>
        {/* <div>
          <span>내용</span>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={Contents}
            onKeyUp={handleKeyPress}
            onChange={(e) => {
              setContents(e.target.value);
            }}
          ></textarea>
        </div> */}
      </div>
      <div className={styles.test}>
        {/* toast ul 설정 */}
        <Editor
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={toastRef}
        />
      </div>
      <button
        onClick={() => {
          if (Subject === "") {
            alert("제목을 입력하세요.");
          } else if (toastRef.current?.getInstance().getHTML() === "") {
            alert("내용을 입력하세요.");
          } else {
            write();
            alert("작성했습니다.");
            navigate("/list");
          }
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default BoardWrite;
