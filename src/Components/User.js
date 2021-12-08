import React from "react";
import useAuth from "./Authentication/useAuth";

const User = () => {
  const { user, logout, loading } = useAuth();

  return (
    <div className="user bg-info d-flex align-items-center justify-content-center">
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <span className="shadow p-3 rounded text-center">
          <h5 className="text-white">{user.name}</h5>
          <h5 className="text-white">{user.email}</h5>
          <button
            onClick={logout}
            className="border-0 bg-danger text-white my-2 px-2 rounded"
          >
            Logout
          </button>
        </span>
      )}
    </div>
  );
};

export default User;
