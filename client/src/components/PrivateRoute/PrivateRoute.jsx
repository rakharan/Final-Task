import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const AuthenticatedRoute = ({ role, children }) => {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  if (state.isLogin === false) {
    navigate("/login");
    return null;
  }

  if (role && state.user.role !== role) {
    navigate("/");
    return null;
  }

  return <>{children}</>;
};

export const PrivateRoute = () => {
  return (
    <AuthenticatedRoute role="user">
      <Outlet />
    </AuthenticatedRoute>
  );
};

export const PrivateRouteAdmin = () => {
  return (
    <AuthenticatedRoute role="admin">
      <Outlet />
    </AuthenticatedRoute>
  );
};
