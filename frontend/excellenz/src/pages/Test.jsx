import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/topbar";
import deadly from "../../Assets/Dont-Open.gif";
import "../styles/dashboard.css";

export default function Dashboard() {
    return (
        <div className="layout">
            <Topbar />
            <Sidebar />

            <main className="main">
                <div>
                    <h1>Test Page</h1>

                    <img src={deadly} alt="Animation" />
                </div>

            </main>
        </div>
    );
}
