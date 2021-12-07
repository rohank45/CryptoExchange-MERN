import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../../Config/Api";
import { CryptoState } from "../../Components/CryptoContext";
import ChartCrypto from "./ChartCrypto";
import NavBar from "../../Components/NavBar";
import { toast } from "react-toastify";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __dev__ = document.domain === "localhost";

//main function
const CryptoDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbols } = CryptoState();

  const getData = async () => {
    try {
      const res = await axios.get(SingleCoin(id));
      setCoin(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //payment
  const displayRazorPay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      return toast.error("Payment failed!, check your connection!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }

    const amount = coin?.market_data.current_price.inr;

    const options = {
      key: __dev__ ? "rzp_test_nvbgBY8uNQpEwZ" : "Production key here",
      name: "TP-Coin",
      description: "Transaction for buying cryptos.",
      image: "https://example.com/your_logo",
      currency: "INR",
      amount: amount * 100,

      handler: function(response) {
        // console.log(response.razorpay_payment_id);

        return toast.success("Payment Succuess!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      },
      prefill: {
        name: "rohan",
        email: "test.rohan@example.com",
        contact: "9898989898",
      },
      theme: {
        color: "#3B3B3B",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <NavBar />

      <div
        className="py-32 mobile:py-0 mobile:pt-32 mx-20 laptop:mx-10 tablet:mx-10 mobile:mx-0 
          flex gap-8 tablet:gap-0 mobile:gap-0 mobile:flex-col tablet:flex-col overflow-x-hidden"
      >
        <div className="w-1/2 mobile:pl-2 mobile:w-full tablet:w-full">
          <div className="flex flex-col gap-3">
            <div className="avatar flex gap-2">
              <div className="w-16 h-16 mask mask-squircle">
                <img src={coin?.image.large} alt="crypto icon" />
              </div>
              <div className="font-nunito font-bold pt-5 text-2xl uppercase">
                {coin?.symbol}
              </div>
              <div className="font-nunito font-semibold pt-5 text-2xl">
                {coin?.name}
              </div>
            </div>
            <div>
              <p className="font-nunito text-xs py-8">
                {coin?.description.en}.
              </p>
              <p className="font-nunito font-bold flex gap-1 text-lg py-1">
                <p className="font-bold text-xl lowercase">Rank:</p>
                {coin?.market_cap_rank}
              </p>
              <p className="font-nunito font-semibold flex gap-1 text-lg py-1">
                <p className="font-bold flex gap-3 text-xl lowercase">
                  <p>Current Price:</p>₹
                </p>
                {coin?.market_data.current_price.inr}
              </p>
              <p className="font-nunito font-semibold flex gap-1 text-lg py-1">
                <p className="font-bold flex gap-3 text-xl lowercase">
                  <p>Market Cap:</p>
                  {symbols}
                </p>
                {coin?.market_data.market_cap[currency.toLowerCase()]}M
              </p>

              <p className="font-nunito font-semibold flex gap-1 text-lg py-1">
                <p className="font-bold flex gap-3 text-xl lowercase">
                  <p>Change:</p>
                  {symbols}
                </p>
                {coin?.market_data.price_change_24h_in_currency[
                  currency.toLowerCase()
                ] < 0 ? (
                  <p className="text-red-600 font-bold">
                    {coin?.market_data.price_change_24h_in_currency[
                      currency.toLowerCase()
                    ].toFixed(2)}
                  </p>
                ) : (
                  <p className="text-green-500 font-bold">
                    +{" "}
                    {coin?.market_data.price_change_24h_in_currency[
                      currency.toLowerCase()
                    ].toFixed(2)}
                  </p>
                )}
              </p>

              <p className="font-nunito font-semibold flex gap-1 text-lg py-1">
                <p className="font-bold flex gap-3 text-xl lowercase">
                  <p>volume:</p>
                  {symbols}
                </p>
                {coin?.market_data.total_volume[currency.toLowerCase()]}
              </p>
              <p className="font-nunito font-semibold flex gap-1 text-lg py-1 text-blue-600">
                <p className="font-bold flex gap-3 text-xl text-gray-900 lowercase">
                  <p>LINK:</p>
                </p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={coin?.links.homepage[0]}
                >
                  {coin?.links.homepage[0]}
                </a>
              </p>
              <p className="font-nunito font-semibold flex gap-1 text-lg py-1">
                <p className="font-bold flex gap-3 text-lg lowercase">
                  <p>Last updated time:</p>
                </p>
                {coin?.last_updated}
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 mobile:w-full tablet:w-full">
          <ChartCrypto />

          <div className="flex justify-evenly font-nunito mt-10">
            <button
              onClick={displayRazorPay}
              className="font-bold text-xl w-52 rounded-lg bg-green-300 py-3 border-2 border-gray-600 mobile:rounded-none 
                mobile:w-1/2 mobile:px-0 mobile:border-none hover:bg-green-600 hover:text-white"
            >
              Buy Now
            </button>
            <button
              className="font-bold text-xl w-52 rounded-lg bg-gray-300 border-2 border-gray-600 mobile:rounded-none 
                mobile:w-1/2 py-3 mobile:px-0 mobile:border-none hover:bg-gray-600 hover:text-white"
            >
              ADD to watchlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoDetails;
