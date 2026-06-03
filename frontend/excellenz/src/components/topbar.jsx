import React, { useState } from "react";
import "../styles/components/topbar.css";
import { Link } from "react-router-dom";
import logoFull from "../Assets/logo.png";



export default function Topbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (

        <div className="topbar">
            <div
                className="topbar-user"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                👤

                {menuOpen && (
                    <div className="user-menu">
                        <Link to="/profile">Profile</Link>
                        <Link to="/settings">Settings</Link>
                        <button>Logout</button>
                    </div>
                )}
            </div>

        </div>
    );
}