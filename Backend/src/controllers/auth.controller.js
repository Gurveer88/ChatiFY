import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../Emails/emailhandler.js";
import 'dotenv/config';
export const signup = async (req, res) => {
    
  const { fullName, email, password } = req.body;
  const name =
    typeof fullName === "string" ? fullName.trim().toLowerCase() : "";
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const pass = typeof password === "string" ? password : "";

  try {
    if (!name || !normalizedEmail || !pass) {
      return res.status(400).json("All the fields are required for signup");
    }

    if (pass.length < 6) {
      return res
        .status(400)
        .json("Password should at least be of 6 characters");
    }

    // Now we wanna check if the email is valid or not using regular expression(regex)
    const emailRegex = /^[^\s@]+@[^\@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json("Please Enter a valid email");
    }

    const user = await User.findOne({ normalizedEmail });
    if (user) return res.status(400).json("Email already exists");

    // So we won't save user password as it is we will be hashing it so that it is unreadable
    const salt = await bcrypt.genSalt(10); // 10 means what will be the size of the hashed string

    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = new User({
      fullName: name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    if (newUser) {
      // Persist user first then issue an auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilepic: savedUser.profilepic,
      });
      //Send a Welcome email
      try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL)
      } catch (error) {
        console.error("Error sending the welcome email: ", error);
      }

    } else {
      res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    // Handling race condition: unique email constraint violation
    if (error?.code === 11000) {
      return res.status(409).json("Email already exists");
    }
    console.log("Error in signup:", error);
    res
      .status(500)
      .json({ message: "Internal server error from auth.controller.js" });
  }
};
export const login = (req, res) => {
  res.send("login endpoint");
};
export const logout = (req, res) => {
  res.send("logout endpoint");
};
