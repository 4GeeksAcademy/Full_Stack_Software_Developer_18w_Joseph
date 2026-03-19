import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Zona Privada </h2>

      <button className="btn btn-danger" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Private;