import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../../Config/Api";
import { CryptoState } from "../../context/CryptoContext";
import ChartCrypto from "./ChartCrypto";
import NavBar from "../../Components/NavBar";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { createContext } from "react";
import Spinner from "../../Components/Spinner";

//razorpay script
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

export const CartContext = createContext();

//main function
const CryptoDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currency, symbols } = CryptoState();

  //increment and decrement
  const [counter, setCounter] = useState(1);

  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);

  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  //get details of selected coin
  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(SingleCoin(id));
      setCoin(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //payment
  const displayRazorPay = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        return toast.warning("Payment failed!, check your connection.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      const response = await axios.post("/razorpay/payment", {
        amount: coin?.market_data.current_price.inr * 100 * counter,
      });
      const convertRes = await response.data;
      const { order } = convertRes;

      const options = {
        key: __dev__ ? "rzp_test_nvbgBY8uNQpEwZ" : "Production key here",
        name: "TP-Coin",
        description: "Transaction for buying cryptos.",
        image: "https://example.com/your_logo",
        currency: "INR",
        amount: coin?.market_data.current_price.inr * 100 * counter,
        order_id: order.id,

        handler: async function(response) {
          console.log("frontend paymentId", response.razorpay_payment_id);
          console.log("frontend order_id", response.razorpay_order_id);
          console.log("frontend signature", response.razorpay_signature);

          localStorage.setItem("isBuyCoin", "true");

          localStorage.setItem("quantity", counter);

          toast.success("Payment successfully, please Buy a Coin!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });

          window.location.reload(false);
        },

        //remove this seaction while hosting
        prefill: {
          name: "rohit",
          email: "test.rohit@example.com",
          contact: "9898989898",
        },
        theme: {
          color: "#3B3B3B",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      history.push("/login");
      return toast.warning("Login to Make a Payment!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  //buy this coin and saving to db
  const buyCoin = async () => {
    const coins = {
      coinId: coin?.id,
      image: coin?.image.large,
      symbol: coin?.symbol,
      name: coin?.name,
      quantity: localStorage.getItem("quantity"),
    };

    try {
      const res = await axios.post("/buy/coins", coins, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data) {
        localStorage.removeItem("isBuyCoin");

        localStorage.removeItem("quantity");

        history.push("/");
        return toast.success(
          `${coin?.name} buy Successfully, please check portfolio!`,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //add to watchlist
  const addWatchlist = async () => {
    const coinData = {
      coinId: coin?.id,
      image: coin?.image.large,
      symbol: coin?.symbol,
      name: coin?.name,
    };

    try {
      const res = await axios.post("/add/coins/watchlist", coinData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data) {
        history.push("/");
        return toast.success(
          `${coin?.name} added to watchlist, please check watchlist!`,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.log(error);

      history.push("/login");
      return toast.warning(`Login to Add a ${coin?.name} to WatchList!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <NavBar />

      <div
        className="py-32 mobile:py-0 mobile:pt-32 mx-20 laptop:mx-10 tablet:mx-10 mobile:mx-0 
          flex gap-8 tablet:gap-0 mobile:gap-0 mobile:flex-col tablet:flex-col overflow-x-hidden"
      >
        {loading ? (
          <Spinner />
        ) : (
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
        )}

        <div className="w-1/2 mobile:w-full tablet:w-full">
          <ChartCrypto />

          <div className="flex justify-center items-center gap-2 mt-8 pc:hidden laptop:hidden tablet:hidden">
            <button
              onClick={decrementCounter}
              className="bg-red-700 text-white text-4xl font-black rounded-lg shadow-md px-5 pt-1 pb-3"
            >
              -
            </button>

            <input
              value={
                localStorage.getItem("quantity")
                  ? localStorage.getItem("quantity")
                  : counter
              }
              className="border-2 border-gray-600 w-14 h-14 px-5 pt-1 pb-2 font-bold font-nunito rounded-lg"
            />

            <button
              onClick={incrementCounter}
              className="bg-green-700 text-white text-4xl font-black rounded-lg shadow-md px-4 pt-1 pb-3"
            >
              +
            </button>
          </div>

          <div className="flex justify-evenly font-nunito mt-10">
            {localStorage.getItem("isBuyCoin") ? (
              <button
                onClick={buyCoin}
                className="font-bold text-xl w-52 rounded-lg bg-green-400 py-3 border-2 border-gray-900 mobile:rounded-none 
                mobile:w-1/2 mobile:px-0 mobile:border-none hover:bg-green-600 hover:text-white mobile:py-4"
              >
                Buy Now
              </button>
            ) : (
              <button
                onClick={displayRazorPay}
                className="font-bold text-xl w-52 rounded-lg bg-blue-400 py-3 border-2 border-indigo-900 mobile:rounded-none 
                mobile:w-1/2 mobile:px-0 mobile:border-none hover:bg-blue-600 hover:text-white mobile:py-4"
              >
                Make Payment
              </button>
            )}

            <div className="flex justify-center items-center gap-2 mobile:hidden">
              <button
                onClick={decrementCounter}
                className="bg-red-700 text-white text-5xl font-black rounded-lg shadow-md text-center px-5 py-3"
              >
                -
              </button>

              <input
                value={
                  localStorage.getItem("quantity")
                    ? localStorage.getItem("quantity")
                    : counter
                }
                className="border-2 border-gray-600 w-14 h-14 px-5 py-3 font-bold font-nunito rounded-lg"
              />

              <button
                onClick={incrementCounter}
                className="bg-green-700 text-white text-5xl font-black rounded-lg shadow-md text-center px-4 py-3"
              >
                +
              </button>
            </div>

            <button
              onClick={addWatchlist}
              className="font-bold text-xl w-52 rounded-lg bg-gray-300 border-2 border-gray-600 mobile:rounded-none 
                mobile:w-1/2 py-3 mobile:px-0 mobile:border-none hover:bg-gray-600 hover:text-white mobile:py-4"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoDetails;
