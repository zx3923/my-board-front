import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";

const BoardUpdate = ({ boardList, setBoardList }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const toastRef = useRef();

  const patch = async () => {
    try {
      const data = await axios({
        method: "patch",
        url: `http://localhost:8090/board/update/${id}`,
        data: {
          subject,
          contents: toastRef.current?.getInstance().getMarkdown(),
          author: sessionStorage.getItem("loginid"),
        },
      });
      setBoardList(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          method: "get",
          url: `http://localhost:8090/board/${id}`,
        });
        setSubject(data.data.subject);
        toastRef.current?.getInstance().setMarkdown(data.data.contents);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div>글 쓰기</div>
      <div>
        <div>
          <span>제목</span>
          <input
            type="text"
            defaultValue={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
        </div>
        <div>
          <span>내용</span>
          <Editor
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={toastRef}
          />
          {/* <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            defaultValue={contents}
            onChange={(e) => {
              setContents(e.target.value);
            }}
          ></textarea> */}
        </div>
      </div>
      <button
        onClick={() => {
          if (subject === "") {
            alert("제목을 입력하세요.");
          } else if (toastRef.current?.getInstance().getMarkdown() === "") {
            alert("내용을 입력하세요.");
          } else {
            patch();
            alert("수정했습니다.");
            navigate("/list");
          }
        }}
      >
        수정하기
      </button>
    </>
  );
};

export default BoardUpdate;
