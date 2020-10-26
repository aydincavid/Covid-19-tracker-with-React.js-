import axios from "axios";

const url = "https://covid19.mathdro.id/api";
var day;

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    const modifiedData = {
      confirmed: confirmed,
      recovered: recovered,
      deaths: deaths,
      lastUpdate: lastUpdate,
    };

    return modifiedData;
  } catch (error) {}
};

export const fetchDailyData = async (num) => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );

    let reversedData = [];
    reversedData = data.reverse();

    const cloneData = [...data];
    let firstDateArray = cloneData[0].date.toString().split("");
    let firstDate =
      firstDateArray.slice(0, 4).toString() +
      "-" +
      firstDateArray.slice(4, 6).toString() +
      "-" +
      firstDateArray.slice(6, 8).toString();

    const day1 = new Date(firstDate.replace(/,/g, ""));

    let secondDateArray = cloneData[cloneData.length - 1].date
      .toString()
      .split("");
    let secondDate =
      secondDateArray.slice(0, 4).toString() +
      "-" +
      secondDateArray.slice(4, 6).toString() +
      "-" +
      secondDateArray.slice(6, 8).toString();

    const day2 = new Date(secondDate.replace(/,/g, ""));

    day = (day2.getTime() - day1.getTime()) / (1000 * 3600 * 24);

    const modifiedData = reversedData.map((dailyData) => ({
      confirmed: dailyData.positive,
      deaths: dailyData.death,
      date: dailyData.date,
      recovered: dailyData.recovered,
    }));
    var lastData = modifiedData;
    if (num) {
      lastData = modifiedData.slice(
        modifiedData.length - num,
        modifiedData.length
      );
    }

    return lastData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.error(error);
  }
};
export { day };
