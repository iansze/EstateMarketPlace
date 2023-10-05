import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already registered." });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered." });
    }
  } catch (err) {
    next(err);
    return;
  }

  const hasedPassword = await bcrypt.hash(password, 12);
  const user = new User({ username, email, password: hasedPassword });
  try {
    await user.save();
    res.status(200).json({ user: user, message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isVaildUser = await User.findOne({ email });
    if (!isVaildUser) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isVaildPassword = await bcrypt.compare(password, isVaildUser.password);
    if (!isVaildPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: isVaildUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    //Destructuring to create two variables
    //password property will be assigned to the userPassword
    const { password: userPassword, ...user } = isVaildUser._doc;
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "User logged in successfully", user: user });
  } catch (err) {
    next(err);
  }
};
