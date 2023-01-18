import { useEffect, useState } from "react";
import getWeaterApiInfo from "../helpers/getApiInfo";

export default function TimeState() {
  const [longitude, setlongitude] = useState(Number);
  const [latitude, setlatitude] = useState(Number);
  const [data, setData] = useState({
    temp: "",
    temp_max: "",
    temp_min: "",
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setlatitude(position.coords.longitude);
      setlongitude(position.coords.latitude);
    });
  }

  useEffect(() => {
    getWeaterApiInfo(latitude, longitude)
      .then((res) => res.json())
      .then((dat) => {
        setData((prevSatate) => ({
          ...prevSatate,
          temp: Math.floor(273 - Math.floor(dat.main.temp)),
          temp_max: Math.floor(273 - Math.floor(dat.main.temp_max)),
          temp_min: Math.floor(273 - Math.floor(dat.main.temp_min)),
        }));
      });
  }, [latitude, longitude]);

  return (
    <>
      <h2 className="temperatura-title">
        Estado del tiempo en tu ubicación actual
      </h2>
      <ul className="temperatura-card">
        <li>Actual {data.temp} °C</li>
        <li>Maxima {data.temp_max} °C</li>
        <li>Minima {data.temp_min} °C</li>
      </ul>
    </>
  );
}
