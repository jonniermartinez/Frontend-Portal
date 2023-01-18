const API_KEY = "a725161bb3e330a86c837441d1047959"
import axios from "axios";


const getWeaterApiInfo = async (latitude, longitude) => {
    const api = "https://api.openweathermap.org/data/2.5/weather"
    const url = `${api}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}
    `;
    
    const urlLog = {
      "url": api
  }
    await axios
    .post("http://localhost:4000/newLog", urlLog)
    .then((res) => {
        // console.log(res.data)
    })
    .catch((error) => {
        console.error(error);
    })
    const data = await fetch(url);
    return data;
  };

  export default getWeaterApiInfo;