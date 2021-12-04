import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const LogoutFunction = async () => {
    try {
      await axios.get("/logout");

      dispatch({ type: "User", payload: false });

      history.push("/login");
      return alert("Logout Successfully!");
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
