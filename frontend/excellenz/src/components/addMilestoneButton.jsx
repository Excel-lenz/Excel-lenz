import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../styles/components/addMilestoneButton.css";

export default function AddMilestoneButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState("Umsatz-Meilenstein");
    const [amount, setAmount] = useState("");

    const handleSubmit = () => {
        console.log({
            type,
            amount,
        });

        setIsOpen(false);
    };

    return (
        <div className="dropdown-wrapper">
            <button
                className="milestone-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaPlus />
                Meilenstein hinzufügen
            </button>

            {isOpen && (
                <div className="milestone-dropdown">
                    <label className="dropdown-label">
                        Typ
                        <select
                            className="dropdown-select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option>Umsatz-Meilenstein</option>
                            <option>Kosten-Meilenstein</option>
                            <option>Liquiditäts-Meilenstein</option>
                        </select>
                    </label>

                    <label className="dropdown-label">
                        Wert
                        <input
                            className="dropdown-input"
                            type="text"
                            placeholder="20.000 €"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </label>

                    <button
                        className="dropdown-submit"
                        onClick={handleSubmit}
                    >
                        Hinzufügen
                    </button>
                </div>
            )}
        </div>
    );
}