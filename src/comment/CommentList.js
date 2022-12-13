import axios from "axios";
import React from "react";

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
      <tr>
        <th>내용 : ({commentContents})</th>
        <th>작성자 : ({commentAuthor})</th>
        <button
          onClick={() => {
            commentDelete();
          }}
        >
          X
        </button>
      </tr>
    </>
  );
};

export default CommentList;
