import { Router } from "express";
import { signin, signup, googleSignin, logOut } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-signin", googleSignin);
router.post("/logout", logOut);

export default router;
