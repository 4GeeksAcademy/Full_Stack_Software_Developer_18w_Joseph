import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contrasena: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await resp.json();

    if (resp.ok) {
      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/private");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" className="form-control mb-2"
          onChange={(e)=>setForm({...form,nombre:e.target.value})} />

        <input placeholder="Apellido" className="form-control mb-2"
          onChange={(e)=>setForm({...form,apellido:e.target.value})} />

        <input placeholder="Email" className="form-control mb-2"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input placeholder="Teléfono" className="form-control mb-2"
          onChange={(e)=>setForm({...form,telefono:e.target.value})} />

        <input type="password" placeholder="Contraseña" className="form-control mb-2"
          onChange={(e)=>setForm({...form,contrasena:e.target.value})} />

        <button className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
};

export default Signup;