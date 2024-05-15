import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/Store";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/login", {
        email,
        password,
      });
      if (res && res.data?.success) {
        const userId = res.data.findUser._id;
        localStorage.setItem("userId", userId);
        dispatch(authActions.login());
        toast.success(res.data?.message);
        navigate("/");
      } else {
        const errorMessage = res.data?.message || "Login failed";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response?.data &&
        error.response?.data?.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "An error occurred while logging in. Please try again later."
        );
      }
    }
  };

  return (
    <>
      {/* <Toaster/> */}
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
            Login
          </Typography>
          {/* <TextField
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            type="text"
            required
          /> */}
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
            Login
          </Button>
          <Button
            color="primary"
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => navigate("/register")}
          >
            Not A User? Please Register
          </Button>
        </Box>
      </form>{" "}
    </>
  );
};

export default Login;
