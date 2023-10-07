import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues, SignInResponseData } from "../types/Types";
import { signUp, signIn } from "../util/Http";
import { useMutation } from "@tanstack/react-query";
import { setCurrentUser } from "../../redux/feature/userSlice";
import { useDispatch } from "react-redux";
import GoogleAuth from "./GoogleAuth";

type Mode = { mode: "signUp" | "signIn" };

const Form = ({ mode }: Mode) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutationOptions =
    mode === "signUp"
      ? {
          mutationFn: signUp,
          onSuccess: () => {
            navigate("/sign-in");
          },
          onError: () => navigate("/sign-up"),
        }
      : {
          mutationFn: signIn,
          onSuccess: (data: SignInResponseData) => {
            dispatch(setCurrentUser(data.user));
            navigate("/");
          },
          onError: () => navigate("/sign-in"),
        };

  const { mutate, isLoading, isError, error } = useMutation(mutationOptions);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data);
  };

  return (
    <div className="p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-12">
        {mode === "signUp" ? "Sign Up" : "Sign In"}
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        {mode === "signUp" && (
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
          {isLoading ? "Loading..." : mode === "signUp" ? "Sign Up" : "Sign In"}
        </button>
        <GoogleAuth />
      </form>
      {isError && <p className="mt-4 text-red-500 text-2xl">{(error as Error).message}</p>}

      <div className="flex gap-2 mt-5">
        <p className="">{mode === "signUp" ? "Have an account?" : "Don't have an account?"}</p>
        <Link to={mode === "signUp" ? "/sign-in" : "/sign-up"} className="hover:underline">
          <span className="text-blue-400"> {mode === "signUp" ? "Sign In" : "Sign Up"}</span>
        </Link>
      </div>
    </div>
  );
};

export default Form;
