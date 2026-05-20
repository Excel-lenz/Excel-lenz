import { useState } from "react";
import LoadingScreen from "./components/loadingScreen";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [done, setDone] = useState(false);

  return (
    <>
      <div style={{
        opacity: done ? 1 : 0,
        transition: "opacity 0.4s ease",
        background: "#0b0b10",
        minHeight: "100vh"
      }}>
        <Dashboard />
      </div>

      <LoadingScreen onComplete={() => setDone(true)} />
    </>
  );
}