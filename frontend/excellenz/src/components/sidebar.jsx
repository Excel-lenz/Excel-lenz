import React, { useState } from "react";
import "../styles/components/sidebar.css";

import logoFull from "../assets/logo.png";

import {
  FaTachometerAlt,
  FaChartLine,
  FaWallet,
  FaCogs,
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaUniversity,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen, financeOpen, setFinanceOpen, salesOpen, setSalesOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${open ? "open" : "collapsed"}`}>
      
      {/* HEADER */}
      <div className="sidebar-header">
        <img
          src={logoFull}
          alt="Excellenz Logo"
          className="sidebarlogo"
        />

        {open && (
          <p className="logoText">
            Excellenz
          </p>
        )}
      </div>

      
      {/* TOGGLE */}
      {/*

        vorerst deaktiviert.

      <div
        className="sidebar-item"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
        {open && <span>Menü</span>}
      </div>

      <div className="divider"></div>

      */}

      {/* SECTION */}
      {open && (
        <p className="sidebar-section">
          MAIN
        </p>
      )}

      {/* DASHBOARD */}
      <div
        className={`sidebar-item ${
          isActive("/dashboard") ? "active" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <FaTachometerAlt />
        {open && <span>Dashboard</span>}
      </div>

      


      {/* FINANCE SECTION */}
      {open && (
        <p className="sidebar-section">
          FINANZEN
        </p>
      )}

      <div
        className={`sidebar-item ${
          location.pathname.includes("/finance")
            ? "active"
            : ""
        }`}
        onClick={() => setFinanceOpen(!financeOpen)}
      >
        <FaWallet />

        {open && (
          <>
            <span>Finanzen</span>

            <div className="expandIcon">
              {financeOpen ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </div>
          </>
        )}
      </div>

      {/* SUBMENU FINANCE*/}
      {financeOpen && open && (
        <div className="submenu">
          
          <div
            className={`submenu-item ${
              isActive("/finance/revenue")
                ? "active-sub"
                : ""
            }`}
            onClick={() => navigate("/finance/revenue")}
          >
            <FaMoneyBillWave />
            <span>Umsatzplanung</span>
          </div>

          <div
            className={`submenu-item ${
              isActive("/finance/costs")
                ? "active-sub"
                : ""
            }`}
            onClick={() => navigate("/finance/costs")}
          >
            <FaFileInvoiceDollar />
            <span>Kostenplanung</span>
          </div>

          <div
            className={`submenu-item ${
              isActive("/finance/liquidity")
                ? "active-sub"
                : ""
            }`}
            onClick={() => navigate("/finance/liquidity")}
          >
            <FaUniversity />
            <span>Liquidität</span>
          </div>
        </div>
      )}

      {/* SUBMENU SALES*/}
      <div
        className={`sidebar-item ${
          location.pathname.includes("/sales")
            ? "active"
            : ""
        }`}
        onClick={() => setSalesOpen(!salesOpen)}
      >
        <FaWallet />

        {open && (
          <>
            <span>Umsatz</span>

            <div className="expandIcon">
              {salesOpen ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </div>
          </>
        )}
      </div>


      {salesOpen && open && (
        <div className="submenu">
          
          <div
            className={`submenu-item ${
              isActive("/sales")
                ? "active-sub"
                : ""
            }`}
            onClick={() => navigate("/sales")}
          >
            <FaMoneyBillWave />
            <span>Sales</span>
          </div>

          <div
            className={`submenu-item ${
              isActive("/sales/products")
                ? "active-sub"
                : ""
            }`}
            onClick={() => navigate("/sales/products")}
          >
            <FaFileInvoiceDollar />
            <span>Produkte</span>
          </div>

          <div
            className={`submenu-item ${
              isActive("/finance/liquidity")
                ? "active-sub"
                : ""
            }`}
            onClick={() => navigate("/finance/liquidity")}
          >
            <FaUniversity />
            <span>Liquidität</span>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      <div
        className={`sidebar-item ${
          isActive("/settings") ? "active" : ""
        }`}
        onClick={() => navigate("/settings")}
      >
        <FaCogs />
        {open && <span>Einstellungen</span>}
      </div>
    </div>
  );
}