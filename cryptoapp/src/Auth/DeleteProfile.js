import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const DeleteProfile = () => {
  const history = useHistory();

  const deleteUser = async () => {
    try {
      await axios.delete("/deleteUser");

      //localstorgae
      localStorage.removeItem("isLogin");

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
