import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    const res = await axios.get("/api/v1/blog/blogs");
    if (res && res?.data) {
      setBlogs(res.data?.data);
      // console.log(res.data);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      <div>
        {blogs &&
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={blog.createdAt}
            />
          ))}
      </div>
    </>
  );
};

export default Blogs;
