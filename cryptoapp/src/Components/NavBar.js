import React, { useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { VscHome } from "react-icons/vsc";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsNewspaper } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { SiApacheecharts } from "react-icons/si";

import cLogo from "../Images/icons8-cryptocurrency-64.png";
import cImg from "../Images/FinanceappMonochromatic.png";

const NavBar = () => {
  const cookies = new Cookies();
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);
  const showSideMenu = () => {
    isSideMenuOpen ? setisSideMenuOpen(false) : setisSideMenuOpen(true);
  };

  const { currency, setCurrency } = CryptoState();

  return (
    <div
      className="fixed select-none font-nunito w-full py-6 flex justify-between items-center z-40
          shadow-lg text-xl bg-gray-400 text-gray-800 mobile:py-5 overflow-x-hidden"
    >
      <div className="flex gap-4 items-center text-3xl px-2 mobile:text-xl mobile:gap-2">
        <span className="w-10 ml-10 mobile:ml-1 tablet:ml-2">
          <img src={cLogo} alt="app logo png" />
        </span>
        <p className="font-black text-black">
          <Link to="/">TP-COIN</Link>
        </p>
      </div>

      {/* login logout toggle */}
      <div
        className="flex gap-4 items-center text-lg absolute right-24 
            mobile:gap-1 mobile:right-0 mobile:relative mobile:text-sm"
      >
        <div>
          {cookies.get("isLogin") ? (
            <button className="px-1 py-2 font-semibold text-gray-800 hover:underline">
              <Link to="/logout">Log out</Link>
            </button>
          ) : (
            <button className="px-1 py-2 font-semibold text-gray-800 hover:underline">
              <Link to="/login">Log In</Link>
            </button>
          )}
        </div>

        <select
          name="currencies"
          className="bg-gray-400 outline-none font-semibold cursor-pointer"
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <button
        onClick={() => {
          showSideMenu();
        }}
        className="menu-button overflow-x-hidden text-2xl mr-5"
      >
        {isSideMenuOpen ? <CgClose /> : <GiHamburgerMenu />}
      </button>
      {isSideMenuOpen ? SideMenu() : ""}
    </div>
  );

  function SideMenu() {
    return (
      <div className="fixed font-nunito h-screen bg-gray-400 top-20 w-1/5 mobile:w-2/3 tablet:w-2/5 laptop:w-2/5">
        <ul className="menu-list font-semibold flex flex-col gap-3 pt-6 laptop:pt-14 tablet:pt-8 mobile:pt-2 tablet:gap-5">
          <div className="px-10">
            <img src={cImg} alt="app logo png" />
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-500 hover:text-white px-8 py-2 mobile:py-1">
            <span className="text-2xl laptop:text-4xl tablet:text-4xl">
              <VscHome />
            </span>
            <Link to="/">Home</Link>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-500 hover:text-white px-8 py-2 mobile:py-1">
            <span className="text-2xl laptop:text-4xl tablet:text-4xl">
              <SiApacheecharts />
            </span>
            <Link to="/coins">Buy Crypto's</Link>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-500 hover:text-white px-8 py-2 mobile:py-1">
            <span className="text-2xl laptop:text-4xl tablet:text-4xl">
              <MdFavoriteBorder />
            </span>
            <Link to="/portfolio">Portfolio</Link>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-500 hover:text-white px-8 py-2 mobile:py-1">
            <span className="text-2xl laptop:text-4xl tablet:text-4xl">
              <FiEye />
            </span>
            <Link to="/watchlist">WatchList</Link>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-500 hover:text-white px-8 py-2 mobile:py-1">
            <span className="text-2xl laptop:text-4xl tablet:text-4xl">
              <RiMoneyCnyCircleLine />
            </span>
            <Link to="/exchanges">Exchanges</Link>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-500 hover:text-white px-8 py-2 mobile:py-1">
            <span className="text-2xl laptop:text-4xl tablet:text-4xl">
              <BsNewspaper />
            </span>
            <Link to="/news">News</Link>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-500 hover:text-white px-8 py-2 mobile:py-1">
            <span className="text-2xl laptop:text-4xl tablet:text-4xl">
              <CgProfile />
            </span>
            <Link to="/profile">Profile</Link>
          </div>
        </ul>
      </div>
    );
  }
};

export default NavBar;
