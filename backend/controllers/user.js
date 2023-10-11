import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const updateProfile = async (req, res) => {
  if (req.userId !== req.params.id) {
    return res.status(401).json({ message: "You can only update your profile" });
  }

  let { username, email, password, photo } = req.body;

  if (password) {
    try {
      password = await bcrypt.hash(password, 12);
    } catch (err) {
      return res.status(500).json({ error: "Error hashing password." });
    }
  }

  try {
    const updatedFields = {
      ...(username && { username }),
      ...(email && { email }),
      ...(password && { password }),
      ...(photo && { photo }),
    };

    const updatedProfile = await User.findByIdAndUpdate(
      req.userId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProfile) {
      throw new Error("User not found.");
    }

    const { password: userPassword, ...user } = updatedProfile._doc;
    return res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  if (req.userId !== req.params.id) {
    return res.status(401).json({ message: "You can only delete your profile" });
  }
  try {
    await User.findByIdAndDelete(req.userId);
    res.clearCookie("token");
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
