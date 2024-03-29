import User from "../models/user.model.js";
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
    const token = jwt.sign({ id: isVaildUser._id }, process.env.JWT_SECRET_KEY);
    //Destructuring to create two variables
    //password property will be assigned to the userPassword
    const { password: userPassword, ...user } = isVaildUser._doc;
    res
      .cookie("token", token, { httpOnly: true, sameSite: "None", secure: true })
      .status(200)
      .json({ message: "User logged in successfully", user: user });
  } catch (err) {
    next(err);
  }
};

export const googleSignin = async (req, res, next) => {
  try {
    //User exisit
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {});
      const { password: userPassword, ...userDetails } = user._doc;
      res
        .cookie("token", token, { httpOnly: true, sameSite: "None", secure: true })
        .status(200)
        .json({ message: "User logged in successfully", user: userDetails });
    } else {
      //User does not exisit
      const password = Math.random().toString(36).slice(-8);
      const hasedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hasedPassword,
        photo: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {});
      const { password: userPassword, ...user } = newUser._doc;
      res
        .cookie("token", token, { httpOnly: true, sameSite: "Lax" })
        .status(200)
        .json({ message: "User logged in successfully", user });
    }
  } catch (err) {
    next(err);
  }
};

export const logOut = (req, res, next) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    next(err);
  }
};
