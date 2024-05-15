import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// databse connection
import connectDB from "./database/conn.js";
connectDB();

//routes
import userRoutes from "./routes/user.route.js";
import blogRoutes from "./routes/blog.route.js";
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//listen

app.listen(port, () => {
  console.log(`server running on ${process.env.DEV_mode} on port ${port}`);
});
