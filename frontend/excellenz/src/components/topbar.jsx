import React, { useState } from "react";
import "../styles/components/topbar.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../pages/login/logout";


export default function Topbar() {
    const navigate = useNavigate();
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
                        <button onClick={() => logout(navigate)}>Logout</button>
                    </div>
                )}
            </div>

        </div>
    );
}