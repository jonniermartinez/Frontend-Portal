import { Link, useLocation } from "wouter";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [inputs, setInputs] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const [location, navigate] = useLocation();

  const { correo, contraseña } = inputs;

  const HandleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSumit = async (event) => {
    event.preventDefault();
    if (correo !== "" && contraseña !== "") {
      const Usuario = {
        correo,
        contraseña,
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/login", Usuario)
        .then((response) => {
          const { data } = response;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.usuario.token);
            navigate("/inicio");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Correo u Contraseña inconrecta");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setInputs({ correo: "", contraseña: "" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="inicio">
        <h3>Bienvenido a la pagina</h3>
        <h2>De Inicio de Sesión!</h2>
        <form className="form" onSubmit={(event) => handleSumit(event)}>
          <label htmlFor="correo">Correo:</label>
          <input
            className="input"
            type="email"
            name="correo"
            id="correo"
            value={correo}
            placeholder="Correo ..."
            autoComplete="off"
            onChange={(event) => HandleChange(event)}
          />
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            className="input"
            type="password"
            name="contraseña"
            id="contraseña"
            value={contraseña}
            placeholder="Contraseña ..."
            autoComplete="off"
            onChange={(event) => HandleChange(event)}
          />
          <button className="buttom">
            {loading ? "Cargando..." : "Iniciar Sección"}
          </button>
        </form>
        <p className="text">
          ¿Aún no teienes cuenta? <Link href="/register">Registrate</Link>
        </p>
        {mensaje && <p className="text">{mensaje}</p>}
      </div>
    </>
  );
}
