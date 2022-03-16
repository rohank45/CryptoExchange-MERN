import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";

const GlobalStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/stats",
        params: { referenceCurrencyUuid: "yhjMzLPhuIDl" },
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "3bf8ad2345msh9f75760d2fe9a1dp1ffbb3jsnc1cec33b9615",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setStats(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <p className="pt-24 pb-10 text-center text-3xl uppercase font-nunito font-semibold mobile:hidden tablet:text-3xl">
        Global Stats
      </p>

      {loading ? (
        <Spinner />
      ) : (
        <div
          className="shadow-md py-5 rounded-xl bg-gray-50 flex justify-around items-center flex-wrap mx-40 font-semibold laptop:mx-5 tablet:mx-10 mobile:hidden"
          key={stats.id}
        >
          <p className="flex flex-col text-2xl capitalize text-gray-700">
            Total CryptoCurrencies
            <span className="text-lg py-5 text-indigo-800 font-semibold">
              {stats.totalCoins}
            </span>
          </p>
          <p className="flex flex-col text-2xl capitalize text-gray-700">
            Total Exchanges
            <span className="text-lg py-5 text-indigo-800 font-semibold">
              {stats.totalExchanges}
            </span>
          </p>
          <p className="flex flex-col text-2xl capitalize text-gray-700">
            Total Market Cap
            <span className="text-lg py-5 text-indigo-800 font-semibold">
              {stats.totalMarketCap} M
            </span>
          </p>
          <p className="flex flex-col text-2xl capitalize text-gray-700">
            Total 24h Volume
            <span className="text-lg py-5 text-indigo-800 font-semibold">
              {stats.total24hVolume} M
            </span>
          </p>
          <p className="flex flex-col text-2xl capitalize text-gray-700">
            Total Markets
            <span className="text-lg py-5 text-indigo-800 font-semibold">
              {stats?.totalMarkets}
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default GlobalStats;
