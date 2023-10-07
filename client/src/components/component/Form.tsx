import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues, SignInResponseData } from "../types/Types";
import { signUp, signIn } from "../util/Http";
import { useMutation } from "@tanstack/react-query";
import { setCurrentUser } from "../../redux/feature/userSlice";
import { useDispatch } from "react-redux";
import GoogleAuth from "./GoogleAuth";

type Mode = { mode: "signUp" | "signIn" | "update" };

const Form = ({ mode }: Mode) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutationOptions = {
    signUp: {
      mutationFn: signUp,
      onSuccess: () => navigate("/sign-in"),
      onError: () => navigate("/sign-up"),
    },
    signIn: {
      mutationFn: signIn,
      onSuccess: (data: SignInResponseData) => {
        dispatch(setCurrentUser(data.user));
        navigate("/");
      },
      onError: () => navigate("/sign-in"),
    },
    update: {
      mutationFn: signIn,
      onSuccess: () => {
        navigate("/profile");
      },
      onError: () => navigate("/sign-in"),
    },
  };

  const { mutate, isLoading, isError, error } = useMutation(mutationOptions[mode]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data);
  };

  return (
    <div className="p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-12">
        {
          {
            signUp: "Sign Up",
            signIn: "Sign In",
            update: "Update Profile",
          }[mode]
        }
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        {(mode === "signUp" || mode === "update") && (
          <input
            {...register("username")}
            id="username"
            placeholder="username"
            type="text"
            className="rounded-lg border-2 border-solid p-2"
            minLength={3}
          />
        )}
        <input
          {...register("email")}
          id="email"
          placeholder="email"
          type="email"
          className="rounded-lg border-2 border-solid p-2"
        />
        <input
          {...register("password")}
          id="password"
          placeholder="password"
          type="password"
          className="rounded-lg border-2 border-solid p-2"
          minLength={3}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-lg border-2 border-solid p-2 cursor-pointer bg-slate-500 text-white hover:bg-slate-200 hover:text-black ${
            isLoading ? " disabled:opacity-70" : ""
          } `}
        >
          {isLoading
            ? "Loading..."
            : { signUp: "Sign Up", signIn: "Sign In", update: "Update" }[mode]}
        </button>
        {/*Goole Login*/}
        {(mode === "signUp" || mode === "signIn") && <GoogleAuth />}
      </form>
      {isError && <p className="mt-4 text-red-500 text-2xl">{(error as Error).message}</p>}

      {(mode === "signUp" || mode === "signIn") && (
        <div className="flex gap-2 mt-5">
          <p className="">{mode === "signUp" ? "Have an account?" : "Don't have an account?"}</p>
          <Link to={mode === "signUp" ? "/sign-in" : "/sign-up"} className="hover:underline">
            <span className="text-blue-400"> {mode === "signUp" ? "Sign In" : "Sign Up"}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Form;
