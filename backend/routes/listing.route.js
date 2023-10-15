import { Router } from "express";
import { createListing, deleteListing } from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.post("/create", verifyUser, createListing);

router.delete("/delete/:id", verifyUser, deleteListing);

export default router;
