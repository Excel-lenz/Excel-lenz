import React,{ useState } from "react";
import "../styles/components/streak.css";

export default function Streak({ title, children }) {
    const [streak, setStreak] = useState(12);
    
    return (
    <div className="streak-container" onClick={() => setStreak(1)}>
        <h1>Streak {streak}</h1>
    </div>
    );
}
