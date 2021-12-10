import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { CryptoState } from "../../context/CryptoContext";
import { HistoricalChart } from "../../Config/Api";
import { chartDays } from "../../Config/ChartData";
import Spinner from "../../Components/Spinner";

import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { CrosshairPlugin } from "chartjs-plugin-crosshair";

Chart.register(CrosshairPlugin);
Chart.register(zoomPlugin);

const ChartCrypto = () => {
  const [coinHistory, setCoinHistory] = useState();
  const [days, setDays] = useState(1);

  const { id } = useParams();

  const { currency } = CryptoState();

  const getHistoryData = async () => {
    try {
      const res = await axios.get(HistoricalChart(id, days, currency));
      setCoinHistory(res.data.prices);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHistoryData();
  }, [days]);

  return (
    <div className="font-nunito">
      <div className="uppercase font-bold text-4xl my-8 mobile:text-3xl mobile:py-5">
        coin chart :
      </div>
      {!coinHistory ? (
        <Spinner />
      ) : (
        <>
          <Line
            data={{
              labels: coinHistory.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: coinHistory.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
              plugins: {
                crosshair: {
                  line: {
                    color: "#F66", // crosshair line color
                    width: 1, // crosshair line width
                  },
                },
                zoom: {
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true,
                    },
                    mode: "xy",
                  },
                },
              },
            }}
          />
          <div className="flex justify-evenly flex-wrap overflow-x-hidden mx-10 mobile:justify-around">
            {chartDays.map((day) => (
              <div key={day.value}>
                <button
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                  className="py-2 w-32 mt-10 font-semibold flex justify-evenly
                  bg-gray-300 text-gray-900 hover:bg-gray-800 hover:text-gray-50 rounded-md mobile:mt-5"
                >
                  {day.label}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChartCrypto;
