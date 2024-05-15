import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
  userBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.route("/blogs").get(allBlogs);
router.route("/blog/:id").get(getSingleBlog);
router.route("/create").post(createBlog);
router.route("/update/:id").put(updateBlog);
router.route("/delete/:id").delete(deleteBlog);
router.route("/user-blog/:id").get(userBlog);

export default router;
