import React, { useState, useEffect } from "react";
import "../styles/components/input.css";
import { getTransactions, createTransaction } from "../api/inputs/inputAPI";

export default function Input( {onCreated} ) {
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




    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");


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
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Kategorie"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Preis"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Anzahl"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />

                        </>
                    )}

                    {entryType === "expense" && (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Kategorie"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Preis"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Anzahl"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </>
                    )}

                    <button
                        className="confirmButton"
                        onClick={async () => {
                            
                            try {
                                const payload = {
                                    name: name,
                                    category: category,
                                    type: entryType,
                                    price: price,
                                    quantity: quantity,
                                };

                                await createTransaction(payload);
                                setMenuOpen(false);
                                await onCreated();
                                

                                setCategory("")
                                setPrice("")
                                setQuantity("")
                                setName("")

                            }catch(err){
                                console.log(err);
                            }
                             
                            
                        }}
                    >
                        Confirm
                    </button>

                </div>
            )}
        </>
    );
}