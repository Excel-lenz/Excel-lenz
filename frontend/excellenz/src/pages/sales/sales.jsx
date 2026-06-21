import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import "../../styles/pages/sales/sales.css";
import { getSales } from "../../api/sales/salesAPI";




export default function Sales({

}) {
    const [sales, setSales] = useState([]);
    useEffect(() => {
        const loadSales = async () => {
            try {
                const data = await getSales();
                setSales(data);
            } catch (err) {
                console.error(
                    "Failed loading sales:",
                    err
                );
            }
        };

        loadSales();

    }, []);

    return (
        <div className="layout">
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
                            title={sale.name}
                        >
                            <p>
                                <strong>Kategorie:</strong> {sale.category}
                            </p>

                            <p>
                                <strong>Preis:</strong> {sale.price} €
                            </p>

                            <p>
                                <strong>Anzahl:</strong> {sale.quantity}
                            </p>

                            <p>
                                <strong>Gesamt:</strong>{" "}
                                {(sale.price * sale.quantity).toFixed(2)} €
                            </p>

                            <p>
                                <strong>Datum:</strong>{" "}
                                {new Date(sale.date).toLocaleDateString()}
                            </p>
                        </Card>
                    ))}
                </div>

            </main>

        </div>
    );
}