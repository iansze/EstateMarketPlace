import { Router } from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getSearchListing,
  getAllListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.get("/list/:id", getListing);

router.post("/create", verifyUser, createListing);

router.delete("/delete/:id", verifyUser, deleteListing);

router.put("/update/:id", verifyUser, updateListing);

router.get("/get", getSearchListing);

router.get("/allListing", getAllListing);

export default router;
