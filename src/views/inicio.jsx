import { useState, useEffect } from "react";
import axios from "axios";
import TimeState from "../components/TimeState";
import News from "../components/News";

export default function Inicio() {
  const [name, setName] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:4000/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => setName(data.nombre))
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <div className="">
      <div className="header">
        <p className="header--text">{`Bienvenido`}</p>
      </div>
      <div className="hero">
        <TimeState></TimeState>
        <News></News>
      </div>
    </div>
  );
}
