import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { app } from "../../firebase";
import { googleSignIn } from "../util/Http";
import { GoogleData, SignInResponseData } from "../types/Types";
import { setCurrentUser } from "../../redux/feature/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: googleSignIn,
    onSuccess: (data: SignInResponseData) => {
      dispatch(setCurrentUser(data.user));
      navigate("/");
    },
    onError: () => navigate("/sign-in"),
  });

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("🚀 ~ file: GoogleAuth.tsx:30 ~ handleGoogleAuth ~ result:", result);

      const { displayName, email, photoURL } = result.user;
      const data: GoogleData = {
        user: {
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        },
      };
      mutate(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className={`rounded-lg border-2 border-solid p-2 cursor-pointer bg-red-500 text-white
       hover:bg-red-200 hover:text-black`}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default GoogleAuth;
