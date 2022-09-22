import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  const twitterUrl = "https://twitter.com/explore";
  const facebookUrl = "https://www.facebook.com/";
  const youtubeUrl = "https://www.youtube.com/";

  return (
    <div>
      <footer className="font-nunito select-none p-10 footer bg-gray-400 text-base-content footer-center">
        <div className="grid grid-flow-col gap-4 font-semibold uppercase">
          <p className="link link-hover">About us</p>
          <p className="link link-hover">Contact</p>
          <p className="link link-hover">Jobs</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4 py-5 cursor-pointer">
            <p className="text-2xl">
              <a target="_blank" rel="noopener noreferrer" href={twitterUrl}>
                <FaTwitter />
              </a>
            </p>
            <p className="text-2xl">
              <a target="_blank" rel="noopener noreferrer" href={youtubeUrl}>
                <FaYoutube />
              </a>
            </p>
            <p className="text-2xl">
              <a target="_blank" rel="noopener noreferrer" href={facebookUrl}>
                <FaFacebookSquare />
              </a>
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm">
            copyright © 2021-22 - All rights reserved by Armiet BE boys
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
