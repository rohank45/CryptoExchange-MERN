import React from "react";
import { BsBell } from "react-icons/bs";

const Alert = ({ color }) => {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <>
      {showAlert ? (
        <div
          className={
            "text-white px-6 py-4 border-0 rounded relative mb-4 bg-" +
            color +
            "-500"
          }
        >
          <span className="text-2xl inline-block mr-5 align-middle">
            <BsBell />
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">Warning!</b> Login Unsuccessfull
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default function ClosingAlert() {
  return (
    <>
      <Alert color="red" />
    </>
  );
}
