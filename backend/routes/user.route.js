import { Router } from "express";

import { updateProfile, deleteUsers, getListingByUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.put("/update/:id", verifyUser, updateProfile);
router.delete("/delete/:id", verifyUser, deleteUsers);
router.get("/listing/:id", verifyUser, getListingByUser);

export default router;
