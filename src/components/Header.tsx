import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className=" bg-slate-200 shadow-sm ">
      <div className="flex justify-between mx-auto w-5/6 items-center p-3">
        <h1 className="font-bold text-sm sm:text-xl flex-wrap">
          <span className="text-slate-600">Tim</span>
          <span className="">Estate</span>
        </h1>
        <form className="bg-slate-100 p-2 rounded-lg flex justify-center items-center ">
          <input
            type="text"
            className="bg-transparent outline-none w-24 sm:w-64"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden md:inline text-slate-700 hover:underline cursor-pointer">Home</li>
          </Link>
          <Link to="about">
            <li className="hidden md:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to="sign-in">
            <li className=" text-slate-700 hover:underline cursor-pointer">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
