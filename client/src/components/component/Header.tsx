import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/Types";
import { useForm } from "react-hook-form";
import { setCurrentSearchTerm } from "../../redux/feature/searchSlice";

const Header = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<{ search: string }>();
  const navigate = useNavigate();

  const submitHandler = (data: { search: string }) => {
    dispatch(setCurrentSearchTerm(data.search));
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", data.search);
    navigate("/search?" + urlParams.toString());
  };

  return (
    <header className=" bg-slate-200 shadow-sm ">
      <div className="mx-auto flex w-5/6 items-center justify-between p-3">
        <Link to="/">
          <h1 className="flex-wrap text-sm font-bold sm:text-xl">
            <span className="text-slate-600">Tim</span>
            <span className="">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex items-center justify-center rounded-lg bg-slate-100 p-2 "
        >
          <input
            type="text"
            {...register("search")}
            className="w-24 bg-transparent outline-none sm:w-64"
            placeholder="Search..."
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden cursor-pointer text-slate-700 hover:underline md:inline">
              Home
            </li>
          </Link>
          <Link to="about">
            <li className="hidden cursor-pointer text-slate-700 hover:underline md:inline">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to="profile">
              {currentUser.photo === "" ? (
                currentUser.username
              ) : (
                <img
                  src={currentUser.photo}
                  alt="user photo"
                  className="mx-auto h-7 w-7 rounded-full"
                />
              )}
            </Link>
          ) : (
            <Link to="sign-in">
              <li className=" cursor-pointer text-slate-700 hover:underline">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
