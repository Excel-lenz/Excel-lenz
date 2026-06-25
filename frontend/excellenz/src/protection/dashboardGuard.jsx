import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {authFetch} from "../api/funcs";
import { ME } from "../api/auth";

export default function DashboardGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(false);

  const isAuth = !!localStorage.getItem("access");
  useEffect(() => {
    async function loadUser() {
        try {
        const res = await authFetch(ME);
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