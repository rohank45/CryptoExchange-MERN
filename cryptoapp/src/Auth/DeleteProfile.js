import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { UserContext } from "../App";

const DeleteProfile = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const deleteUser = async () => {
    try {
      await axios.delete("/deleteUser");

      dispatch({ type: "User", payload: false });

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
