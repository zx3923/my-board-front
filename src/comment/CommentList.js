import React from "react";

const CommentList = ({ list }) => {
  const { commentContents, commentAuthor } = list;
  return (
    <>
      <tr>
        <th>{commentContents}</th>
        <th>{commentAuthor}</th>
      </tr>
    </>
  );
};

export default CommentList;
