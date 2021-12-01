import React, { useEffect } from "react";

const Demo = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center text-white font-bold text-3xl gap-20 my-20">
        <div className="bg-gray-400 w-1/2 rounded-lg py-32">1</div>
        <div className="bg-gray-500 w-1/2 rounded-lg py-32">2</div>
        <div className="bg-gray-600 w-1/2 rounded-lg py-32">3</div>
        <div className="bg-gray-500 w-1/2 rounded-lg py-32">4</div>
        <div data-aos="flip-up" className="bg-gray-400 w-1/2 rounded-lg py-32">
          5
        </div>
      </div>
    </>
  );
};

export default Demo;
