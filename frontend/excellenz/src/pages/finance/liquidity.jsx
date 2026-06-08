import Sidebar from "../../components/sidebar.jsx";
import React, {useState} from "react";
import {FaEuroSign, FaPlus} from "react-icons/fa";

import "../../styles/pages/finance/liquidity.css";


export default function Liquidity({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}){


    const liquiditaet = 50000;
    const operativerCF = 7200;
    const naechster = -3700;
    //runway rechnung = ((aktuelle liquidität - einmalige abrechnungen) / monatliche abrechnungen)
    const runway = "31,8 Monate";

    const einzahlungen = 12000;
    const auszahlungen = 7500;
    const cashFlow = einzahlungen - auszahlungen;



    const [liquids] = useState([
        {
            id: 1,
            name: "Miete",
            category: "Ausgabe",
            typ: "Monatlich",
            price: -1500,
        },
        {
            id: 2,
            name: "Steuern",
            category: "Ausgabe",
            typ: "Einmalig",
            price: -2200,
        },

        {
            id: 3,
            name: "Stakeholder Investoren",
            category: "Einnahme",
            typ: "Monatlich",
            price: 1700,
        },
    ]);



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


                {/* CARDS */}
                <section className="revenueStats">

                    <div className="revenueCard">
                        <div>
                            <span>Aktuelle Liquidität</span>
                            <h2>€ {liquiditaet.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Operativer Cashflow</span>
                            <h2>€ {operativerCF.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Nächster Monat</span>
                            <h2>€ {naechster.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Runway</span>
                            <h2>{runway.toLocaleString()}</h2>
                        </div>
                    </div>

                </section>

                {/* CHART PLACEHOLDER */}
                <section className="chartSection">
                    <div className="chartPlaceholder">
                        <h4>hier kommt noch Chart rein Liniendiagramm mit selbsteingegebener Warnlinie?
                            <br />
                            Diagramm von letzten 3 Monate + aktueller Stand + prognose der nächsten 6 Monate?</h4>

                    </div>
                </section>

                {/* CARDS */}
                <section className="revenueStats">

                    <div className="revenueCard">
                        <div>
                            <span>Einzahlungen</span>
                            <h2>€ {einzahlungen.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Auszahlungen</span>
                            <h2>€ {auszahlungen.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Cashflow</span>
                            <h2>€ {cashFlow.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Liquide Mittel am Periodenende</span>
                            <h2>stuff</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Liquiditätsgrad 1</span>
                            <h2>stuff</h2>
                        </div>
                    </div>

                </section>


                {/* TABLE */}
                <section className="revenueTableWrapper">

                    <div className="tableHeader">
                        <h3>Liquiditätsbewegung</h3>

                        <button className="tableAddBtn">
                            <FaPlus />
                            Hinzufügen
                        </button>
                    </div>

                    <table className="revenueTable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Kategorie</th>
                            <th>Typ</th>
                            <th>Betrag</th>
                        </tr>
                        </thead>

                        <tbody>
                        {liquids.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.typ}</td>
                                <td className={item.price < 0 ? "negative" : "positive"}>
                                    € {item.price}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </section>



            </main>


        </div>






    );
}