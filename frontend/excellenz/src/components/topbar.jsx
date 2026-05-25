import React from "react";
import "../styles/topbar.css";
import logo from "../../Assets/Logo_proto07.png";
import { Link } from "react-router-dom";

export default function Topbar() {
    return (
        <div className="topbar">
            <Link to="/dashboard" >
                <img className="topbar-logo" src={logo} alt="Logo" />
            </Link>
        </div>
    );
}