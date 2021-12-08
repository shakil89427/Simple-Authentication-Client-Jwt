import axios from "axios";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";

const Authentication = () => {
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(true);
  const accesstoken = localStorage.getItem("accessToken");

  /* Decode User Token */
  const decodeUser = (token) => {
    const decoded = decodeToken(token);
    setUser(decoded);
    setloading(false);
  };

  /* Check Token Activity */
  useEffect(() => {
    const expiredtoken = isExpired(accesstoken);
    if (!accesstoken) {
      setUser({});
      return setloading(false);
    }
    if (expiredtoken) {
      setUser({});
      localStorage.removeItem("accessToken");
      return setloading(false);
    }
    decodeUser(accesstoken);
  }, [accesstoken]);

  /* Signup Method */
  const signup = (data) => {
    setloading(true);
    try {
      axios
        .post("https://shakil-authentication-server.herokuapp.com/signup", data)
        .then((res) => {
          localStorage.setItem("accessToken", res.data);
          decodeUser(res.data);
        });
    } catch (error) {
      setloading(false);
    }
  };

  /* Reset Password */
  const resetpass = (data) => {
    setloading(true);
    try {
      axios
        .post(
          "https://shakil-authentication-server.herokuapp.com/resetpassword",
          data
        )
        .then((res) => {
          setloading(false);
        });
    } catch (error) {}
  };

  /* Login Method */
  const login = (data) => {
    setloading(true);
    try {
      axios
        .post("https://shakil-authentication-server.herokuapp.com/login", data)
        .then((res) => {
          if (!res.data.message) {
            localStorage.setItem("accessToken", res.data);
            decodeUser(res.data);
          }
        });
    } catch (error) {
      setloading(false);
    }
  };

  /* Logout Method */
  const logout = () => {
    setUser({});
    localStorage.removeItem("accessToken");
  };

  return { user, loading, signup, login, logout, resetpass };
};

export default Authentication;
