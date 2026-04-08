import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json("All the fields are required for signup");
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json("Password should at least be of 6 characters");
    }

    // Now we wanna check if the email is valid or not using regular expression(regex)
    const emailRegex = /^[^\s@]+@[^\@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json("Password should at least be of 6 characters");
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json("Email already exists");

    // So we won't save user password as it is we will be hashing it so that it is unreadable
    const salt = await bcrypt.genSalt(10); // 10 means what will be the size of the hashed string

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res); // This method is defined in ./lib/utils.js

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(400).json({message : "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({ message: "Internal server error from auth.controller.js" });
  }
};
export const login = (req, res) => {
  res.post("login endpoint");
};
export const logout = (req, res) => {
  res.post("logout endpoint");
};
