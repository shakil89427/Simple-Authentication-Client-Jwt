import React, { useEffect, useState } from "react";
import useAuth from "./Authentication/useAuth";
import "../App.css";

const SignupLogin = () => {
  const { signup, login, logout, user, loading, verification } = useAuth();
  const [signupData, setSignupData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [status, setStatus] = useState(false);

  const getSignUpData = (e) => {
    let oldData = { ...signupData };
    const name = e.target.name;
    const value = e.target.value;
    oldData[name] = value;
    setSignupData(oldData);
  };

  const userSignup = (e) => {
    e.preventDefault();
    signup(signupData);
    e.target.reset();
  };

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

  useEffect(() => {
    if (user.name) {
      return setStatus(true);
    }
    setStatus(false);
  }, [user]);

  return (
    <div className="container mx-auto my-5 p-3 text-center bg-info shadow-lg rounded">
      <h3>Simple Authentication with Database</h3>
      {loading && (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
      {user.name && (
        <span>
          <h5 className="text-white">Name: {user.name}</h5>
          <h5 className="text-white">Email: {user.email}</h5>
          <button
            style={{ width: "150px" }}
            onClick={verification}
            className="me-1 border-0 bg-dark text-white my-2 px-2 py-1 rounded"
          >
            Check Verify
          </button>
          <button
            style={{ width: "150px" }}
            onClick={logout}
            className="border-0 bg-dark text-white my-2 px-2 py-1 rounded"
          >
            Logout
          </button>
        </span>
      )}
      <div className="p-3 d-flex flex-column flex-md-row flex-lg-row  ">
        <form className="shadow mx-auto p-3 rounded mt-3" onSubmit={userSignup}>
          <input
            disabled={status}
            required
            name="name"
            onChange={getSignUpData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Name"
            type="text"
          />
          <br />
          <input
            disabled={status}
            required
            name="email"
            onChange={getSignUpData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Email"
            type="email"
          />
          <br />
          <input
            disabled={status}
            required
            name="password"
            onChange={getSignUpData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Password"
            type="password"
          />
          <br />
          <button
            disabled={status || loading}
            className="w-50 border-0 bg-dark text-white my-2 px-2 py-1 rounded"
            type="submit"
          >
            Signup
          </button>
        </form>
        <form className="shadow mx-auto p-3 rounded mt-3" onSubmit={userLogin}>
          <input
            disabled={status}
            name="email"
            required
            onChange={getLoginData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Email"
            type="email"
          />
          <br />
          <input
            disabled={status}
            name="password"
            required
            onChange={getLoginData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Password"
            type="password"
          />
          <br />
          <input
            disabled={status}
            name="password2"
            required
            onChange={getLoginData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Password Again"
            type="password"
          />
          <br />
          <button
            disabled={status || loading}
            className="w-50 border-0 bg-dark text-white my-2 px-2 py-1 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupLogin;
