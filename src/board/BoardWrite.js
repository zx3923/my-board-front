import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  const navigate = useNavigate();
  const [Subject, setSubject] = useState("");
  const [Contents, setContents] = useState("");
  // const [author, setAuthor] = useState("");

  const write = () => {
    axios({
      method: "post",
      url: "http://localhost:8090/board/write",
      data: {
        subject: Subject,
        contents: Contents,
        author: sessionStorage.getItem("loginid"),
      },
    }).then((response) => {
      console.log(response.data);
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
        <div>
          <span>내용</span>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={Contents}
            onChange={(e) => {
              setContents(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <button
        onClick={() => {
          if (Subject === "") {
            alert("제목을 입력하세요.");
          } else if (Contents === "") {
            alert("내용을 입력하세요.");
          } else {
            write();
            alert("작성했습니다.");
            navigate("/");
          }
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default BoardWrite;
