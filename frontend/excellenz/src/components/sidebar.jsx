import React from "react";
import "../styles/sidebar.css";
import { FaTachometerAlt, FaChartLine, FaWallet, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
        <Link to="/dashboard" className="sidebar-item">
            <FaTachometerAlt /> Dashboard
        </Link>

        <Link to="/umsatz" className="sidebar-item">
            <FaChartLine /> Umsatz
        </Link>

        <Link to="/finanzen" className="sidebar-item">
            <FaWallet /> Finanzen
        </Link>

        <Link to="/test" className="sidebar-item">
            <FaCogs /> Test
        </Link>
    </div>
  );
}
