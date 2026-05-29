import React from "react";
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/sales/sales.css"



export default function Sales({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}) {
    return(
        <div>
            <div className="layout">
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    salesOpen={salesOpen}
                    setSalesOpen={setSalesOpen}
                    financeOpen={financeOpen}
                    setFinanceOpen={setFinanceOpen}
                />
            </div>
        </div>
    );
}