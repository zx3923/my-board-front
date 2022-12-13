import React from "react";

const CommentList = ({ list }) => {
  const { commentContents, commentAuthor, commentId } = list;
  return (
    <>
      <tr>
        <th>{commentContents}</th>
        <th>{commentAuthor}</th>
        <button>X</button>
      </tr>
    </>
  );
};

export default CommentList;
