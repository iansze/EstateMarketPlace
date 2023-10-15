import { ChangeEvent, useState } from "react";
import { storeImage } from "../component/form/UploadImage";

type ImageUploaderProps = {
  onUploadSuccess: (urls: string[]) => void;
};

export const ImageUploader = ({ onUploadSuccess }: ImageUploaderProps) => {
  const [image, setImage] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      setImage((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const imageSubmitHandler = async () => {
    if (image.length > 0 && image.length < 7) {
      setUploadProgress(true);
      try {
        const urls = await Promise.all(
          image.map((img) => storeImage({ image: img })),
        );
        setImageUrls((prevUrls) => [...prevUrls, ...urls]);
        onUploadSuccess(urls);
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
    setImageUrls((prevUrls) => prevUrls.filter((e) => e !== url));
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
