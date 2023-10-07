import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../types/Types";
import { useEffect } from "react";

const AuthRoutes = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null;
};

export default AuthRoutes;
