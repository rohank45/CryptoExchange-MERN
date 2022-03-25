import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import NavBar from "../Components/NavBar";
import portfolio from "../Images/portfolio.png";
import Spinner from "../Components/Spinner";
// import empty_cart from "../Images/undraw_empty_cart.png";

const Portfolio = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showInputQTY, setShowInputQTY] = useState(false);
  const [coin, setCoin] = useState([]);
  const [QTY, setQTY] = useState(1);
  const [portfolioCoinArr, setPortfolioCoinArr] = useState([]);

  let newPortfolioCoinArr = [];
  const getPortfolioData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/portfolio");
      setCoin(res.data.userProfile.myCoins);
      setLoading(false);

      if (res) {
        for (
          let index = 0;
          index < res.data.userProfile.myCoins.length;
          index++
        ) {
          newPortfolioCoinArr.push({
            name: res.data.userProfile.myCoins[index]?.name,
            quantity: res.data.userProfile.myCoins[index]?.quantity,
          });
        }
        setPortfolioCoinArr(newPortfolioCoinArr);
      }
    } catch (error) {
      history.push("/login");
      return toast.warning("Login to access a portfolio!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center pt-32">
        <div className="font-nunito w-3/5 shadow-xl rounded-lg border-2 py-5 px-8 mobile:px-0 laptop:w-4/5 tablet:w-full mobile:w-full mobile:rounded-none">
          <div className="flex items-center justify-around p-5 mobile:px-0 mobile:py-2">
            <div className="mobile:hidden tablet:hidden">
              <img src={portfolio} alt="login svg" />
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
                            className="mobile:text-sm px-6 py-5 text-left text-xl font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Portfolio
                          </th>
                          <th
                            scope="col"
                            className="mobile:text-sm mobile:px-0 px-6 py-3 text-left text-xl font-bold text-gray-700 uppercase tracking-wider"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                          <Spinner />
                        ) : (
                          coin?.map((curElem, id) => {
                            const { image, symbol, name, quantity } = curElem;

                            return (
                              <>
                                <tr key={id}>
                                  {quantity === 0 ||
                                  quantity === null ? null : (
                                    <td className="flex justify-between items-center px-6 py-5 whitespace-nowrap mobile:px-2 tablet:px-2">
                                      <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                          history.push(
                                            `/coins/${curElem.coinId}`
                                          )
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

                                      <div className="flex justify-evenly items-center">
                                        <div className="mobile:text-sm text-lg font-bold text-gray-900 uppercase px-10">
                                          {quantity}
                                        </div>

                                        <div className="flex flex-col w-1/2">
                                          <button
                                            className="py-1 whitespace-nowrap mobile:pl-2 text-lg bg-red-700 text-white font-semibold font-nunito mobile:text-md mobile:px-2 px-4 rounded-md"
                                            onClick={async () => {
                                              const portfolioRes =
                                                portfolioCoinArr.find(
                                                  (e) =>
                                                    e.name === curElem?.name
                                                );

                                              const coins = {
                                                coinId: curElem?.id,
                                                image: curElem?.image.large,
                                                symbol: curElem?.symbol,
                                                name: curElem?.name,
                                                quantity:
                                                  QTY <= 0 ||
                                                  QTY > portfolioRes?.quantity
                                                    ? toast.warning(
                                                        "Invalid Quantity",
                                                        {
                                                          position:
                                                            toast.POSITION
                                                              .TOP_CENTER,
                                                          autoClose: 2000,
                                                        }
                                                      )
                                                    : portfolioRes?.quantity -
                                                      QTY,
                                                paymentToken: null,
                                              };

                                              try {
                                                // if (QTY === quantity) {
                                                //   await axios.post(
                                                //     "/remove/coins",
                                                //     name,
                                                //     {
                                                //       headers: {
                                                //         "Content-Type":
                                                //           "application/json",
                                                //       },
                                                //     }
                                                //   );
                                                // } else {
                                                const res = await axios.post(
                                                  "/sell/coins",
                                                  { coins: coins },
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
                                                  toast.success(
                                                    "Coin selled, refund will get in 3 working days!",
                                                    {
                                                      position:
                                                        toast.POSITION
                                                          .TOP_CENTER,
                                                      autoClose: 3000,
                                                    }
                                                  );
                                                }
                                                // }
                                              } catch (error) {
                                                console.log(error.message);
                                              }
                                            }}
                                          >
                                            sell coin
                                          </button>

                                          <input
                                            type="number"
                                            minLength="1"
                                            maxLength="3"
                                            value={QTY}
                                            onChange={(e) =>
                                              setQTY(e.target.value)
                                            }
                                            className="text-md block px-2 py-1 rounded-lg w-full border-2 border-gray-300 focus:bg-white focus:border-gray-600 focus:outline-none my-4"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  )}
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

export default Portfolio;
