import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { CurrentUserState } from "../types/Types";
import { useEffect } from "react";

const AuthRoutes = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: CurrentUserState) => state.user);
  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null;
};

export default AuthRoutes;
