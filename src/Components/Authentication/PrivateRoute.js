import React from "react";
import { Navigate } from "react-router";
import useAuth from "./useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="user bg-info d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (!user.name) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
