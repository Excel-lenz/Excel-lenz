import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/loadingScreen";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/settings.jsx";
import Finance from "./pages/finance.jsx";
import Revenue from "./pages/finance/revenue.jsx";
import Sales from "./pages/sales/sales.jsx";
import Products from "./pages/sales/products.jsx";
import "./index.css";


export default function App() {
  const [done, setDone] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const [salesOpen, setSalesOpen] = useState(true);

  return (
    <BrowserRouter>
      <div
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: "#0b0b10",
          minHeight: "100vh",
          display: "flex",     
          flexDirection: "column", 
        }}
      >
        <Routes>
          <Route path="/" element={
            <Dashboard
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              financeOpen={financeOpen}
              setFinanceOpen={setFinanceOpen}
              salesOpen={salesOpen}
              setSalesOpen={setSalesOpen}
            />
            } 
          />
          <Route path="/dashboard" element={
            <Dashboard
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              financeOpen={financeOpen}
              setFinanceOpen={setFinanceOpen}
              salesOpen={salesOpen}
              setSalesOpen={setSalesOpen}
            />
            } 
          />
          <Route path="/settings" element={ <Settings
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              financeOpen={financeOpen}
              setFinanceOpen={setFinanceOpen}
              salesOpen={salesOpen}
              setSalesOpen={setSalesOpen}
            />
            } 
          />

          {/* Finance routes */}

          <Route path="/finance" element={ <Finance
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              financeOpen={financeOpen}
              setFinanceOpen={setFinanceOpen}
              salesOpen={salesOpen}
              setSalesOpen={setSalesOpen}
            />
            } 
          />

          <Route path="/finance/revenue" element={ <Revenue
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              financeOpen={financeOpen}
              setFinanceOpen={setFinanceOpen}
              salesOpen={salesOpen}
              setSalesOpen={setSalesOpen}
            />
            } 
          />

          <Route path="/sales" element={ <Sales
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              financeOpen={financeOpen}
              setFinanceOpen={setFinanceOpen}
              salesOpen={salesOpen}
              setSalesOpen={setSalesOpen}
            />
            } 
          />


          <Route path="/sales/products" element={ <Products
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              financeOpen={financeOpen}
              setFinanceOpen={setFinanceOpen}
              salesOpen={salesOpen}
              setSalesOpen={setSalesOpen}
            />
            } 
          />
        </Routes>
      </div>

      <LoadingScreen onComplete={() => setDone(true)} />
    </BrowserRouter>
  );
}