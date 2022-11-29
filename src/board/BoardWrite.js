import React, { useState } from "react";

const BoardWrite = () => {
  const [Subject, setSubject] = useState("");
  const [Contents, setContents] = useState("");
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
          console.log("as");
        }}
      >
        작성하기
      </button>
    </>
  );
};

export default BoardWrite;
