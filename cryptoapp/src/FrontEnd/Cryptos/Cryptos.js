import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CoinList } from "../../Config/Api";
import { CryptoState } from "../../context/CryptoContext";
import Spinner from "../../Components/Spinner";
import { RiSearch2Line } from "react-icons/ri";
import NavBar from "../../Components/NavBar";
import { toast } from "react-toastify";

const Cryptos = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { currency, symbols } = CryptoState();
  const history = useHistory();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(CoinList(currency));
      setCoins(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [currency]);

  useEffect(() => {
    toast.info("Tap to see Deatils!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }, []);

  return (
    <>
      <NavBar />

      <div className="font-nunito py-28 mx-40 laptop:mx-10 tablet:mx-8 mobile:mx-2">
        <div className="flex justify-evenly tablet:flex-col mobile:flex-col tablet:items-center mobile:items-center">
          <h1 className="font-bold font-nunito text-4xl uppercase mobile:text-2xl">
            All Crypto Currencies
          </h1>
          <div
            className="font-semibold text-xl bg-gray-200 rounded-md outline-none border-b-2 border-gray-500
                flex gap-5 items-center py-2 mobile:mt-5 tablet:mt-5"
          >
            <div>
              <button className="text-2xl pl-4 flex items-center">
                <RiSearch2Line />
              </button>
            </div>
            <div>
              <input
                placeholder="search for coins..."
                className="outline-none bg-gray-200"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 w-full">
          <div className="-my-2 overflow-x-auto sm:-mx-0 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full mobile:px-0 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="mobile:text-sm mobile:px-1 px-6 py-5 text-left text-xl font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="mobile:text-sm mobile:px-0 px-6 py-3 text-left text-xl font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="mobile:text-sm mobile:px-0 px-6 py-3 text-left text-xl font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Change
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xl font-bold text-gray-700 uppercase tracking-wider mobile:hidden tablet:hidden"
                      >
                        24h Volume
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xl font-bold text-gray-700 uppercase tracking-wider laptop:hidden mobile:hidden tablet:hidden"
                      >
                        Market Cap
                      </th>
                      <th
                        scope="col"
                        className="relative px-6 py-3 tablet:hidden mobile:hidden"
                      >
                        <span className="sr-only">Buy</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {coins
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return val;
                        } else if (
                          val.symbol
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((curElem, id) => {
                        const {
                          image,
                          symbol,
                          name,
                          price_change_percentage_24h,
                          current_price,
                          total_volume,
                          market_cap,
                        } = curElem;
                        return (
                          <>
                            {loading ? (
                              <Spinner />
                            ) : (
                              <tr key={id}>
                                <td className="px-6 py-5 whitespace-nowrap mobile:px-0">
                                  <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() =>
                                      history.push(`/coins/${curElem.id}`)
                                    }
                                  >
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img
                                        className="h-10 w-10 rounded-full"
                                        src={image}
                                        alt="crypto icon"
                                      />
                                    </div>
                                    <div className="ml-4 flex gap-4 mobile:flex-col mobile:gap-2">
                                      <div className="mobile:text-sm text-lg font-bold text-gray-900 uppercase">
                                        {symbol}
                                      </div>
                                      <div className="mobile:text-sm text-lg text-gray-500">
                                        {name}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap mobile:px-0">
                                  <div className="mobile:text-sm text-lg text-gray-700">
                                    <span className="font-bold mx-1">
                                      {symbols}
                                    </span>
                                    {current_price.toFixed(2)}
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap mobile:pl-2 mobile:px-0">
                                  <span className="mobile:text-sm mobile:px-0 px-2 inline-flex text-lg leading-5 font-semibold">
                                    {price_change_percentage_24h < 0 ? (
                                      <p className="text-red-600 font-bold">
                                        {price_change_percentage_24h.toFixed(2)}
                                        %
                                      </p>
                                    ) : (
                                      <p className="text-green-500 font-bold">
                                        +{" "}
                                        {price_change_percentage_24h.toFixed(2)}
                                        %
                                      </p>
                                    )}
                                  </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-600 mobile:hidden tablet:hidden">
                                  {total_volume}
                                  <span className="font-bold mx-1">M</span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-600 laptop:hidden mobile:hidden tablet:hidden">
                                  <span className="font-bold mx-1 text-black">
                                    {symbols}
                                  </span>
                                  {market_cap}
                                  <span className="font-bold mx-1">M</span>
                                </td>

                                <td className="pr-20 py-4 whitespace-nowrap text-right font-medium tablet:hidden mobile:hidden">
                                  <button
                                    onClick={() =>
                                      history.push(`/coins/${curElem.id}`)
                                    }
                                    className="text-indigo-600 hover:underline"
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cryptos;
