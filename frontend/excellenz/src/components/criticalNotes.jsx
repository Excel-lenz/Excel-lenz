import React from "react";
import "../styles/components/criticalNotes.css";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';


export default function CriticalNotes({ isCritical = false, title, text }) {
    const noteTitle = title || (isCritical ? "Kritische Hinweise" : "Voll auf Kurs");
    const noteText = text || (isCritical ? "Achtung! Einnahmen sind weit unter Ausgaben!" : "Alles läuft super!");

    if (isCritical) {
        return (
            <div className="criticalNotes">
                <div className="symbol-container">
                    <div className="symbol">
                        <FaExclamationCircle size={50} color="#f53420" />
                    </div>
                    <div className="text-container">
                        <h3 className="crit-note-title">{noteTitle}</h3>
                        <div className="note-text">
                            {noteText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="normalNotes">
            <div className="symbol-container">
                <div className="symbol">
                    <FaCheckCircle size={50} color="#00ff88" />
                </div>
                <div className="text-container">
                    <h3 className="normal-note-title">{noteTitle}</h3>
                    <div className="note-text">
                        {noteText}
                    </div>
                </div>
            </div>
        </div>
    );
}