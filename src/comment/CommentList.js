import axios from "axios";
import React from "react";
import styles from "./Comment.module.css";

const CommentList = ({ list, setCommentList }) => {
  const { commentContents, commentAuthor, commentId } = list;

  const commentDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:8090/board/comment/delete/${commentId}`,
      data: {
        userId: sessionStorage.getItem("loginid"),
      },
    }).then((response) => {
      if (!response.data) {
        alert("삭제 권한이 없습니다.");
      } else {
        setCommentList(response.data);
      }
    });
  };
  return (
    <>
      <div className={styles.commentTag}>
        <div>
          <span> {commentContents}</span>
          <div>작성자 :{commentAuthor}</div>
        </div>

        <div>
          <button
            className={styles.comDelete}
            onClick={() => {
              commentDelete();
            }}
          >
            X
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CommentList;
