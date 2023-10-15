import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    return res.status(201).json({ message: "Listing created successfully", listing });
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  if (req.userId !== listing.userRef) {
    return res.status(401).json({ message: "You can only delete your listing" });
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  if (req.userId !== listing.userRef) {
    return res.status(401).json({ message: "You can only update your listing" });
  }

  try {
    const updatedFields = {
      ...(listName && { listName }),
      ...(description && { description }),
      ...(address && { address }),
      ...(price && { price }),
      ...(discountedPrice && { discountedPrice }),
      ...(baths && { baths }),
      ...(furnished && { furnished }),
      ...(parking && { parking }),
      ...(offer && { offer }),
      ...(images && { images }),
      ...(userRef && { userRef }),
    };

    await Listing.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
    return res.status(200).json({ message: "Listing updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req, res, next) => {
  console.log(req.params.id);
};
