import axios from "axios";
import React, { useEffect, useState } from "react";
import { isExpired } from "react-jwt";

const ResetPassword = () => {
  const [wait, setWait] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState({});
  const [disable, setDisable] = useState(false);
  const token = window.location.href.split("resetpassword/")[1];

  useEffect(() => {
    const expired = isExpired(token);
    if (expired) {
      setTokenExpired(true);
      setWait(false);
      return;
    }
    axios
      .post(
        "https://shakil-authentication-server.herokuapp.com/checkresettoken",
        { token: token }
      )
      .then((res) => {
        if (res.data) {
          setWait(false);
          setActive(true);
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
    if (userData.password.length < 6) {
      return alert("Password must be minimum 6 digits long");
    }
    if (userData.password !== userData.password2) {
      return alert("Password didn't matched");
    }
    setActive(false);
    setWait(true);
    axios
      .post("https://shakil-authentication-server.herokuapp.com/confirmreset", {
        token: token,
        userData: userData,
      })
      .then((res) => {
        if (res.data) {
          alert("Password Changed Successfully");
          setDisable(true);
          setActive(true);
          setWait(false);
        }
      });
  };

  return (
    <div className="user bg-info d-flex align-items-center justify-content-center text-center">
      {wait && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {tokenExpired && <h5>Sorry Link Expired</h5>}

      {active && (
        <form className="shadow p-3 rounded m-3" onSubmit={resetpassconfirm}>
          <h5>Enter New Password</h5>
          <input
            disabled={disable}
            required
            name="password"
            onChange={getData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Password"
            type="text"
          />
          <br />
          <input
            disabled={disable}
            required
            name="password2"
            onChange={getData}
            className="border-0 shadow my-1 px-2 py-1 rounded"
            placeholder="Password Again"
            type="text"
          />
          <br />
          <button
            disabled={disable}
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
