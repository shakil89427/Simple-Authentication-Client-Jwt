import axios from "axios";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";

const Authentication = () => {
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(true);
  const [msg, setmsg] = useState(false);
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
    axios
      .post("https://shakil-authentication-server.herokuapp.com/signup", data)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("accessToken", res.data);
          decodeUser(res.data);
          console.log(res);
        }
      })
      .catch((error) => {
        setmsg("Email Already Exist");
        setloading(false);
      });
  };

  /* Reset Password */
  const resetpass = (data) => {
    setloading(true);
    axios
      .post(
        "https://shakil-authentication-server.herokuapp.com/resetpassword",
        data
      )
      .then((res) => {
        if (res.data) {
          setmsg("Please Check your Inbox");
          setloading(false);
        } else {
          setmsg("Sorry User not found");
          setloading(false);
        }
      })
      .catch((error) => {
        setmsg("Sorry User not found");
        setloading(false);
      });
  };

  /* Login Method */
  const login = (data) => {
    setloading(true);
    axios
      .post("https://shakil-authentication-server.herokuapp.com/login", data)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("accessToken", res.data);
          decodeUser(res.data);
        }
      })
      .catch((error) => {
        setmsg("Authentication Error");
        setloading(false);
      });
  };

  /* Logout Method */
  const logout = () => {
    setUser({});
    localStorage.removeItem("accessToken");
  };

  return { user, loading, signup, login, logout, resetpass, msg, setmsg };
};

export default Authentication;
