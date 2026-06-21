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
import Layout from "./components/Layout";
import Login from "./pages/login/login.jsx";
import Register from "./pages/login/register.jsx"
import "./index.css";
import CompanySetup from "./pages/companySetup"
import CompanySetupGuard from "./protection/companySetupGuard.jsx";
import ProtectedRoute from "./protection/protectedRoute.jsx";
import DashboardGuard from "./protection/dashboardGuard.jsx";
import Input from "./components/inputs";


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
          <Route
              path="/dashboard"
              element={
                <DashboardGuard>
                  <Layout
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      salesOpen={salesOpen}
                      setSalesOpen={setSalesOpen}
                      financeOpen={financeOpen}
                      setFinanceOpen={setFinanceOpen}
                  >
                    <Dashboard />
                  </Layout>
                </DashboardGuard>
              }
          />
          <Route path="/settings" element={
            <DashboardGuard>
                <Layout
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    salesOpen={salesOpen}
                    setSalesOpen={setSalesOpen}
                    financeOpen={financeOpen}
                    setFinanceOpen={setFinanceOpen}
                >
                    <Settings/>
                </Layout>
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

          <Route path="/sales" element={
            <DashboardGuard>
                <Layout
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    salesOpen={salesOpen}
                    setSalesOpen={setSalesOpen}
                    financeOpen={financeOpen}
                    setFinanceOpen={setFinanceOpen}
                >
                    <Sales
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        financeOpen={financeOpen}
                        setFinanceOpen={setFinanceOpen}
                        salesOpen={salesOpen}
                        setSalesOpen={setSalesOpen}
                    />
                </Layout>
            </DashboardGuard>
            }
          />


          <Route
              path="/sales/products"
              element={
                <DashboardGuard>
                  <Layout
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      salesOpen={salesOpen}
                      setSalesOpen={setSalesOpen}
                      financeOpen={financeOpen}
                      setFinanceOpen={setFinanceOpen}
                  >
                    <Products />
                  </Layout>
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