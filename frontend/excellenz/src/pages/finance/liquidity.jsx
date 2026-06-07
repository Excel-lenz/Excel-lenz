import Sidebar from "../../components/sidebar.jsx";
import React from "react";
import {FaPlus} from "react-icons/fa";

import "../../styles/pages/finance/revenue.css";


export default function Liquidity({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}){




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

            <main className="revenueMain">

                {/* HEADER */}
                <header className="revenueHeader">
                    <div>
                        <h1>Liquidität</h1>
                        <p>
                            was macht überhaupt liquidittti
                        </p>
                    </div>

                    <button className="addRevenueBtn">
                        <FaPlus />
                        hier einfügen oder so
                    </button>
                </header>

                <section>
                    <div>
                        <span>stuff</span>
                        <h2>hier kommt irgendwas</h2>
                    </div>
                </section>
            </main>


        </div>






    );
}