import { useState } from "react";
import "../../styles/pages/login/register.css";
import { useNavigate, useLocation } from "react-router-dom";
import { REGISTER } from "../../api/auth"

export default function Register({ isLogin, setIsLogin }) {
    const navigate = useNavigate();

    return (
        <div className="register-container">
        <h2>Registrieren</h2>
        <div className="inputs">
            <input type="text" placeholder="Benutzername" />
            <input type="email" placeholder="E-Mail" />
            <input type="password" placeholder="Passwort" />
        </div>
        <button onClick={handleRegister}>Account erstellen</button>
        <p onClick={() => navigate("/login")} className="switch-text">
            Bereits einen Account? Login
        </p>
        </div>
    );
}

const handleRegister = async () => {
    const username = document.querySelector("input[type='text']").value;
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    const response = await fetch(REGISTER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Popup printing "There was an error. Please try again later. If the error stays, please contact support."
        console.log("Error:", data);
        return;
    }

    if (data.success === false) {
        console.log("Validation errors:", data.errors);

        Object.values(data.errors).forEach((element) => {
            console.log(element.message);
            
           
        });

        return;
    }

    console.log("Registrierung erfolgreich");
    // User successfully registert
    // redirect either to the dashboard or the company setup --> or mail verification

    
};