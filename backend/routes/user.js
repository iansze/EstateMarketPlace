import { Router } from "express";
import { test } from "../controllers/user.js";

const router = Router();

router.get("/", test);

export default router;
