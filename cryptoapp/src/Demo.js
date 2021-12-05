import React from "react";

const Demo = () => {
  return (
    <form>
      <button
        type="submit"
        className="bg-gray-800 text-center text-white font-bold text-3xl rounded-lg p-5"
      >
        <a href="/auth/google">signup with google</a>
      </button>
    </form>
  );
};

export default Demo;
