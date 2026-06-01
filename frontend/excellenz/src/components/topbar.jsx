import React, { useState } from "react";
import "../styles/components/topbar.css";
import { Link } from "react-router-dom";
import logoFull from "../Assets/logo.png";



export default function Topbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (

        <div className="topbar">
            <Link to="/dashboard">
                <div className="logoContainer">
                    <img
                        src={logoFull}
                        alt="Excellenz Logo"
                        className="topbar-logo"
                    />

                    <p className="logoText">
                        Excellenz
                    </p>
                </div>
            </Link>


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