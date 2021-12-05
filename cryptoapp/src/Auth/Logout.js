import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { UserContext } from "../App";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const LogoutFunction = async () => {
    try {
      await axios.get("/logout");

      dispatch({ type: "User", payload: false });

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
