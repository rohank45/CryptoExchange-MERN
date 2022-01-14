import React, { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";

const News2 = () => {
  const [news, setNews] = useState([]);
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
        `https://newsapi.org/v2/everything?q=crypto&from=2022-01-${day}&sortBy=publishedAt&apiKey=4c9a117cba154963a69fc2aa982e4ce1`,
        setHeader
      );

      const data = await res.json();
      setNews(data.articles);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="pt-24 flex flex-row flex-wrap justify-around mx-10 mobile:mx-2">
        {news ? (
          news.map((curElm, id) => {
            const { title, urlToImage, description, url } = curElm;
            return (
              <div key={id}>
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
    </>
  );
};

export default News2;
