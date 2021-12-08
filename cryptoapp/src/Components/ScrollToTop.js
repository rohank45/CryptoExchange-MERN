import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <button>
        <span
          onClick={scrollTop}
          className="z-50 fixed bottom-16 left-10 border-2 border-black bg-black text-white text-4xl 
            rounded-full mobile:text-2xl mobile:bottom-8 mobile:left-5 tablet:bottom-10 opacity-70"
          style={{ display: visible ? "inline" : "none" }}
        >
          <FaArrowCircleUp />
        </span>
      </button>
    </>
  );
};

export default ScrollToTop;
