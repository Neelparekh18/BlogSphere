import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const data = await userModel.find({});
    return res.status(200).send({
      userCount: data.length,
      success: true,
      message: "All users Data",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user callback",
      data,
    });
  }
};

// register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password ,} = req.body;
    if (!username || !email || !password)
      return res.status(400).send({
        success: false,
        message: "please fill all the fields",
      });

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(401).send({
        success: false,
        message: "user already existed",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await data.save();
    return res.status(201).send({
      success: true,
      message: "New User created",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({
        success: false,
        message: "please fill all the fields",
      });

    const findUser = await userModel.findOne({ email });
    if (!findUser)
      return res.status(400).send({
        success: false,
        message:
          "User does not exist with the given email, please check and try again",
      });
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (isPasswordValid) {
      return res.status(200).send({
        success: true,
        message: "User login successfully",
        findUser,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Login callback",
      success: false,
      error,
    });
  }
};
