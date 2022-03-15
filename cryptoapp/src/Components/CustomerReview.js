import React from "react";
import imgas from "../Images/user.jpg";

const CustomerReview = () => {
  return (
    <>
      <div className="my-20 font-nunito select-none">
        <p className="font-semibold text-center text-2xl pb-5 mobile:text-xl">
          Here’s what our customer's think :
        </p>
        <div className="min-w-full flex items-center gap-10 py-10 whitespace-nowrap scrollbar-hide animated-scroll">
          <div className="p-2 h-60 min-w-1/3 laptop:min-w-2/5 tablet:min-w-full mobile:min-w-full flex items-center bg-gray-200 rounded-lg shadow-xl border border-gray-300">
            <img
              className="h-40 w-40 rounded-full"
              src={imgas}
              alt="user profilele"
            />
            <div className="my-4 mx-2 flex flex-col whitespace-normal">
              <h1 className="text-xl font-bold">Rahul Shinde.</h1>
              <p className="text-gray-500 font-medium">Mumbai, India.</p>

              <p className="font-semibold text-sm">
                In this busy world, The instant deposits and withdrawals have
                made TP-Coin my go-to crypto trading platform.
              </p>
            </div>
          </div>

          <div className="p-2 h-60 min-w-1/3 laptop:min-w-2/5 tablet:min-w-full mobile:min-w-full flex items-center bg-gray-200 rounded-lg shadow-xl border border-gray-300">
            <img
              className="h-40 w-40 rounded-full"
              src={imgas}
              alt="user profile"
            />
            <div className="my-4 mx-2 flex flex-col whitespace-normal">
              <h1 className="text-xl font-bold">Rashbhari Taneja.</h1>
              <p className="text-gray-500 font-medium">Delhi, India.</p>

              <p className="font-semibold text-sm">
                Being an ardent stock trader, I made my way into
                cryptocurrencies through TP-Coin the live charts and information
                have helped me make informed choices.
              </p>
            </div>
          </div>

          <div className="p-2 h-60 min-w-1/3 laptop:min-w-2/5 tablet:min-w-full mobile:min-w-full flex items-center bg-gray-200 rounded-lg shadow-xl border border-gray-300">
            <img
              className="h-40 w-40 rounded-full"
              src={imgas}
              alt="user profile"
            />
            <div className="my-4 mx-2 flex flex-col whitespace-normal">
              <h1 className="text-xl font-bold">Sushmita Gada.</h1>
              <p className="text-gray-500 font-medium">Gujrat, India.</p>

              <p className="font-semibold text-sm">
                I have been reading docs for some time now and have found
                TP-Coin to be the simplest way to trade in cryptocurrencies.
              </p>
            </div>
          </div>

          <div className="p-2 h-60 min-w-1/3 laptop:min-w-2/5 tablet:min-w-full mobile:min-w-full flex items-center bg-gray-200 rounded-lg shadow-xl border border-gray-200">
            <img
              className="h-40 w-40 rounded-full"
              src={imgas}
              alt="user profile"
            />
            <div className="my-4 mx-2 flex flex-col whitespace-normal">
              <h1 className="text-xl font-bold">Vijay Kumar.</h1>
              <p className="text-gray-500 font-medium">UP, India.</p>

              <p className="font-semibold text-sm">
                I like how the interface is so user friendly; it handheld me at
                every step of making my first crypto trade. Well done tp-coin
                team.
              </p>
            </div>
          </div>

          <div className="p-2 h-60 min-w-1/3 laptop:min-w-2/5 tablet:min-w-full mobile:min-w-full flex items-center bg-gray-200 rounded-lg shadow-xl border border-gray-200">
            <img
              className="h-40 w-40 rounded-full"
              src={imgas}
              alt="user profile"
            />
            <div className="my-4 mx-2 flex flex-col whitespace-normal">
              <h1 className="text-xl font-bold">Raj Verma.</h1>
              <p className="text-gray-500 font-medium">Hyderabad, India.</p>

              <p className="font-semibold text-sm">
                The very first website where I was really impressed just because
                of their security and privacy settings. They don't hide anything
                and they are providing every option which is forcing me to
                believe that they are really working a lot on security.
              </p>
            </div>
          </div>

          <div className="p-2 h-60 min-w-1/3 laptop:min-w-2/5 tablet:min-w-full mobile:min-w-full flex items-center bg-gray-200 rounded-lg shadow-xl border border-gray-200">
            <img
              className="h-40 w-40 rounded-full"
              src={imgas}
              alt="user profile"
            />
            <div className="my-4 mx-2 flex flex-col whitespace-normal">
              <h1 className="text-xl font-bold">Tanamay Lahkar.</h1>
              <p className="text-gray-500 font-medium">Nagaland, India.</p>

              <p className="font-semibold text-sm">
                I don't know much about cryptocurrencies, trading, and their
                analysis but TP-coin made this easier by providing news, charts,
                tables, docs, easy buy-sell processes, and much more things.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerReview;
