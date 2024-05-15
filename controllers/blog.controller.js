import mongoose from "mongoose";
import { blogModel } from "../models/blog.model.js";
import { userModel } from "../models/user.model.js";

export const allBlogs = async (req, res) => {
  try {
    const data = await blogModel.find({}).populate("user");
    if (!data)
      return res.status(200).send({
        success: false,
        message: "No Blogs found!",
      });
    return res.status(200).send({
      allBlogsCount: data.length,
      success: true,
      message: "All Blogs Data",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting Blogs",
    });
  }
};
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogModel.findById(id);
    if (!data)
      return res.status(200).send({
        success: false,
        message: "Blog not found!",
      });
    return res.status(200).send({
      success: true,
      message: "Blog Data",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Blog callback",
      data,
    });
  }
};
  export const createBlog = async (req, res) => {
    try {
      const { title, description, image, user } = req.body;
      if (!title || !description || !image || !user)
        return res.status(200).send({
          success: false,
          message: "Please fill all the fields",
        });

      const existingUser = await userModel.findById(user);
      if (!existingUser)
        return res.status(404).send({
          success: false,
          message: "unable to find User",
        });

      const data = new blogModel({
        title,
        description,
        image,
        user,
      });
      const session = await mongoose.startSession();
      session.startTransaction();
      await data.save({ session });
      existingUser.blogs.push(data);
      await existingUser.save({ session });
      await session.commitTransaction();
      await data.save();
      return res.status(201).send({
        success: true,
        message: "New Blog Created Successfully!",
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while creating Blog",
      });
    }
  };
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog has been Updated Successfully!",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating Blog",
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogModel.findByIdAndDelete(id).populate("user");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    await data.user.blogs.pull(data);
    await data.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog has been Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting Blog",
    });
  }
};
export const userBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await userModel.findById(id).populate({
      path: "blogs",
      populate: { path: "user" }, // Populate the user field in each blog document
    });
    console.log(userBlog);
    if (!userBlog)
      return res.status(404).send({
        success: false,
        message: "Blogs not found with this id",
      });
    const data = userBlog.blogs;
    return res.status(200).send({
      success: true,
      message: "User Blogs",
      userBlog,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting User Blog",
    });
  }
};
