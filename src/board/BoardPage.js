import React, { useEffect, useState } from "react";
import BoardList from "./BoardList";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./PagingStyles.css";

const BoardPage = ({ boardList }) => {
  const navigate = useNavigate();

  const [postPerPage] = useState(10); // 페이지당 보여줄 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const offset = (currentPage - 1) * postPerPage; // 각 페이지 첫번째 게시글 인덱스

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
              boardList
                .slice(offset, offset + postPerPage)
                .map((list, index) => <BoardList key={index} list={list} />)}
          </tbody>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={10}
            totalItemsCount={boardList.length}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handlePageChange}
          />
        </table>
      </div>
    </div>
  );
};

export default BoardPage;
