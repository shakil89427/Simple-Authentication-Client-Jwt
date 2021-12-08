import React, { useState } from "react";
import useAuth from "./Authentication/useAuth";
import "../App.css";
import { Navigate } from "react-router";

const SignupLogin = () => {
  const { signup, login, user, resetpass, loading } = useAuth();
  const [signupData, setSignupData] = useState({});
  const [resetemail, setResetEmail] = useState({});
  const [loginData, setLoginData] = useState({});

  /* Signup */
  const getSignUpData = (e) => {
    let oldData = { ...signupData };
    const name = e.target.name;
    const value = e.target.value;
    oldData[name] = value;
    setSignupData(oldData);
  };

  const userSignup = (e) => {
    e.preventDefault();
    if (
      signupData.password.length < 6 &&
      signupData.password !== signupData.password2
    ) {
      return alert("Password must be minimum 6 digits long and matched");
    }
    signup(signupData);
    e.target.reset();
  };

  /* Reset */
  const getResetData = (e) => {
    let oldData = { ...resetemail };
    const name = e.target.name;
    const value = e.target.value;
    oldData[name] = value;
    setResetEmail(oldData);
  };

  const resetpassword = (e) => {
    e.preventDefault();
    resetpass(resetemail);
    e.target.reset();
  };

  /* Login */
  const getLoginData = (e) => {
    let oldData = { ...loginData };
    const name = e.target.name;
    const value = e.target.value;
    oldData[name] = value;
    setLoginData(oldData);
  };

  const userLogin = (e) => {
    e.preventDefault();
    login(loginData);
    e.target.reset();
  };

  return (
    <div className="bg-info main text-center">
      <h3 className="bg-dark text-white py-2">
        Simple Authentication with Database
      </h3>
      {loading ? (
        <div className="box d-flex justify-content-center align-items-center">
          <div className="spinner-border " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="box d-flex flex-column flex-md-row flex-lg-row  justify-content-center align-items-center">
          {/* Signup */}
          <form className="shadow p-3 rounded m-3" onSubmit={userSignup}>
            <input
              required
              name="name"
              onChange={getSignUpData}
              className="border-0 shadow my-1 px-2 py-1 rounded"
              placeholder="Name"
              type="text"
            />
            <br />
            <input
              required
              name="email"
              onChange={getSignUpData}
              className="border-0 shadow my-1 px-2 py-1 rounded"
              placeholder="Email"
              type="email"
            />
            <br />
            <input
              required
              name="password"
              onChange={getSignUpData}
              className="border-0 shadow my-1 px-2 py-1 rounded"
              placeholder="Password"
              type="password"
            />
            <br />
            <button
              disabled={loading}
              className="w-50 border-0 bg-dark text-white my-2 px-2 py-1 rounded"
              type="submit"
            >
              Signup
            </button>
          </form>

          {/* Reset Password */}
          <form className="shadow p-3 rounded m-3" onSubmit={resetpassword}>
            <h5>Reset Password</h5>
            <input
              name="email"
              required
              onChange={getResetData}
              className="border-0 shadow my-1 px-2 py-1 rounded"
              placeholder="Email"
              type="email"
            />
            <button
              disabled={loading}
              className="w-50 border-0 bg-dark text-white my-2 px-2 py-1 rounded"
              type="submit"
            >
              Send Link
            </button>
          </form>

          {/* Login */}
          <form className="shadow p-3 rounded m-3" onSubmit={userLogin}>
            <input
              name="email"
              required
              onChange={getLoginData}
              className="border-0 shadow my-1 px-2 py-1 rounded"
              placeholder="Email"
              type="email"
            />
            <br />
            <input
              name="password"
              required
              onChange={getLoginData}
              className="border-0 shadow my-1 px-2 py-1 rounded"
              placeholder="Password"
              type="password"
            />
            <br />
            <input
              name="password2"
              required
              onChange={getLoginData}
              className="border-0 shadow my-1 px-2 py-1 rounded"
              placeholder="Password Again"
              type="password"
            />
            <br />
            <button
              disabled={loading}
              className="w-50 border-0 bg-dark text-white my-2 px-2 py-1 rounded"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      )}
      {user.name && <Navigate to="/user" />}
    </div>
  );
};

export default SignupLogin;
