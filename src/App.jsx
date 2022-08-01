import { Cards, Chart, CountryPicker } from "./components";
import { useEffect, useState } from "react";
import { fetchData } from "./api";

import styles from "./App.module.css";
import covidImage from "./images/covid19.png";

function App() {
  const [data, setData] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };
    fetchAPI();
  }, []);

  const countryHandler = async (country) => {
    setCountry(await fetchData(country));
    setData(await fetchData(country));
  };

  return (
    <div className={styles.container}>
      <img src={covidImage} alt="Covid-19" className={styles.image} />
      <Cards data={data} />
      <CountryPicker countryHandler={countryHandler} />
      <Chart dataChart={data} country={country} />
    </div>
  );
}

export default App;
