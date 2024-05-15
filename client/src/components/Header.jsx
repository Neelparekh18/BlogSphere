import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/Store";
import toast , { Toaster } from 'react-hot-toast';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const [value, setValue] = useState(0);
  const isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    // Retrieve the active tab value from localStorage
    const storedValue = localStorage.getItem("activeTab");
    if (storedValue !== null) {
      setValue(parseInt(storedValue, 10));
    }
  }, []);

  useEffect(() => {
    // Update localStorage with the active tab value whenever it changes
    localStorage.setItem("activeTab", value.toString());
  }, [value]);

  useEffect(() => {
    // Set the active tab based on the current URL pathname
    if (location.pathname === "/blogs") {
      setValue(0);
    } else if (location.pathname === "/my-blogs") {
      setValue(1);
    } else if (location.pathname === "/create-blog") {
      setValue(2);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = () => {
    // Clear userId from localStorage
    localStorage.removeItem('userId');

    // Dispatch logout action
    dispatch(authActions.logout());

    toast.success("Logout Successfully")
    
    navigate("/login")
  };

  return (
    <AppBar position="sticky">
      <Toaster/>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h4">BlogSphere</Typography>
        </Link>
        {isLogin && (
          <Tabs
            textColor="inherit"
            value={value}
            onChange={handleChange}
            aria-label="tabs"
          >
            <Tab label="Blogs" component={Link} to="/blogs" />
            <Tab label="My Blogs" component={Link} to="/my-blogs" />
            <Tab label="Create Blog" component={Link} to="/create-blog" />
          </Tabs>
        )}
        <div>
          {!isLogin ? (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ margin: 1, color: "white" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{ margin: 1, color: "white" }}
              >
                Register
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
