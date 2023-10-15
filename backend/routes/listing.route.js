import { Router } from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.get("/list/:id", verifyUser, getListing);

router.post("/create", verifyUser, createListing);

router.delete("/delete/:id", verifyUser, deleteListing);

router.put("/update/:id", verifyUser, updateListing);

export default router;
