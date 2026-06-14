import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {authFetch} from "../api/funcs";

export default function DashboardGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(false);

  const isAuth = !!localStorage.getItem("access");
  const token = localStorage.getItem("access");

  useEffect(() => {
    async function loadUser() {
        try {
        const res = await authFetch("http://localhost:8000/api/auth/me/");
        const data = await res.json();

        setHasCompany(data.companySetupDone);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    }

    loadUser();
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if(hasCompany == false){
    return <Navigate to="/setup" replace />;
  }

  return children;
}