import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.status === 200) {
          const error = new Error(res.error);
          console.log("logout error" + error);
        } else {
          dispatch({ type: "User", payload: false });
          history.push("/login", { replace: true });
          return alert("Logout Successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <p>logout</p>
    </div>
  );
};

export default Logout;
