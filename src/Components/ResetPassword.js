import axios from "axios";
import React, { useEffect, useState } from "react";
import { isExpired } from "react-jwt";

const ResetPassword = () => {
  const [wait, setWait] = useState(true);
  const [userData, setUserData] = useState({});
  const token = window.location.href.split("resetpassword/")[1];

  useEffect(() => {
    const expired = isExpired(token);
    if (expired) {
      return;
    }
    axios
      .post(
        "https://shakil-authentication-server.herokuapp.com/checkresettoken",
        { token: token }
      )
      .then((res) => {
        if (res.data === "ok") {
          setWait(false);
        }
      });
  }, [token]);

  const getData = (e) => {
    let oldData = { ...userData };
    const name = e.target.name;
    const value = e.target.value;
    oldData[name] = value;
    setUserData(oldData);
  };

  const resetpassconfirm = (e) => {
    e.preventDefault();
    if (userData.password !== userData.password2) {
      return alert("Please check your password");
    }
    axios
      .post("https://shakil-authentication-server.herokuapp.com/confirmreset", {
        token: token,
        userData: userData,
      })
      .then((res) => console.log(res));
  };

  return (
    <div className="user bg-info d-flex align-items-center justify-content-center text-center">
      {wait ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <form className="shadow p-3 rounded m-3" onSubmit={resetpassconfirm}>
          <h5>Enter New Password</h5>
          <input
            required
            name="password"
            onChange={getData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Password"
            type="text"
          />
          <br />
          <input
            required
            name="password2"
            onChange={getData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Password Again"
            type="text"
          />
          <br />
          <button
            className="w-50 border-0 bg-dark text-white my-2 px-2 py-1 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
