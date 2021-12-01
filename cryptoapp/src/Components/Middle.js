import React from "react";
import Analyticsteam from "../Images/Analyticsteam.png";
import Winners from "../Images/Winners.png";

const Middle = () => {
  return (
    <div className="flex justify-center mt-20">
      <div className="font-nunito w-3/5 shadow-xl rounded-lg border-2 border-gray-200 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
        <div className="flex items-center gap-10">
          <div className="w-full tablet:w-1/2 mobile:hidden">
            <img src={Analyticsteam} alt="team" />
          </div>

          <div className="flex flex-col gap-4 tablet:w-4/5">
            <h1 className="text-3xl font-bold capitalize mobile:text-2xl">
              Why trade in Crypto ?
            </h1>
            <p>
              In general, the cryptocurrency market is considered illiquid
              because the transactions are dispersed across multiple exchanges,
              which means that comparatively small trades can have huge impact
              on market prices. This means that your trades are more likely to
              be executed quickly and at a lower cost.
            </p>
            <p>
              Cryptocurrencies are what stocks were centuries ago; they are the
              new-age asset class growing at a pace never seen before. Having
              successfully surpassed almost all trading instruments in terms of
              returns, they are on their way to becoming the go-to asset class,
              with around 11 million Indians trading in Cryptocurrencies. Start
              your trading journey now!
            </p>

            <button className="text-center text-xl font-semibold bg-gray-900 text-white w-40 py-2 rounded-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Cryptocurrency"
              >
                Learn more...
              </a>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-10 pb-2 pt-14">
          <div className="flex flex-col gap-4 tablet:w-4/5">
            <h1 className="text-3xl font-bold capitalize mobile:text-2xl">
              Why to use TP-Coin ?
            </h1>
            <p>
              You can start trading in cryptocurrencies as low as ₹100 with
              TP-Coin, Buy, sell and trade 99+ cryptocurrencies at the best
              market rates with zero fees in one click. We provide descriptions,
              real-time price and price changes with a history table, last
              one-year chart, news, and more about a specific cryptocurrency.
            </p>

            <p>
              Everyone has security issues, but we're providing end-to-end
              encryption for your personal data and your transaction details.
              with TP-Coin you can Withdraw anytime you want instantly. We
              enable you to trade in cryptocurrencies at the best price in
              India.
            </p>

            <p>
              If you want to delete your account permanently then YES you can
              delete it in one click without interruption.
            </p>
          </div>

          <div className="w-full tablet:w-1/2 mobile:hidden">
            <img src={Winners} alt="team" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
