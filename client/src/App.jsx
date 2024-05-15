import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Blogs from "./Pages/Blogs";
import Register from "./Pages/Register";
import UserBlogs from "./Pages/UserBlogs";
import CreateBlog from "./Pages/CreateBlog";
import BlogDetails from "./Pages/BlogDetails";

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Blogs/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/my-blogs" element={<UserBlogs/>} />
        <Route path="/edit-blog/:id" element={<BlogDetails/>} />
        <Route path="/create-blog" element={<CreateBlog/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
