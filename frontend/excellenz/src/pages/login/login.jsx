import { useState } from "react";
import "../../styles/pages/login/login.css";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../api/auth";
import { WarningPopup, SuccessPopup } from "../../components/popup";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [warningPopup, setWarningPopup] = useState(null);
    const [successPopup, setSuccessPopup] = useState(null);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setWarningPopup({
                id: Date.now(),
                text: "Bitte alle Felder ausfüllen!",
            });
            return;
        }

        try {
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

            let data = {};

            try {
                data = await response.json();
            } catch (err) {
                console.error("JSON Fehler:", err);
            }

            if (!response.ok) {
                setWarningPopup({
                    id: Date.now(),
                    text:
                        data?.message ||
                        "Login fehlgeschlagen. Bitte versuche es erneut.",
                });
                return;
            }

            // Beispiel: Token speichern
            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            setSuccessPopup({
                id: Date.now(),
                text: "Login erfolgreich!",
            });

            if (data.companySetupDone) {
                navigate("/dashboard");
            } else {
                navigate("/setup");
            }

        } catch (error) {
            console.error(error);
            setWarningPopup({
                id: Date.now(),
                text: "Netzwerkfehler. Bitte später erneut versuchen.",
            });
        }
    };

    return (
        <div className="login-container">
            {warningPopup && (
                <WarningPopup
                    key={warningPopup.id}
                    text={warningPopup.text}
                    duration={5000}
                />
            )}

            {successPopup && (
                <SuccessPopup
                    key={successPopup.id}
                    text={successPopup.text}
                    duration={3000}
                />
            )}

            <h2>Login</h2>

            <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Einloggen
            </button>

            <p
                onClick={() => navigate("/register")}
                className="switch-text"
            >
                Noch kein Account? Registrieren
            </p>
        </div>
    );
}