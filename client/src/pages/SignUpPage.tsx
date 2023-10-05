import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "../components/types/Types";
import { signUp } from "../components/util/Http";
import { useMutation } from "@tanstack/react-query";

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const errorMessages = (error: string) => {
    if (error.includes("username") && error.includes("key")) {
      return "Username has been used";
    }
    if (error.includes("email") && error.includes("key")) {
      return "Email has been used";
    }
    if (error.includes("username") && error.includes("length")) {
      return "Username length is too short, at least 3 characters";
    }
    if (error.includes("email") && error.includes("length")) {
      return "Email length is too short, at least 3 characters";
    }
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/sign-in");
    },
    onError: () => {
      navigate("/sign-up");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => mutate(data);

  return (
    <div className="p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-12">Sign Up</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username")}
          id="username"
          placeholder="username"
          type="text"
          className="rounded-lg border-2 border-solid p-2"
        />
        <input
          {...register("password")}
          id="password"
          placeholder="password"
          type="password"
          className="rounded-lg border-2 border-solid p-2"
        />
        <input
          {...register("email")}
          id="email"
          placeholder="email"
          type="email"
          className="rounded-lg border-2 border-solid p-2"
        />
        <button
          type="submit"
          className={`rounded-lg border-2 border-solid p-2 cursor-pointer bg-slate-500 text-white hover:bg-slate-200 hover:text-black ${
            isLoading ? " disabled:opacity-70" : ""
          } `}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {isError && (
        <p className="mt-4 text-red-500 text-2xl">{errorMessages((error as Error).message)}</p>
      )}

      <div className="flex gap-2 mt-5">
        <p className="">Have an account?</p>
        <Link to="/sign-in" className="hover:underline">
          <span className="text-blue-400">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
