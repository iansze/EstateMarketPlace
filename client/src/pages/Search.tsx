import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  ListingPost,
  RootState,
  SearchingForm,
} from "../components/types/Types";
import { useSelector } from "react-redux";
import { getSearch } from "../components/util/Http";
import { useState } from "react";
import SearchResult from "../components/component/searchResult/SearchResult";

const Search = () => {
  const navigate = useNavigate();
  const [searchUrl, setSearchUrl] = useState<string>("");
  const { register, handleSubmit } = useForm<SearchingForm>();
  const currentSearchTerm = useSelector(
    (state: RootState) => state.search.currentSearchTerm,
  );

  const { data, isLoading, isError } = useQuery<ListingPost[], string>(
    ["listing", searchUrl],
    () => getSearch(searchUrl),
  );

  const onSubmit: SubmitHandler<SearchingForm> = async (data) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", data?.search?.toString() || "");
    urlParams.set("rent", data?.rent?.toString() || "false");
    urlParams.set("sell", data?.sell?.toString() || "false");
    urlParams.set("offer", data?.offer?.toString() || "false");
    urlParams.set("parking", data?.parking?.toString() || "false");
    urlParams.set("furnished", data?.furnished?.toString() || "false");
    urlParams.set("sort", data?.sort?.toString() || "false");
    const url = urlParams.toString();
    setSearchUrl(url);
    navigate("/search?" + urlParams.toString());
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 border-b-2 p-8 sm:border-r-2 md:min-h-screen xl:min-w-[350px]"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            className="w-full rounded-md border-2 p-1"
            id="search"
            defaultValue={currentSearchTerm || ""}
            placeholder="Search.."
            {...register("search")}
          />
        </div>
        <div className="flex flex-col flex-wrap gap-3 min-[180px]:flex-row">
          <span>Type: </span>
          <input
            type="checkbox"
            id="rent"
            className="w-5 "
            {...register("rent")}
          />
          <label htmlFor="rent">Rent</label>
          <input
            type="checkbox"
            id="sale"
            className="w-5"
            {...register("sell")}
          />
          <label htmlFor="sale">Sale</label>
          <input
            type="checkbox"
            id="offer"
            className="w-5"
            {...register("offer")}
          />
          <label htmlFor="offer">Offer</label>
        </div>
        <div className="flex flex-col flex-wrap gap-3 min-[180px]:flex-row">
          <span>Amenities: </span>
          <input
            type="checkbox"
            {...register("parking")}
            id="parking"
            className="w-5"
          />
          <label htmlFor="paking">Parking</label>
          <input
            type="checkbox"
            {...register("furnished")}
            id="furnished"
            className="w-5"
          />
          <label htmlFor="furnished">Furnished</label>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="sort">Sort: </label>
          <select
            id="sort"
            className="cursor-pointer rounded-md border-2 p-1"
            {...register("sort")}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="priceHighToLow">Price high to low</option>
            <option value="priceLowToHigh">Price low to high</option>
          </select>
        </div>
        <button className="rounded-md border-2 bg-slate-600 p-2 text-white hover:bg-red-950">
          SEARCH
        </button>
      </form>
      <div className=" p-8 text-2xl font-semibold">
        <h1 className="mb-4 text-center">Listing Result</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{isError}</p>}
        {data && <SearchResult data={data} />}
      </div>
    </div>
  );
};

export default Search;
