import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/sales/sales.css"
import {FaEuroSign, FaPlus} from "react-icons/fa";




export default function Sales({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}) {
    const [showForm, setShowForm] = useState(false);
    return(
        
        <div className="layout">

            
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    salesOpen={salesOpen}
                    setSalesOpen={setSalesOpen}
                    financeOpen={financeOpen}
                    setFinanceOpen={setFinanceOpen}
                /> 

                                             <main className="salesMain">
                <header className="salesHeader">
                    
                                <div>
                                    <h1>Sales</h1>
                                    <p>
                                        ?
                                    </p>
                                </div>
            
                                <button
    className="addSalesBtn"
    onClick={() => setShowForm(true)}
>
    <FaPlus />
    Neuer Sale
</button>
                            </header>
                            {showForm && (
    <div className="modalOverlay">
        <div className="modal">
            <h2>Neuen Sale anlegen</h2>

            <form>
                <div className="formGroup">
                    <label>Kunde</label>
                    <input type="text" placeholder="Kundenname" />
                </div>

                <div className="formGroup">
                    <label>Betrag (€)</label>
                    <input type="number" placeholder="0.00" />
                </div>

                <div className="formGroup">
                    <label>Beschreibung</label>
                    <textarea placeholder="Beschreibung..." />
                </div>

                <div className="modalActions">
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                    >
                        Abbrechen
                    </button>

                    <button type="submit">
                        Speichern
                    </button>
                </div>
            </form>
        </div>
    </div>
)}         
             </main>           
            
            
            
        </div>
        
    );
}