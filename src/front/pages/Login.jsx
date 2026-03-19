import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, contrasena })
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
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    onChange={(e) => setContrasena(e.target.value)}
                />


                <button className="btn btn-primary w-100 mb-3">
                    Entrar
                </button>


                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-outline-primary px-4"
                        onClick={() => navigate("/signup")}
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;