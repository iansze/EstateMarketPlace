import { ChangeEvent, useEffect, useRef, useState } from "react";
import { storeImage } from "../component/form/UploadImage";

type ImageUploaderProps = {
  images?: string[];
  onUploadSuccess: (urls: string[]) => void;
};

export const ImageUploader = ({
  onUploadSuccess,
  images,
}: ImageUploaderProps) => {
  const [image, setImage] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);
  const prevImageUrlsLengthRef = useRef<number>(0);

  //Set image state when user upload image file
  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      setImage(selectedFiles);
    }
  };

  //Check if images already exist in the database
  useEffect(() => {
    setImageUrls(images ? images : []);
  }, [images]);

  //Check if imageUrls state has changed and call onUploadSuccess callback
  useEffect(() => {
    if (imageUrls.length !== prevImageUrlsLengthRef.current) {
      onUploadSuccess(imageUrls);
      prevImageUrlsLengthRef.current = imageUrls.length;
    }
  }, [imageUrls, onUploadSuccess]);

  //Upload images to firebase storage
  const imageSubmitHandler = async () => {
    if (image.length > 0 && image.length < 7) {
      setUploadProgress(true);
      try {
        const urls = await Promise.all(
          image.map((img) => storeImage({ image: img })),
        );
        setImageUrls((prevUrls) => [...prevUrls, ...urls]);
        onUploadSuccess(imageUrls);
        setUploadProgress(false);
      } catch (err) {
        alert(err);
        setUploadProgress(false);
      }
    } else {
      alert("Please select up to 6 images");
    }
  };

  const imageDeleteHandler = (url: string) => {
    if (imageUrls.length === 1) {
      alert("You must have at least 1 image");
      return;
    }
    setImage((prevImages) =>
      prevImages.filter(
        (img) => img.name !== image.find((e) => e.name === img.name)?.name,
      ),
    );
    setImageUrls((prevUrls) => {
      const updatedUrls = prevUrls.filter((e) => e !== url);
      return updatedUrls;
    });
  };

  return (
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
          {uploadProgress ? "Uploading..." : "Upload"}
        </button>
        <div className="flex w-full flex-col gap-4 ">
          {imageUrls.length > 0 &&
            imageUrls.map((url) => (
              <div
                key={url}
                className="flex w-full items-center justify-between rounded-md border bg-slate-50 p-3"
              >
                <img
                  src={url}
                  alt="uploaded"
                  className="h-28 w-40 object-contain"
                />
                <button
                  type="button"
                  onClick={() => imageDeleteHandler(url)}
                  className="rounded-lg bg-red-500 p-3 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
