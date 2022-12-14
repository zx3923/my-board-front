import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./signup/SignUp";
import Login from "./signup/Login";
import Main from "./components/Main";
import BoardWrite from "./board/BoardWrite";
import BoardPage from "./board/BoardPage";
import axios from "axios";
import BoardDetail from "./board/BoardDetail";
import BoardUpdate from "./board/BoardUpdate";
import AccountModify from "./signup/AccountModify";

function App() {
  const [boardList, setBoardList] = useState([]);

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
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/write"
            element={<BoardWrite setBoardList={setBoardList} />}
          ></Route>
          <Route
            path="/list"
            element={<BoardPage boardList={boardList} />}
          ></Route>
          <Route
            path="/detail/:id"
            element={<BoardDetail setBoardList={setBoardList} />}
          />
          <Route
            path="/update/:id"
            element={
              <BoardUpdate boardList={boardList} setBoardList={setBoardList} />
            }
          />
          <Route path="/account" element={<AccountModify />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
