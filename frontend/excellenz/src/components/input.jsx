import React, { useState, useEffect } from "react";
import "../styles/components/input.css";

export default function Input() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [entryType, setEntryType] = useState("");

    const [mouseX, setMouseX] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouseX(e.clientX);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const threshold = window.innerWidth - 200;

    const opacity =
        mouseX < threshold
            ? 0
            : Math.min((mouseX - threshold) / 200, 1);

    if (minimized) {
        return (
            <div
                className="restoreArrow"
                style={{ opacity }}
                onClick={() => setMinimized(false)}>
                ◀
            </div>
        );
    }

    return (
        <>
            {!menuOpen && (
                <div className="inputButtonContainer">
                    <button
                        className="inputButton"
                        onClick={() => setMenuOpen(true)}>
                        Input
                    </button>

                    <button
                        className="minimizeButton"
                        onClick={() => setMinimized(true)}>
                        ×
                    </button>

                </div>
            )}

            {menuOpen && (
                <div className="inputMenu">

                    <div className="menuHeader">

                        <h3>Input</h3>

                        <button
                            className="closeButton"
                            onClick={() => setMenuOpen(false)}
                        >
                            ×
                        </button>

                    </div>

                    <label>Art</label>

                    <select
                        value={entryType}
                        onChange={(e) => setEntryType(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="income">Einnahmen</option>
                        <option value="expense">Ausgaben</option>
                    </select>

                    {entryType === "income" && (
                        <>
                            <input
                                type="number"
                                placeholder="Menge"
                            />

                            <input
                                type="text"
                                placeholder="Description"
                            />
                        </>
                    )}

                    {entryType === "expense" && (
                        <>
                            <input
                                type="number"
                                placeholder="Menge"
                            />

                            <input
                                type="text"
                                placeholder="Description"
                            />
                        </>
                    )}

                    <button
                        className="confirmButton"
                        onClick={() => {
                            setMenuOpen(false);
                        }}
                    >
                        Confirm
                    </button>

                </div>
            )}
        </>
    );
}