import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/loadingScreen";
import Dashboard from "./pages/dashboard.jsx";
import Settings from "./pages/settings.jsx";
import Finance from "./pages/finance.jsx";
import Revenue from "./pages/finance/revenue.jsx";
import Sales from "./pages/sales/sales.jsx";
import Products from "./pages/sales/products.jsx";
import LandingPage from "./pages/landing/landingPage.jsx";
import Taxes from "./pages/taxes/taxes.jsx"
import Investitionen from "./pages/finance/investment.jsx";
import Costs from "./pages/finance/costs.jsx";
import Glossar from "./pages/glossar.jsx";
import Liquidity from "./pages/finance/liquidity.jsx";

import Login from "./pages/login/login.jsx";
import Register from "./pages/login/register.jsx"
import "./index.css";
import CompanySetup from "./pages/companySetup"

import CompanySetupGuard from "./protection/companySetupGuard.jsx";
import ProtectedRoute from "./protection/protectedRoute.jsx";
import DashboardGuard from "./protection/dashboardGuard.jsx";



export default function App() {
  const [done, setDone] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const [salesOpen, setSalesOpen] = useState(true);

  {/* Testing */}
  const [isLogin, setIsLogin] = useState(true);


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
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <DashboardGuard>
              <Dashboard
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
            </DashboardGuard>
            } 
          />
          <Route path="/settings" element={ 
            <DashboardGuard>
              <Settings
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
            </DashboardGuard>
            } 
          />

          {/* Finance routes */}

          <Route path="/finance" element={ 
            <DashboardGuard>
              <Finance
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
            </DashboardGuard>
            } 
          />

          <Route path="/finance/revenue" element={ 
            <DashboardGuard>
              <Revenue
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
            </DashboardGuard>
            } 
          />

          <Route path="/finance/costs" element={ 
            <DashboardGuard>
              <Costs
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
            </DashboardGuard>
            } 
          />

          <Route path="/sales" element={ 
            <DashboardGuard>
              <Sales
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
            </DashboardGuard>
            } 
          />


          <Route path="/sales/products" element={ 
            <DashboardGuard>
              <Products
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
            </DashboardGuard>
            } 
          />

           <Route path="/taxes" element={ 
             <DashboardGuard>
                <Taxes
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  financeOpen={financeOpen}
                  setFinanceOpen={setFinanceOpen}
                  salesOpen={salesOpen}
                  setSalesOpen={setSalesOpen}
                />
             </DashboardGuard>
             }
           />

           <Route path="/finance/investitionen" element={ 
             <DashboardGuard>
                <Investitionen
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  financeOpen={financeOpen}
                  setFinanceOpen={setFinanceOpen}
                  salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
              />
              </DashboardGuard>
              }
            />

            <Route path="/finance/liquidity" element={ 
              <DashboardGuard>
                <Liquidity
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  financeOpen={financeOpen}
                  setFinanceOpen={setFinanceOpen}
                  salesOpen={salesOpen}
                  setSalesOpen={setSalesOpen}
                />
              </DashboardGuard>
            }
          />

            <Route path="/glossar" element={
              <DashboardGuard>
                <Glossar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  financeOpen={financeOpen}
                  setFinanceOpen={setFinanceOpen}
                  salesOpen={salesOpen}
                  setSalesOpen={setSalesOpen}
                />
              </DashboardGuard>
            } 
          />

          

          {/* Test Route */}
          <Route path="/login" element={ <Login
              onSwitch={() => setIsLogin(false)}
            />
            } 
          />

          <Route path="/register" element={ <Register
              onSwitch={() => setIsLogin(true)}
            />
            } 
          />
          <Route path="/setup" element={ 
             <CompanySetupGuard>
              <CompanySetup />
            </CompanySetupGuard>
            }
          />

        </Routes>
      </div>

      <LoadingScreen onComplete={() => setDone(true)} />
    </BrowserRouter>
  );
}