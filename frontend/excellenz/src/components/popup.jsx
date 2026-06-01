import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/components/popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Popup({ color, title, text, duration = 3000 }) {
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);

    const closePopup = () => {
        setClosing(true);

        setTimeout(() => {
            setVisible(false);
        }, 250);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            closePopup();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return createPortal(
        <div
            className={`popupbox ${closing ? "popup-closing" : ""}`}
            style={{ borderTop: `4px solid ${color}` }}
        >
            <div className="popuptitle">{title}</div>
            <div className="popuptext">{text}</div>

            <div className="popupbutton" onClick={closePopup}>
                <FontAwesomeIcon icon={faXmark} />
            </div>

            <div className="popup-progress-wrapper">
                <div
                    className="popup-progress"
                    style={{
                        backgroundColor: color,
                        animationDuration: `${duration}ms`,
                    }}
                />
            </div>
        </div>,
        document.body
    );
}


export function WarningPopup({ text = "Es ist etwas schiefgelaufen", duration = 3000 }) {
    return (
        <Popup
            color="#f53420"
            title="Warnung!"
            text={text}
            duration={duration}
        />
    );
}

export function SuccessPopup({ text = "Aufgabe wurde erfüllt", duration = 3000 }) {
    return (
        <Popup
            color="#2ECC71"
            title="Erfolgreich"
            text={text}
            duration={duration}
        />
    );
}

export function InfoPopup({ text = "Passen Sie auf", duration = 3000 }) {
    return (
        <Popup
            color="#2C3E40"
            title="Hinweis:"
            text={text}
            duration={duration}
        />
    );
}
