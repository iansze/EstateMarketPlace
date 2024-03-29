import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { getAllListings } from "../components/util/Http";
import { useQuery } from "@tanstack/react-query";
import { ListingPost } from "../components/types/Types";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import SearchResult from "../components/component/searchResult/SearchResult";
import Loading from "../components/component/Loading";

const HomePage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [rentList, setRentList] = useState<ListingPost[]>([]);
  const [sellList, setSellList] = useState<ListingPost[]>([]);
  const { data, isLoading, isError } = useQuery<ListingPost[]>(
    ["listing"],
    getAllListings,
  );

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const fetchImages = data
        .map(
          (list) => list.images[Math.floor(Math.random() * list.images.length)],
        )
        .filter((image) => image !== undefined);
      const fetchRentList = data.filter((list) => list.rent === true);
      const fetchSellList = data.filter((list) => list.sell === true);
      setImages(fetchImages);
      setRentList(fetchRentList);
      setSellList(fetchSellList);
    }
  }, [data, isLoading, isError]);

  return (
    <>
      <div className="mx-auto mt-8 flex w-3/5 flex-col  p-3">
        <h1 className="text-3xl font-bold md:text-6xl">
          Find your next perfect <br />
          Place with us
        </h1>
        <p className="my-4 text-xl text-green-500 hover:animate-bounce hover:text-3xl hover:text-red-400 md:w-2/4 ">
          <Link to="/search">Let's start now!</Link>
        </p>
      </div>
      <div className="">
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000 }}
          className="mySwiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  height: "550px",
                }}
                className="bg-cover bg-center bg-no-repeat"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {data && (
        <div className="mx-auto my-8 w-full p-4 sm:w-11/12">
          <h1 className="mb-4 text-2xl font-bold">Recent News</h1>
          <SearchResult data={data} />
        </div>
      )}
      {rentList.length > 0 && (
        <div className="my-8w-full mx-auto p-4 font-semibold sm:w-11/12">
          <h1 className="mb-4 text-2xl font-bold">Recent places for rent</h1>
          <SearchResult data={rentList} />
        </div>
      )}
      {sellList.length > 0 && (
        <div className="mx-auto my-8 w-full p-4 font-semibold sm:w-11/12">
          <h1 className="mb-4 text-2xl font-bold">Recent places for sale</h1>
          <SearchResult data={sellList} />
        </div>
      )}
      {isLoading && <Loading messagae="Loading, please wait..." />}
      {isError && <p className="text-center text-3xl font-bold">{isError}</p>}
    </>
  );
};

export default HomePage;
