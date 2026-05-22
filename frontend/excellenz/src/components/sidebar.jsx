import React from "react";
import "../styles/sidebar.css";
import { FaTachometerAlt, FaChartLine, FaWallet, FaCogs } from "react-icons/fa";



export default function Sidebar() {


  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Excellenz</h2>
      <div className="sidebar-item"><FaTachometerAlt /> Dashboard</div>
      <div className="sidebar-item"><FaChartLine /> Umsatz</div>
      <div className="sidebar-item"><FaWallet /> Finanzen</div>
      <div className="sidebar-item"><FaCogs /> Einstellungen</div>
    </div>
  );
}
