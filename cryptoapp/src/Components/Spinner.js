import React from "react";
// import { BounceLoader, BarLoader, BeatLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const ReactSpinners = () => {
  return (
    <div className="flex justify-center my-96 gap-5">
      {/* <BeatLoader size={24} color="red" loading />
      <BounceLoader size={48} color="red" loading />
      <BarLoader size={72} color="red" loading /> */}

      <ClipLoader color="black" loading size={40} />
      <span className="font-nunito font-bold text-2xl text-gray-800">
        loading...
      </span>
    </div>
  );
};

export default ReactSpinners;
