import { useState } from "react";
import "../../styles/pages/login/register.css";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../../api/auth";
import { WarningPopup, SuccessPopup } from "../../components/popup";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [warningPopup, setWarningPopup] = useState(null);
    const [successPopup, setSuccessPopup] = useState(null);
    const [popup, setPopup] = useState(null);

    const handleRegister = async () => {
        if (!username.trim() || !email.trim() || !password.trim()) {
            setWarningPopup({
                id: Date.now(),
                text: "Fülle alle Felder aus!"
            });
            return;
        }

        try {
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

            let data = {};

            try {
                data = await response.json();
            } catch (err) {
                console.error("Antwort war kein gültiges JSON:", err);
            }

            if (!response.ok) {
                setWarningPopup({
                    id: Date.now(),
                    text: "Es gab einen Fehler beim Verarbeiten der Daten."
                });
                console.error(data);
                return;
            }

            if (data.success === false) {
                if (data.errors) {
                    const messages = Object.values(data.errors)
                        .map((error) => error.message)
                        .join("\n");

                    setWarningPopup({
                        id: Date.now(),
                        text: messages
                    });
                } else {
                    setWarningPopup({
                        id: Date.now(),
                        text: "Registrierung fehlgeschlagen."
                    });

                }

                return;
            }

            setSuccessPopup({
                id: Date.now(),
                text: "Registrierung erfolgreich!"
            });

            // Nach 2 Sekunden weiterleiten (eigentlich zur E-Mail verification)
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error(error);
            setWarningPopup({
                id: Date.now(),
                text: "Netzwerkfehler. Bitte versuche es später erneut."
            });
        }
    };

    return (
        <div className="register-container">
            {warningPopup && (
                <WarningPopup
                    key={warningPopup.id}
                    text={warningPopup.text}
                    duration={5000}
                />
            )}

            {successPopup && (
                <SuccessPopup
                    key={SuccessPopup.id}
                    text={SuccessPopup.text}
                    duration={3000}
                />
            )}

            <h2>Registrieren</h2>

            <div className="inputs">
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={handleRegister}>
                Account erstellen
            </button>

            <p
                onClick={() => navigate("/login")}
                className="switch-text"
            >
                Bereits einen Account? Login
            </p>
        </div>
    );
}