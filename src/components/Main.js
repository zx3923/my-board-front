import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/list");
          // window.location.reload();
        }}
      >
        게시글
      </button>
    </div>
  );
};

export default Main;
