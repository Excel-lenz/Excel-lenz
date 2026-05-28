import React from "react";
import "../styles/criticalNotes.css";
import { FaExclamation, FaExclamationCircle } from 'react-icons/fa';


export default function CriticalNotes() {

  //Diese Variablen eigentlich aus Backend holen
  let criticalNote = "Kritische Hinweise";
  let text = "Achtung! Einnahmen sind weit unter Ausgaben!";

  return (
    <div className="criticalNotes">
        <div className="symbol-container">
            <div className="symbol">
                <FaExclamationCircle size={50} color="#f53420" />
            </div>
            <div className="text-container">
                <h3 className="note-title">{criticalNote}</h3>
                <div className="note-text">
                    {text}
                </div>
            </div>
        </div>
    </div>
  );
}