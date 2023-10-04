import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hasedPassword = await bcrypt.hash(password, 12);
  const user = new User({ username, email, password: hasedPassword });
  try {
    await user.save();
    res.status(200).json({ user: user, message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};
