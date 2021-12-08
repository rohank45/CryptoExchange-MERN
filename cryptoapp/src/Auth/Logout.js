import axios from "axios";
import Cookies from "universal-cookie";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Logout = () => {
  const cookies = new Cookies();
  const history = useHistory();

  const LogoutFunction = async () => {
    try {
      await axios.get("/logout");

      cookies.remove("isLogin");

      history.push("/login");
      return toast.success("Logout Successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LogoutFunction();
  });

  return <></>;
};

export default Logout;
