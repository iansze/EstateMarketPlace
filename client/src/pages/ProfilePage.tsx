import { ChangeEvent, useEffect, useRef, useState } from "react";
import Form from "../components/component/Form";
import { RootState } from "../components/types/Types";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

const ProfilePage = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");

  useEffect(() => {
    if (file) {
      fileUploadHandler(file);
    }
  }, [file]);

  const fileUploadHandler = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        setUploadError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);

          setUploadError("");
        });
      }
    );
  };

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
        <div className="text-red-600 mt-5 p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto text-center text-2xl">
          User does not have permission to upload this file
        </div>
      );
    } else {
      if (uploadProgress > 0 && uploadProgress < 100) {
        return (
          <div className="text-green-600  mt-5 p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto text-center text-2xl">
            Uploaded {uploadProgress}%
          </div>
        );
      }
    }
    if (uploadProgress === 100) {
      return (
        <div className="text-green-600 mt-5 p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto text-center text-2xl">
          Uploaded Successfully
        </div>
      );
    }
  };

  return (
    <>
      <input type="file" ref={fileRef} hidden accept="image/*" onChange={fileSubmitHandler} />
      {currentUser.photo !== "" ? (
        <img
          onClick={() => fileRef.current?.click()}
          src={imageURL || currentUser.photo}
          alt="user photo"
          className="rounded-full mx-auto mt-20 cursor-pointer h-64 w-64"
        />
      ) : (
        <div className="mx-auto mt-20 bg-gray-500 w-36 h-36 rounded-full flex items-center justify-center text-white text-3xl">
          ?
        </div>
      )}
      {uploadMessgae()}
      <Form
        mode="update"
        photoURL={imageURL}
        username={currentUser.username}
        email={currentUser.email}
      />
      <div className="flex justify-between mt-5 p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto ">
        <span className="cursor-pointer text-red-600">Delete Account</span>
        <span className="cursor-pointer text-red-600">Sign Out</span>
      </div>
    </>
  );
};

export default ProfilePage;
