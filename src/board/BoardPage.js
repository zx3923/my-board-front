import React, { useEffect } from "react";
import BoardList from "./BoardList";
import { useNavigate } from "react-router-dom";

const BoardPage = ({ boardList }) => {
  const navigate = useNavigate();
  boardList.sort(function (a, b) {
    return b.boardId - a.boardId;
  });
  const write = () => {
    if (sessionStorage.getItem("logined")) {
      navigate("/write");
      window.location.reload();
    } else {
      alert("로그인하세요");
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <button
        onClick={() => {
          write();
        }}
      >
        글 쓰기
      </button>{" "}
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
