import { Router } from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.post("/create", verifyUser, createListing);

export default router;
