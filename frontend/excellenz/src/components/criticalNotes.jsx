import React from "react";
import "../styles/criticalNotes.css";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';


export default function CriticalNotes() {

  var criticalNote = "Voll auf Kurs";
  var text = "Alles läuft super!";

  //Aus dem Backend
  let existsNote = false;

  if (existsNote) {
      //Diese Variablen eigentlich aus Backend holen
      criticalNote = "Kritische Hinweise";
      text = "Achtung! Einnahmen sind weit unter Ausgaben!";

      return (
          <div className="criticalNotes">
              <div className="symbol-container">
                  <div className="symbol">
                      <FaExclamationCircle size={50} color="#f53420" />
                  </div>
                  <div className="text-container">
                      <h3 className="crit-note-title">{criticalNote}</h3>
                      <div className="note-text">
                          {text}
                      </div>
                  </div>
              </div>
          </div>
        );
      }
  else {
      return (
          <div className="normalNotes">
              <div className="symbol-container">
                  <div className="symbol">
                      <FaCheckCircle size={50} color="#00ff88" />
                  </div>
                  <div className="text-container">
                      <h3 className="normal-note-title">{criticalNote}</h3>
                      <div className="note-text">
                          {text}
                      </div>
                  </div>
              </div>
          </div>
        );
      }
}