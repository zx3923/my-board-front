import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../comment/CommentList";
import { Viewer } from "@toast-ui/react-editor";
import Prism from "prismjs";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";

const BoardDetail = ({ setBoardList }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contents, setContents] = useState("");
  const [Comment, setComment] = useState("");
  const [commentList, setCommentList] = useState("");

  const commentPost = () => {
    axios({
      method: "post",
      url: `http://localhost:8090/board/comment/${id}`,
      data: {
        contents: Comment,
        author: sessionStorage.getItem("loginid"),
      },
    }).then((response) => {
      setCommentList(response.data);
    });
  };

  const boardDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:8090/board/delete/${id}`,
      data: {
        userId: sessionStorage.getItem("loginid"),
      },
    }).then((response) => {
      if (!response.data) {
        alert("삭제 권한이 없습니다.");
      } else {
        setBoardList(response.data);
        alert("삭제했습니다.");
        navigate(-1);
      }
      // 삭제로직 구현 완료 하지만 삭제후 리스트에 바로 렌더링되게 고민좀
      // -> 스프링에서 삭제시 false 값 혹은 리스트객체를 보내줘서 삭제 성공하면 setBoardList로 데이터를 새로씌움
    });
  };
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        method: "get",
        url: `http://localhost:8090/board/${id}`,
      });
      const data2 = await axios({
        method: "get",
        url: `http://localhost:8090/board/comment/list/${id}`,
      });
      setContents(data.data);
      setCommentList(data2.data);
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
      <button
        onClick={() => {
          boardDelete();
        }}
      >
        삭제
      </button>
      <button
        onClick={() => {
          if (sessionStorage.getItem("loginid") == contents.author) {
            navigate(`../../update/${id}`);
          } else {
            alert("권한이 없습니다.");
          }
        }}
      >
        수정
      </button>
      <div>작성자 : ({contents.author})</div>
      <div>제목 : ({contents.subject})</div>
      {contents && (
        <Viewer
          initialValue={contents.contents}
          plugins={[[codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
        />
      )}

      <div>
        {" "}
        <span>댓글</span>
        <tbody>
          {commentList &&
            commentList.map((list, index) => (
              <CommentList
                key={index}
                list={list}
                setCommentList={setCommentList}
              />
            ))}
        </tbody>
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
            if (!sessionStorage.getItem("logined")) {
              alert("로그인이 필요합니다.");
            } else if (Comment === "") {
              alert("내용을 입력하세요");
            } else {
              commentPost();
              alert("작성했습니다.");
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
