import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contents, setContents] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        method: "get",
        url: `http://localhost:8090/board/${id}`,
      });
      setContents(data.data);
    };
    getData();
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          navigate("/list");
        }}
      >
        리스트
      </button>
      <div>{contents.id}</div>
      <div>{contents.author}</div>
      <div>{contents.subject}</div>
    </div>
  );
};

export default BoardDetail;
