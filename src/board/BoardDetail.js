import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../comment/CommentList";
import { Viewer } from "@toast-ui/react-editor";
import Prism from "prismjs";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import styles from "./Board.module.css";

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
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!sessionStorage.getItem("logined")) {
        alert("로그인이 필요합니다.");
        setComment("");
      } else if (Comment === "") {
        alert("내용을 입력하세요");
      } else {
        commentPost();
        alert("작성했습니다.");
        setComment("");
      }
    }
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
    <div className={styles.container}>
      <button
        className={styles.backListBtn}
        onClick={() => {
          navigate("/list");
        }}
      >
        돌아가기
      </button>
      <button
        className={styles.modifyBoard}
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
      <button
        className={styles.deleteBoard}
        onClick={() => {
          boardDelete();
        }}
      >
        삭제
      </button>
      <div className={styles.hTag}>
        <div>
          작성자 : <span>{contents.author}</span>
        </div>
        <div>
          제목 : <span>{contents.subject}</span>
        </div>
      </div>
      {contents && (
        <Viewer
          initialValue={contents.contents}
          plugins={[[codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
        />
      )}

      <div>
        {" "}
        <span>댓글({commentList.length})</span>
        <hr />
        <div>
          {commentList &&
            commentList.map((list, index) => (
              <CommentList
                key={index}
                list={list}
                setCommentList={setCommentList}
              />
            ))}
        </div>
        <div className={styles.textArea}>
          <textarea
            rows="3"
            value={Comment}
            onKeyUp={handleKeyPress}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          className={styles.comPost}
          onClick={() => {
            if (!sessionStorage.getItem("logined")) {
              alert("로그인이 필요합니다.");
              setComment("");
            } else if (Comment === "") {
              alert("내용을 입력하세요");
            } else {
              commentPost();
              alert("작성했습니다.");
              setComment("");
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
