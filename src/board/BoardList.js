import axios from "axios";
import React, { useEffect, useState } from "react";

const BoardList = () => {
  const [boardList, setBoardList] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:8090/board/list",
          method: "get",
        });
        setBoardList(data.data);
      } catch (e) {}
    };
    getData();
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          console.log(boardList);
        }}
      >
        확인
      </button>
    </div>
  );
};

export default BoardList;
