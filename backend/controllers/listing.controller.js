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

  const {
    listName,
    description,
    address,
    price,
    discountedPrice,
    baths,
    sell,
    rent,
    furnished,
    parking,
    offer,
    images,
    userRef,
  } = req.body;

  try {
    const updatedFields = {
      //falsy value (false, 0, null, undefined, NaN, an empty string "", etc.)
      ...(listName && { listName }),
      ...(description && { description }),
      ...(address && { address }),
      ...(price && { price }),
      ...(req.body.hasOwnProperty("discountedPrice") && { discountedPrice }),
      ...(baths && { baths }),
      ...(req.body.hasOwnProperty("sell") && { sell }),
      ...(req.body.hasOwnProperty("rent") && { rent }),
      ...(req.body.hasOwnProperty("furnished") && { furnished }),
      //...(parking && { parking }) becasue parking is boolean
      //only update the parking field if the value of parking is truthy (i.e., true).
      //If parking is false, this won't include the parking property in the
      //updatedFields object
      ...(req.body.hasOwnProperty("parking") && { parking }),
      ...(req.body.hasOwnProperty("offer") && { offer }),
      ...(images && images.length > 0 && { images }),
      ...(userRef && { userRef }),
    };

    //if offer is true, then discountedPrice must be less than price
    if (offer) {
      const currentPrice = price !== "" ? price : listing.price;
      const currentDiscountedPrice =
        discountedPrice !== "" ? discountedPrice : listing.discountedPrice;

      if (currentPrice < currentDiscountedPrice) {
        return res
          .status(400)
          .json({ message: "Discounted price cannot be greater than actual price" });
      }
    }

    await Listing.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
    return res.status(200).json({ listing });
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  if (req.userId !== listing.userRef) {
    return res.status(401).json({ message: "You can only update your listing" });
  }
  try {
    return res.status(200).json({ listing });
  } catch (err) {
    next(err);
  }
};
