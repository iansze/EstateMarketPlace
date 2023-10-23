import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ListingPost, RootState } from "../components/types/Types";
import { getListingById, updateListing } from "../components/util/Http";
import { CheckboxInput } from "../components/component/form/CheckBox";
import { useEffect, useState } from "react";
import LabelledInput from "../components/component/form/LabelInput";
import Input from "../components/component/form/Input";
import ImageUploader from "../components/component/ImageUploader";
import { useSelector } from "react-redux";

type MutationInput = {
  data: ListingPost;
  id: string;
};

const EditListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const checkboxItems = ["sell", "rent", "parking", "furnished", "offer"];

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { register, handleSubmit, watch, setValue } = useForm<ListingPost>();
  const { mutate, isLoading } = useMutation({
    mutationFn: (input: MutationInput) => updateListing(input.data, input.id),
    onSuccess: (data) => {
      console.log(data);
      navigate("/profile");
    },
    onError: (error: Error) => {
      alert(error.message);
      return;
    },
  });

  //Receive image urls from ImageUploader component
  const handleUploadSuccess = (urls: string[]) => {
    setImageUrls(urls);
  };

  //Fetch listing data from database
  useEffect(() => {
    const fetchListingData = async () => {
      const data = await getListingById(id as string);
      //Set the form values
      for (const key of Object.keys(data) as Array<keyof ListingPost>) {
        setValue(key, data[key]);
      }
    };
    fetchListingData();
  }, [id, setValue]);

  const isOfferChecked = watch("offer");
  const isSellingChecked = watch("sell");
  //if database has images, pass images to ImageUploader component
  const storedImage = watch("images");

  useEffect(() => {
    if (!isOfferChecked) {
      setValue("discountedPrice", 0);
    }
  }, [isOfferChecked, setValue]);

  const onSubmit: SubmitHandler<ListingPost> = async (data) => {
    data.images = imageUrls;
    data.userRef = currentUser._id;

    if (Number(data.discountedPrice) > Number(data.price)) {
      alert("Discounted price cannot be greater than regular price");
      return;
    }
    mutate({ data, id: id as string });
  };

  return (
    <main className="mx-auto mt-7 max-w-screen-xl ">
      <h1 className="text-center text-3xl font-bold">Edit a Listing</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-7 flex w-5/6 flex-1 flex-col gap-8 md:flex-row"
      >
        {/* Listing details  */}
        <div className="flex min-w-[300px] flex-1 flex-col gap-4">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            required
            {...register("listName")}
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
            {isOfferChecked && (
              <LabelledInput
                label="Discounted Price"
                type="number"
                id="discountedPrice"
                subLabel="($ /Month)"
                required
                {...register("discountedPrice")}
              />
            )}
            {isSellingChecked && (
              <LabelledInput
                label="Selling Price"
                type="number"
                id="sellPrice"
                required
                {...register("sellPrice")}
              />
            )}
          </div>
        </div>

        <div>
          {/* Upload image  */}
          <ImageUploader
            onUploadSuccess={handleUploadSuccess}
            images={storedImage}
          />
          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`my-5 w-full cursor-pointer rounded-lg border-2 border-solid bg-slate-500 p-2 text-white hover:bg-slate-200 hover:text-black ${
              isLoading ? " disabled:opacity-70" : ""
            } `}
          >
            {isLoading ? "Loading..." : "Edit Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditListingPage;
