import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import NavBar from "../Components/NavBar";
import { BsTrash } from "react-icons/bs";
import ShoppingCart from "../Images/ShoppingCart.png";
import Spinner from "../Components/Spinner";

const Watchlist = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState([]);

  const getPortfolioData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/watchlist");
      setCoin(res.data.userProfile.watchlists);
      setLoading(false);
    } catch (error) {
      history.push("/login");
      return toast.warning("Login to access a watchlist!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  const emptyWatchlist = async () => {
    try {
      await axios.get("/empty/watchlist");
      history.push("/");
      toast.success("Watchlist is empty now!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center pt-32">
        <div className="font-nunito w-3/5 shadow-xl rounded-lg border-2 py-5 px-8 mobile:px-0 laptop:w-4/5 tablet:w-full mobile:w-full mobile:rounded-none">
          <div className="flex items-center justify-around p-5 mobile:px-0 mobile:py-2">
            <div className="p-10 mobile:hidden tablet:hidden">
              <img src={ShoppingCart} alt="login svg" />
            </div>
            <div className="flex flex-col mx-10 w-1/2 mobile:w-full mobile:px-2 mobile:mx-2 tablet:w-full tablet:px-0 tablet:mx-2">
              <div className="-my-2 overflow-x-auto sm:-mx-0 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full mobile:px-0 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-200">
                        <tr>
                          <th
                            scope="col"
                            className="mobile:text-sm mobile:px-1 px-6 py-5 text-left text-xl font-bold text-gray-700 uppercase tracking-wider"
                          >
                            WatchList
                          </th>
                          <th
                            scope="col"
                            className="mobile:text-sm mobile:px-0 px-6 py-3 text-left text-xl font-bold text-gray-700 uppercase tracking-wider"
                          >
                            <button
                              onClick={emptyWatchlist}
                              className="bg-red-700 text-white px-2 py-1 rounded-lg shadow-md"
                            >
                              RemoveAll
                            </button>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                          <Spinner />
                        ) : (
                          coin.map((curElem, id) => {
                            const {
                              watchlist_image,
                              watchlist_symbol,
                              watchlist_name,
                            } = curElem;
                            return (
                              <>
                                <tr key={id}>
                                  <td className="flex justify-between items-center px-6 py-5 whitespace-nowrap mobile:px-10 tablet:px-10">
                                    <div
                                      className="flex items-center cursor-pointer"
                                      onClick={() =>
                                        history.push(
                                          `/coins/${curElem.watchlist_coinId}`
                                        )
                                      }
                                    >
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                          className="h-10 w-10 rounded-full"
                                          src={watchlist_image}
                                          alt="crypto icon"
                                        />
                                      </div>
                                      <div className="ml-4 flex gap-4 mobile:flex-col mobile:gap-2">
                                        <div className="mobile:text-sm text-lg font-bold text-gray-900 uppercase">
                                          {watchlist_symbol}
                                        </div>
                                        <div className="mobile:text-sm text-lg text-gray-500">
                                          {watchlist_name}
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      onClick={async () => {
                                        const watchlists = {
                                          watchlist_coinId:
                                            curElem.watchlist_coinId,
                                          watchlist_image: watchlist_image,
                                          watchlist_name: watchlist_name,
                                          watchlist_symbol: watchlist_symbol,
                                        };

                                        try {
                                          const res = await axios.post(
                                            "/remove/coins/watchlist",
                                            watchlists,
                                            {
                                              headers: {
                                                "Content-Type":
                                                  "application/json",
                                              },
                                            }
                                          );

                                          const data = res.data;
                                          if (data) {
                                            history.push("/");
                                            return toast.success(
                                              `${watchlist_name} removed from watchlist!`,
                                              {
                                                position:
                                                  toast.POSITION.TOP_CENTER,
                                                autoClose: 3000,
                                              }
                                            );
                                          }
                                        } catch (error) {
                                          console.log(error.message);
                                        }
                                      }}
                                    >
                                      <button className="text-red-700 text-3xl font-bold rounded-lg p-2 mobile:pl-2 mobile:px-0">
                                        <BsTrash />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
