import React from "react";
import { Line } from "rc-progress";

const ReactProgress = () => (
  <>
    <p className="py-5 text-3xl font-nunito font-semibold mx-40 my-20">
      progress bar
    </p>
    <div className="w-1/2 rounded-2xl mx-40 bg-gray-300">
      <Line percent="20" strokeWidth="2" strokeColor="green" />
    </div>
  </>
);

export default ReactProgress;
