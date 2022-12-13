import React from "react";
import { useNavigate } from "react-router-dom";

const BoardList = ({ list }) => {
  const navigate = useNavigate();
  const { boardId, subject, author } = list;
  return (
    <>
      <tr>
        <th>{boardId}</th>
        <th
          onClick={() => {
            navigate(`/detail/${boardId}`);
          }}
        >
          ({subject})
        </th>
        <th>({author})</th>
      </tr>
    </>
  );
};

export default BoardList;
