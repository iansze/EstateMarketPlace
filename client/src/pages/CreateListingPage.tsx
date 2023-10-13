import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ListingPost } from "../components/types/Types";
import { createListing } from "../components/util/Http";
import { CheckboxInput } from "../components/component/form/CheckBox";
import { ChangeEvent, useState } from "react";
import { storeImage } from "../components/component/form/UploadImage";
import LabelledInput from "../components/component/form/LabelInput";
import Input from "../components/component/form/Input";

const CreateListingPage = () => {
  const checkboxItems = ["sell", "rent", "parking", "furnished", "offer"];
  const [image, setImage] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ListingPost>();
  const { mutate, isLoading } = useMutation({
    mutationFn: createListing,
    onSuccess: (data) => {
      console.log(
        "🚀 ~ file: CreateListingPage.tsx:15 ~ CreateListingPage ~ data:",
        data,
      );
    },
    onError: () => navigate("/sign-in"),
  });

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      setImage((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const imageSubmitHandler = () => {
    if (image.length > 0 && image.length < 7) {
      const promises = [];

      for (let i = 0; i < image.length; i++) {
        promises.push(storeImage({ image: image[i] }));
      }
      Promise.all(promises)
        .then((urls) => {
          setImageUrls((prevUrls) => [...prevUrls, ...urls] as string[]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onSubmit: SubmitHandler<ListingPost> = async (data) => {
    data.images = imageUrls;
    console.log(data);
    mutate(data);
  };

  return (
    <main className="mx-auto mt-7 max-w-screen-xl ">
      <h1 className="text-center text-3xl font-bold">Create a Listing</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-7 flex w-5/6 flex-1 flex-col gap-8 sm:flex-row"
      >
        {/* Listing details  */}
        <div className="flex flex-1 flex-col gap-4 ">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            required
            {...register("name")}
          />
          <textarea
            id="description"
            cols={30}
            rows={10}
            placeholder="Description"
            {...register("description")}
            className="rounded-md border-2 border-solid p-2"
          />
          <Input
            id="address"
            type="text"
            placeholder="Address"
            required
            {...register("address")}
          />

          {/* CheckBox */}
          <div className="flex flex-wrap gap-4 ">
            {checkboxItems.map((item) => (
              <CheckboxInput
                key={item}
                register={register}
                name={item as keyof ListingPost}
              />
            ))}
          </div>

          {/* Bed section  */}
          <div className="flex flex-wrap gap-4">
            <LabelledInput
              label="Beds"
              type="number"
              id="beds"
              min={1}
              max={10}
              required
              {...register("beds")}
            />
            <LabelledInput
              label="Baths"
              type="number"
              id="baths"
              min={1}
              max={10}
              required
              {...register("baths")}
            />

            <LabelledInput
              label="Regular Price"
              type="number"
              id="price"
              subLabel="($ /Month)"
              required
              {...register("price")}
            />
            <LabelledInput
              label="Discounted Price"
              type="number"
              id="discountedPrice"
              subLabel="($ /Month)"
              required
              {...register("discountedPrice")}
            />
          </div>
        </div>
        {/* Upload image  */}
        <div>
          <p className="font-semibold">
            Images:
            <span> The first image will be the cover (max 6)</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <input
              onChange={imageUploadHandler}
              type="file"
              name="image"
              accept="image/*"
              multiple
              className="rounded-md border-2 border-solid p-3 "
            />
            <button
              type="button"
              onClick={imageSubmitHandler}
              className="rounded-md border-2 border-solid bg-sky-700 p-3 text-white"
            >
              Upload
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-5 w-full cursor-pointer rounded-lg border-2 border-solid bg-slate-500 p-2 text-white hover:bg-slate-200 hover:text-black ${
              isLoading ? " disabled:opacity-70" : ""
            } `}
          >
            {isLoading ? "Loading..." : "Create Listing"}
          </button>
        </div>
        {/* Submit button */}
      </form>
    </main>
  );
};

export default CreateListingPage;