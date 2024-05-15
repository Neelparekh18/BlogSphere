import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/register", {
        username,
        email,
        password,
      });
      if (res.data?.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      } else {
        toast.error("User registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while registering:", error);
      toast.error(
        "An error occurred while registering. Please try again later."
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3}>
            Register
          </Typography>
          <TextField
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            type="text"
            required
          />
          <TextField
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            type="email"
            required
          />
          <TextField
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            type="password"
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Register
          </Button>
          <Button
            color="primary"
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => navigate("/login")}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
