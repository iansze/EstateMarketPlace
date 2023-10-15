import { useSelector } from "react-redux";
import { ListingPost, RootState } from "../types/Types";
import { useEffect, useState } from "react";
import { deleteListing, getListingByUser } from "../util/Http";
import { Link } from "react-router-dom";

const ProfileListing = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [listings, setListings] = useState<ListingPost[]>([]);
  const [showListings, setShowListings] = useState<boolean>(false);

  useEffect(() => {
    const fetechData = async () => {
      if (currentUser?._id) {
        try {
          const data = await getListingByUser(currentUser?._id);
          setListings(data.listing);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetechData();
  }, [currentUser]);

  const showListingsHandler = () => {
    setShowListings((prev) => !prev);
  };

  const deleteListingHandler = async (id: string) => {
    try {
      deleteListing(id);
      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto my-3 flex w-5/6 flex-col gap-4 md:w-6/12">
      {/* Show listings */}
      <div className="text-center">
        {listings.length > 0 ? (
          <h1
            className="inline-block cursor-pointer  text-3xl font-bold hover:text-lime-500"
            onClick={showListingsHandler}
          >
            Show Listings
          </h1>
        ) : (
          "No Listings"
        )}
      </div>
      {/* Listings */}
      {showListings &&
        listings.map((listing: ListingPost) => (
          <div
            key={listing._id}
            className="flex w-full justify-between rounded-md border-2 p-3 text-center  "
          >
            <div className="flex content-center items-center gap-4">
              <Link
                to={`/listing/${listing._id}`}
                className="flex items-center gap-4"
              >
                <img
                  src={listing.images[0]}
                  alt=""
                  className="h-20 w-20 object-contain"
                />
                <p className="text-lg font-semibold">{listing.name}</p>
              </Link>
            </div>

            <div className="flex flex-col justify-around">
              <button
                onClick={() => deleteListingHandler(listing._id as string)}
                className="font-semibold text-red-600"
              >
                DELETE
              </button>
              <button className="font-semibold text-blue-500">EDIT</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileListing;
