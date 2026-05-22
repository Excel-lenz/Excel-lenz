import React from "react";
import "../styles/streak.css";
import { GoFlame } from 'react-icons/go';


export default function Streak () {
    //Eigentlich diese Daten aus dem Backend laden
    const savedStreak = 5;
    const dayDifference = 2;

    let streak = savedStreak;
    let text = " Tag!";

    if (dayDifference === 1) {
        streak += 1;
    }
    if (dayDifference > 1) {
        streak = 1;
    }
    if (streak > 1) {
        text = " Tage!"
    }

    return (
        <div className="streak-card">
            <div className="streak-elements">
                <div className="streak-icon-container">
                    <GoFlame size={42} color="#00ff88" />
                </div>
                <div className="streak-texts">
                    <h3 className="streak-title">Streak</h3>
                    <div className="streak-text">
                        {streak}{text}
                    </div>
                </div>
            </div>
        </div>
    )
}