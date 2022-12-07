import React from "react";
import { useNavigate } from "react-router-dom";

const BoardList = ({ list }) => {
  const navigate = useNavigate();
  const { id, subject, author } = list;
  return (
    <>
      <tr>
        <th>{id}</th>
        <th
          onClick={() => {
            navigate(`/detail/${id}`);
          }}
        >
          {subject}
        </th>
        <th>{author}</th>
      </tr>
    </>
  );
};

export default BoardList;
