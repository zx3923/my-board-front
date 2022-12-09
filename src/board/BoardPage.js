import React, { useEffect, useState } from "react";
import BoardList from "./BoardList";

const BoardPage = ({ boardList }) => {
  boardList.sort(function (a, b) {
    return b.boardId - a.boardId;
  });
  useEffect(() => {}, []);
  return (
    <div>
      {" "}
      <div>
        <table>
          <thead>
            <tr>
              <th>no.</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {boardList &&
              boardList.map((list, index) => (
                <BoardList key={index} list={list} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardPage;