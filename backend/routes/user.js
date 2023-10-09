import { Router } from "express";

import { updateProfile } from "../controllers/user.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.put("/update/:id", verifyUser, updateProfile);

export default router;
