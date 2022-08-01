import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ dataChart: { confirmed, recovered, deaths }, country }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fethcAPI = async () => {
      setData(await fetchDailyData());
    };

    fethcAPI();
  }, []);

  const lineChart = data.length ? (
    <Line
      data={{
        labels: data.map(({ date }) => date),
        datasets: [
          {
            data: data.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: data.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: data.map(({ recovered }) => recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
