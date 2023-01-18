const API_KEY = "2ff68fb1650e465ea2c2569751c1df96"
import axios from "axios";

const getNewsApiInfo = async () => {
    const api = "https://newsapi.org/v2/top-headlines?country=us&apiKey="
    const url = `${api}${API_KEY}`;
    const data = await fetch(url);

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
    return data;
  };

  export default getNewsApiInfo;