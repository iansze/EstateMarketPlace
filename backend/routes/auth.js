import { Router } from "express";
import { signin, signup, googleSignin } from "../controllers/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-signin", googleSignin);

export default router;
