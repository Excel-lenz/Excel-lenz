import React, {useState, useEffect} from "react";
import "../styles/components/streak.css";
import { GoFlame } from 'react-icons/go';

// imports for streak - data
import { getStreak } from "../api/progress/streak.jsx";

export default function Streak () {
    const [streak, setStreak] = useState("");
    
    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const streakData = await getStreak();
                console.log(streakData);
                setStreak(streakData.currentStreak);
            } catch (err) {
                console.error("Fehler beim Laden der Streak:", err);
            }
        };

        fetchStreak();
    }, []);

    let text = " Tag!";

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