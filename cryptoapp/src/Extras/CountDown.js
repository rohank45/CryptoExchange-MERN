import React from "react";
import Countdown from "react-countdown";

const conditional = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    alert("sale started");
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const CountDown = () => {
  return (
    <div className="font-nunito font-bold text-3xl text-gray-800 text-center bg-gray-200 h-screen pt-96">
      <p>🎁🎁 Sale starts in...</p>
      <br />
      <Countdown date={Date.now() + 20000} conditional={conditional} />,
    </div>
  );
};

export default CountDown;
