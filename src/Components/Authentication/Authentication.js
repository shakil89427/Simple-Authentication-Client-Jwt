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
      axios.post("http://localhost:5000/signup", data).then((res) => {
        localStorage.setItem("accessToken", res.data);
        decodeUser(res.data);
      });
    } catch (error) {
      alert(error.message);
      setloading(false);
    }
  };

  /* Login Method */
  const login = (data) => {
    setloading(true);
    try {
      axios.post("http://localhost:5000/login", data).then((res) => {
        if (!res.data.message) {
          localStorage.setItem("accessToken", res.data);
          decodeUser(res.data);
        } else {
          alert(res.data.message);
        }
      });
    } catch (error) {
      alert(error.message);
      setloading(false);
    }
  };

  /* Check Verification */
  const verification = () => {
    setloading(true);
    try {
      axios
        .get("http://localhost:5000/verification", {
          headers: { authorization: "Bearer " + "" + accesstoken },
        })
        .then((res) => alert("Verified"));
    } catch (error) {
      alert(error.message);
      setloading(false);
    }
  };

  /* Logout Method */
  const logout = () => {
    setUser({});
    localStorage.removeItem("accessToken");
  };

  return { user, loading, signup, login, logout, verification };
};

export default Authentication;
