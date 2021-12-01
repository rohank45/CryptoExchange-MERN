import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Spinner from "./Spinner";

const queryClient = new QueryClient();

export default function DemoReactQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, refetch } = useQuery("fetchData", () =>
    fetch("https://fakestoreapi.com/products/").then((res) => res.json())
  );

  if (isLoading)
    return (
      <h1>
        <Spinner />
      </h1>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.map((curElem, id) => {
        const { title, description, category, image, price } = curElem;

        return (
          <>
            <div className="h-4/5 w-96 my-12 relative left-40 bg-gray-800 rounded-3xl overflow-y-scroll removeScrollBar">
              <div className="p-10 flex">
                <div className=" w-full mb-8" key={id}>
                  <div
                    className="h-48 lg:h-auto lg:w-48 flex-none bg-cover 
                      rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                  >
                    <img src={image} alt="React Logo" />
                  </div>

                  <div
                    className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 
                    bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
                  >
                    <div className="mb-8">
                      <p className="text-gray-700 text-base font-semibold">
                        {title}
                      </p>
                      <div className="text-gray-900 font-bold text-xl mb-2">
                        {category}
                      </div>
                      <p className="text-gray-700 text-base">{description}</p>
                      <p className="text-gray-700 text-base">{price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
