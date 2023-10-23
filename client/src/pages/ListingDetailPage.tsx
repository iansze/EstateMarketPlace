import { ListingPost, RootState } from "../components/types/Types";
import { getListingById } from "../components/util/Http";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useState } from "react";
import Contact from "../components/component/Contact";

const ListingDetailPage = () => {
  const [isContactOpened, setIsContactOpened] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery<ListingPost, string>(
    ["listing", id],
    () => getListingById(id as string),
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>No this page</div>;
  }

  return (
    <div className="">
      <Swiper navigation className="mySwiper">
        {data?.images.map((image) => (
          <SwiperSlide key={image}>
            <div
              style={{ backgroundImage: `url(${image})`, height: "550px" }}
              className="bg-cover bg-center bg-no-repeat"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mx-auto mt-4 flex w-5/6 flex-col xl:w-1/2">
        <h1 className="my-4 text-xl font-semibold">{data.listName}</h1>
        <div className="">
          <p className="my-2 flex gap-2 ">
            <FaMapMarkerAlt />
            {data.address}
          </p>
          <div className="my-2 flex gap-4">
            <button className="rounded-md border-2 bg-lime-300 px-4 py-1">
              For Rent
            </button>
            <button className="rounded-md border-2 bg-red-300 px-4 py-1">
              For Sale
            </button>
          </div>
        </div>
        <p className="mb-4">Description - {data.description}</p>
        <ul className="flex flex-wrap items-center gap-4 text-sm font-semibold text-green-900 sm:gap-6">
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBed className="text-lg" />
            {data.beds > 1 ? `${data.beds} beds ` : `${data.beds} bed `}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBath className="text-lg" />
            {data.baths > 1 ? `${data.baths} baths ` : `${data.baths} bath `}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaParking className="text-lg" />
            {data.parking ? "Parking spot" : "No Parking"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaChair className="text-lg" />
            {data.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>
        {currentUser && !isContactOpened ? (
          <button
            onClick={() => setIsContactOpened(true)}
            className="mt-4 rounded-md border-2 bg-slate-700 px-4 py-1 text-white hover:bg-slate-400 hover:text-black"
          >
            Contact Landord for more info
          </button>
        ) : (
          ""
        )}
        {isContactOpened && <Contact listing={data} />}
      </div>
    </div>
  );
};

export default ListingDetailPage;
