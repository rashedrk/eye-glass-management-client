import { ReactNode } from "react";

import {
  logout,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
