import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);

  const getData = async () => {
    try {
      const responce = res.data.data.exchanges;
      setExchanges(responce);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    return toast.info("Tap to see Deatils!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }, []);

  return (
    <>
      <NavBar />
      <p className="text-center text-3xl font-bold pt-32 pb-10 uppercase font-nunito select-none">
        Exchanges
      </p>

      {exchanges ? (
        exchanges.map((curElem, id) => {
          const {
            name,
            lastTickerCreatedAt,
            marketShare,
            numberOfMarkets,
            rank,
            volume,
            websiteUrl,
            iconUrl,
            price,
          } = curElem;

          return (
            <div
              key={id}
              className="collapse border border-base-300 rounded-md shadow-lg my-5 py-4 mx-52 
                    laptop:mx-10 tablet:mx-10 mobile:mx-2"
            >
              <input type="checkbox" />

              <div className="collapse-title text-xl font-medium">
                <div className="flex items-center gap-5 px-5 cursor-pointer">
                  <div className="w-20 h-20">
                    <img src={iconUrl} alt="icons" />
                  </div>
                  <p className="font-bold text-2xl uppercase pb-2">{name}</p>
                </div>
              </div>

              <div className="collapse-content">
                <div className="flex justify-evenly items-center flex-wrap mobile:flex-col mobile:items-start mobile:px-5 mobile:pt-5">
                  <p className="font-semibold">Rank : {rank}</p>
                  {/* <p className="font-semibold">
                    lastTickerCreatedAt :
                    <span className="text-sm px-2 font-light">
                      {lastTickerCreatedAt}
                    </span>
                  </p> */}
                  <p className="font-semibold">
                    price :
                    <span className="text-sm px-2 font-light">{price}</span>
                  </p>
                  <p className="font-semibold">
                    number Of Markets :
                    <span className="text-sm px-2 font-light">
                      {numberOfMarkets}
                    </span>
                  </p>
                  {/* <p className="font-semibold">
                    volume :
                    <span className="text-sm px-2 font-light">
                      {curElem.24hVolume}
                    </span>
                  </p> */}
                  <p className="text-xs text-blue-600 font-medium lowercase cursor-pointer">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={websiteUrl}
                    >
                      {websiteUrl}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Exchanges;
