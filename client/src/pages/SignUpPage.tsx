import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
  email: string;
};

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <div className="p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-12">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          {...register("username")}
          placeholder="username"
          type="text"
          className="rounded-lg border-2 border-solid p-2"
        />
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="rounded-lg border-2 border-solid p-2"
        />
        <input
          {...register("email")}
          placeholder="email"
          type="email"
          className="rounded-lg border-2 border-solid p-2"
        />
        <button
          type="submit"
          className="rounded-lg border-2 border-solid p-2 cursor-pointer bg-slate-500 text-white hover:bg-slate-200 hover:text-black disabled:opacity-70"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Have an account?</p>
        <Link to="/sign-in" className="hover:underline">
          <span className="text-red-400">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
