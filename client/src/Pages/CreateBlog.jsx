import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("userId");
    try {
      const res = await axios.post(`/api/v1/blog/create`, {
        title,
        description,
        image,
        user,
      });
      if (res && res.data?.success) {
        toast.success("Blog Created")
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      maxWidth={500}
      mx="auto"
      p={3}
      borderRadius={10}
      boxShadow={4}
      mt={5}
      bgcolor="white"
    >
      <Toaster/>
      <Typography variant="h4" textAlign="center" mb={3} color="primary">
        Create a New Blog
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
            Create Blog
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateBlog;
