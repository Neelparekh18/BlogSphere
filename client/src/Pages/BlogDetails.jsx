import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BlogDetails = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(id)

  //Get Blog Detail
  const getBlogDetail = async () => {
    const res = await axios.get(`/api/v1/blog/blog/${id}`);
    if (res && res.data?.success) {
      setBlog(res.data.data);
      //   console.log(res.data.data);
      const blogData = res.data.data;
      setTitle(blogData.title || "");
      setDescription(blogData.description || "");
      setImage(blogData.image || "");
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/api/v1/blog/update/${id}`, {
      title,
      description,
      image,
    });
    if (res && res.data?.success) {
      // console.log(res.data)
      // alert("blog has been updated successfully!");
      toast.success("Blog Updated");
      navigate("/my-blogs");
    }
  };
  return (
    <>
      <Box
        maxWidth={500}
        mx="auto"
        p={3}
        borderRadius={10}
        boxShadow={4}
        mt={5}
        bgcolor="white"
      >
        <Toaster />
        <Typography variant="h4" textAlign="center" mb={3} color="primary">
          Edit Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Update Blog
            </Button>
          </Box>
        </form>
      </Box>{" "}
    </>
  );
};

export default BlogDetails;
