import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CoinList } from "../../Config/Api";
import { CryptoState } from "../../context/CryptoContext";
import Spinner from "../../Components/Spinner";

const LimCryptos = () => {
  const [coins, setCoins] = useState([]);
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

  return (
    <div className="font-nunito mx-40 laptop:mx-10 tablet:mx-8 mobile:mx-2">
      <p className="text-center text-5xl font-bold pt-24 uppercase font-nunito mobile:text-3xl">
        Crypto Currencies
      </p>

      <div className="flex flex-col my-8 w-full">
        <div className="-my-2 overflow-x-auto">
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
                      className="px-6 py-3 text-left text-xl font-bold text-gray-700 uppercase tracking-wider mobile:hidden tablet:hidden"
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
                  {coins.slice(0, 5).map((curElem, id) => {
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
                            <td
                              className="px-6 py-5 whitespace-nowrap mobile:px-0"
                              onClick={() =>
                                history.push(`/coins/${curElem.id}`)
                              }
                            >
                              <div className="flex items-center cursor-pointer">
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
                                    {price_change_percentage_24h.toFixed(2)}%
                                  </p>
                                ) : (
                                  <p className="text-green-500 font-bold">
                                    + {price_change_percentage_24h.toFixed(2)}%
                                  </p>
                                )}
                              </span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-600 mobile:hidden tablet:hidden">
                              {total_volume}
                              <span className="font-bold mx-1">M</span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-600 mobile:hidden tablet:hidden">
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

      <p className="text-center text-gray-500 font-light py-2 font-nunito">
        <Link to="/coins" className="cursor-pointer">
          view more Crypto Currencies
        </Link>
      </p>
    </div>
  );
};

export default LimCryptos;
