import { Router } from "express";
import { signin, signup, googleSignin, logOut } from "../controllers/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-signin", googleSignin);
router.get("/logout", logOut);

export default router;
