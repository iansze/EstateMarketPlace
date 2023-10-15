import { ChangeEvent, useEffect, useRef, useState } from "react";
import AuthForm from "../components/component/AuthForm";
import { RootState } from "../components/types/Types";
import { useDispatch, useSelector } from "react-redux";
import { storeImage } from "../components/component/form/UploadImage";
import { deleteUser, signOut } from "../components/util/Http";
import { setCurrentUser } from "../redux/feature/userSlice";
import { Link } from "react-router-dom";
import ProfileListing from "../components/component/ProfileListing";

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const uploadFile = async () => {
      if (file) {
        try {
          const downloadUrl = await storeImage({
            image: file,
            onProgress: setUploadProgress,
          });
          setImageURL(downloadUrl);
          setUploadError("");
        } catch (error) {
          setUploadError((error as Error).message);
          console.error("Failed to upload file:", error);
        }
      }
    };

    uploadFile();
  }, [file]);

  const fileSubmitHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const uploadMessgae = () => {
    if (uploadError) {
      return (
        <div className="mx-auto mt-5 w-5/6 p-3 text-center text-2xl text-red-600 md:w-6/12 xl:w-2/6">
          User does not have permission to upload this file
        </div>
      );
    } else {
      if (uploadProgress > 0 && uploadProgress < 100) {
        return (
          <div className="mx-auto  mt-5 w-5/6 p-3 text-center text-2xl text-green-600 md:w-6/12 xl:w-2/6">
            Uploaded {uploadProgress}%
          </div>
        );
      }
    }
    if (uploadProgress === 100) {
      return (
        <div className="mx-auto mt-5 w-5/6 p-3 text-center text-2xl text-green-600 md:w-6/12 xl:w-2/6">
          Uploaded Successfully
        </div>
      );
    }
  };

  const deleteUserHandler = () => {
    deleteUser(currentUser._id);
    dispatch(setCurrentUser(null));
  };

  const signOutHandler = () => {
    signOut();
    dispatch(setCurrentUser(null));
  };

  return (
    <>
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={fileSubmitHandler}
      />
      {currentUser.photo !== "" ? (
        <img
          onClick={() => fileRef.current?.click()}
          src={imageURL || currentUser.photo}
          alt="user photo"
          className="mx-auto mt-20 h-64 w-64 cursor-pointer rounded-full"
        />
      ) : (
        <div className=" mx-auto mt-20 flex h-36 w-36 items-center justify-center rounded-full bg-gray-500 text-3xl text-white">
          ?
        </div>
      )}
      {uploadMessgae()}
      <AuthForm
        mode="update"
        photoURL={imageURL}
        username={currentUser.username}
        email={currentUser.email}
      />

      <div className="mx-auto mt-3 flex w-5/6 flex-col justify-center p-3 md:w-6/12 xl:w-2/6 ">
        <Link
          to={"/create-listing"}
          className="mx-auto w-full cursor-pointer rounded-lg border-2 border-solid bg-slate-500 p-2 text-center text-white hover:bg-slate-200 hover:text-black"
        >
          Create Listing
        </Link>
        <div className="mx-auto mt-5 flex w-full justify-between p-3">
          <span
            className="cursor-pointer text-red-600"
            onClick={deleteUserHandler}
          >
            Delete Account
          </span>
          <span
            className="cursor-pointer text-red-600"
            onClick={signOutHandler}
          >
            Sign Out
          </span>
        </div>
      </div>
      <ProfileListing></ProfileListing>
    </>
  );
};

export default ProfilePage;
