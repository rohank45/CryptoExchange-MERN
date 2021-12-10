import axios from "axios";
import Cookies from "universal-cookie";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const DeleteProfile = () => {
  const cookies = new Cookies();
  const history = useHistory();

  const deleteUser = async () => {
    try {
      await axios.delete("/deleteUser");

      cookies.remove("isLogin");

      localStorage.removeItem("watchlist_data");

      history.push("/");
      return toast.success("Account deleted!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deleteUser();
  });

  return <></>;
};

export default DeleteProfile;
