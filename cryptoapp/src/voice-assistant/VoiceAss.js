import React from "react";
import { RiUserVoiceLine } from "react-icons/ri";

const VoiceAss = () => {
  return (
    <>
      <button
        onClick={() => alert("voice assistant here...")}
        className="z-50 fixed bottom-14 right-14 border-2 border-black bg-gray-900 text-gray-50 text-2xl p-4 
          rounded-full mobile:p-3 mobile:bottom-8 mobile:right-8 opacity-90"
      >
        <RiUserVoiceLine />
      </button>
    </>
  );
};

export default VoiceAss;
