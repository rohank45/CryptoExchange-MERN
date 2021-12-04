import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";

const DeleteProfile = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const deleteUser = async () => {
    try {
      await axios.delete("/deleteUser");

      dispatch({ type: "User", payload: false });

      history.push("/");
      return alert("Account deleted!");
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
