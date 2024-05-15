import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/blog/delete/${id}`);
      if (res && res.data?.success) {
        toast.success("Blog Deleted");
        navigate("/my-blogs");
        // setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Toaster/>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
        action={
          isUser && (
            <Box display="flex">
              <IconButton onClick={handleEdit}>
                <EditIcon color="info" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error"/>
              </IconButton>
            </Box>
          )
        }
      />
      <CardMedia component="img" height="194" image={image} alt="image" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
