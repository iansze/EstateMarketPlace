import { Router } from "express";

import { updateProfile, deleteUsers } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.put("/update/:id", verifyUser, updateProfile);
router.delete("/delete/:id", verifyUser, deleteUsers);

export default router;
