import React from "react";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";

import "../../styles/pages/sales/sales.css";

export default function Sales({
    sidebarOpen,
    setSidebarOpen,
    salesOpen,
    setSalesOpen,
    financeOpen,
    setFinanceOpen
}) {

    const sales = [
        {
            id: 1,
            product: "Gaming Maus",
            price: 39.99,
            customer: "Max Mustermann",
            date: "21.06.2026"
        },
        {
            id: 2,
            product: "Mechanische Tastatur",
            price: 89.99,
            customer: "Anna Schmidt",
            date: "20.06.2026"
        },
        {
            id: 3,
            product: "Gaming Headset",
            price: 69.99,
            customer: "Peter Müller",
            date: "19.06.2026"
        }
    ];

    return (
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
                        <p>Übersicht aller Verkäufe</p>
                    </div>
                </header>

                <div className="salesGrid">
                    {sales.map((sale) => (
                        <Card
                            key={sale.id}
                            title={sale.product}
                        >
                            <p>
                                <strong>Kunde:</strong> {sale.customer}
                            </p>

                            <p>
                                <strong>Preis:</strong> {sale.price} €
                            </p>

                            <p>
                                <strong>Datum:</strong> {sale.date}
                            </p>
                        </Card>
                    ))}
                </div>

            </main>

        </div>
    );
}