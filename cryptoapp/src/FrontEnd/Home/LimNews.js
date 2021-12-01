import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner";

const LimNews = () => {
  const [limitedNews, setLimitedNews] = useState([]);
  const [date] = useState(new Date());

  const getData = async () => {
    try {
      const setHeader = {
        headers: {
          Accept: "application/json",
        },
      };
      let day = date.getDate();
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=cryptocoins&from=2021-10-${day}&sortBy=publishedAt&apiKey=4c9a117cba154963a69fc2aa982e4ce1`,
        setHeader
      );

      const data = await res.json();
      console.log(data);
      setLimitedNews(data.articles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <p className="text-center text-5xl font-bold pt-24 uppercase font-nunito">
        News
      </p>

      <div className="flex flex-row flex-wrap justify-around mx-48 mobile:mx-2">
        {limitedNews ? (
          limitedNews.slice(0, 6).map((curElm, id) => {
            const { title, urlToImage, description, url } = curElm;
            return (
              <div key={id} className="">
                <div
                  className="flex flex-col my-10 overflow-x-hidden w-96 h-100 p-2 border border-gray-400 
                    rounded-lg shadow-xl bg-gray-100 outline-none scrollbar-hide"
                >
                  <img
                    src={urlToImage}
                    alt="imag of news"
                    className="w-full h-1/2"
                  />
                  <div className="h-1/2 w-full flex flex-col gap-5 font-nunito">
                    <p className="text-2xl font-semibold">{title}</p>
                    <p className="text-lg font-light">{description}</p>
                    <p className="text-sm text-blue-700 cursor-pointer">
                      <a target="_blank" rel="noopener noreferrer" href={url}>
                        {url}
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
      </div>

      <p className="text-center text-gray-500 font-light pt-5 pb-16 font-nunito">
        <Link to="/news" className="cursor-pointer">
          view more News
        </Link>
      </p>
    </>
  );
};

export default LimNews;
