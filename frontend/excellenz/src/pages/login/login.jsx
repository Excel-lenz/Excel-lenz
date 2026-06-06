import "../../styles/pages/login/login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN } from "../../api/auth"

export default function Login({  isLogin, setIsLogin }) {
    const navigate = useNavigate();

    return (
        <div className="login-container">
        <h2>Login</h2>
        <input type="text" placeholder="Benutzername" />
        <input type="password" placeholder="Passwort" />
        <button onClick={handleLogin}>Einloggen</button>
        <p onClick={() => navigate("/register")} className="switch-text">
            Noch kein Account? Registrieren
        </p>
        </div>
    );
}

const handleLogin = async () => {
    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    const response = await fetch(LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });


    const data = await response.json();

    if (!response.ok) {
        // Popup printing "There was an error. Please try again later. If the error stays, please contact support."
        console.log("Error:", data);
        return;
    }

    console.log(data)
    
}