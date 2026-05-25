import React from "react";
import Dashboard from "../pages/Dashboard";
import Teilziele from "./Teilziele";
import "./styles/global.css";

export default function App() {
  return (
    <div>
      <Dashboard />
      <Teilziele />
    </div>
  );
}