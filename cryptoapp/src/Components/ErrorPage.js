import React from "react";
import { Link } from "react-router-dom";
import errors from "../Images/404.png";
import NavBar from "./NavBar";

const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex justify-center pt-32 mobile:pt-40 px-5">
        <div className="text-5xl mobile:text-2xl text-center font-bold font-nunito">
          <span className="h-96 w-96">
            <img src={errors} alt="error" />
          </span>
          <br />
          <Link to="/">
            Back to
            <span className="bg-gray-200 text-gray-800 rounded-lg px-2 mx-1">
              HOME
            </span>
            page!
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
