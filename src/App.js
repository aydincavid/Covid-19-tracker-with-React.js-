import React, { Component } from "react";

import { Cards, Chart, CountryPicker, DayPicker } from "./components";
import styles from "./App.module.css";
import { fetchData, fetchDailyData } from "./api/index";
import coronaImage from "./images/corona.png";
import { day } from "./api/index";

export default class App extends Component {
  state = {
    data: {},
    dailyData: {},
    country: "",
    dayNum: 200,
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedDailydata = await fetchDailyData();
    this.setState({ data: fetchedData });
    this.setState({ dailyData: fetchedDailydata });
    this.setState({ dayNum: day });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  handleNumberChange = async (number) => {
    const fetchedDailydata = await fetchDailyData(number);
    this.setState({ dailyData: fetchedDailydata });
    this.setState({ dayNum: number });
  };
  render() {
    const { data, country, dailyData, dayNum } = this.state;

    return (
      <div className={styles.container}>
        <img
          className={styles.image}
          src={coronaImage}
          alt="Corona Header"
        ></img>
        <Cards data={data}></Cards>

        <CountryPicker
          handleCountryChange={this.handleCountryChange}
        ></CountryPicker>
        <DayPicker
          country={country}
          handleNumberChange={this.handleNumberChange}
          dayNum={dayNum}
        ></DayPicker>
        <Chart data={data} country={country} dailyData={dailyData}></Chart>
      </div>
    );
  }
}
