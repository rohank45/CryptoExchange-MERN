import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactTostify = () => {
  const checkTostify = () => {
    toast.success("Login Successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div className="h-screen bg-gray-100 font-nunito flex flex-col items-center">
      <p className="text-3xl font-bold text-gray-800 mt-40 mb-20">
        Welcome to the site...
      </p>
      <button
        className="px-5 py-2 bg-gray-300 text-2xl font-semibold text-gray-800 shadow-xl rounded-lg"
        onClick={checkTostify}
      >
        LOGIN
      </button>
      <ToastContainer />
    </div>
  );
};

export default ReactTostify;
