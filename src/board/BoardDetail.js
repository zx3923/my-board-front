import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../comment/CommentList";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contents, setContents] = useState({});
  const [Comment, setComment] = useState("");

  const commentPost = () => {
    axios({
      method: "post",
      url: `http://localhost:8090/board/comment/${id}`,
      data: {
        contents: Comment,
        author: sessionStorage.getItem("loginid"),
      },
    }).then((response) => {
      console.log("1번", response);
      console.log("2번", response.data);
      console.log("3번", response.data.board);
    });
  };
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        method: "get",
        url: `http://localhost:8090/board/${id}`,
      });
      setContents(data.data);
    };
    getData();
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          navigate("/list");
        }}
      >
        리스트
      </button>
      <div>{contents.id}</div>
      <div>{contents.author}</div>
      <div>{contents.subject}</div>
      <div>
        {" "}
        <span>댓글</span>
        <CommentList></CommentList>
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          value={Comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <button
          onClick={() => {
            console.log(sessionStorage.getItem("logined"));
            if (!sessionStorage.getItem("logined")) {
              alert("로그인이 필요합니다.");
            } else if (Comment === "") {
              alert("내용을 입력하세요");
            } else {
              commentPost();
              alert("작성했습니다.");
              // window.location.reload();
            }
          }}
        >
          작성
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
