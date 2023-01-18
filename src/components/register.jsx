import { Link, useLocation } from "wouter";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [inputs, setInputs] = useState({
    correo: "",
    contraseña: "",
    nombre: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const [location, navigate] = useLocation();

  const { nombre, correo, contraseña } = inputs;

  const HandleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSumit = async (event) => {
    event.preventDefault();
    if (nombre !== "" && correo !== "" && contraseña !== "") {
      const Usuario = {
        nombre,
        correo,
        contraseña,
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/register", Usuario)
        .then((response) => {
          const { data } = response;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.usuario.token);
            navigate("/");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="inicio">
        <h3>Bienvenido a la pagina</h3>
        <h2>De Registro</h2>
        <form className="form" onSubmit={(event) => handleSumit(event)}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            className="input"
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            placeholder="Nombre ..."
            autoComplete="off"
            onChange={(event) => HandleChange(event)}
          />
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
            {loading ? "Cargando..." : "Registrarmer"}
          </button>
        </form>
        <p className="text">
          ¿Ya tienes cuenta? <Link href="/">Inicia Sesión!</Link>
        </p>
        {mensaje && <p className="text">{mensaje}</p>}
      </div>
    </>
  );
}
