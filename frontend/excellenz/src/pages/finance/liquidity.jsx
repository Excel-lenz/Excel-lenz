import Sidebar from "../../components/sidebar.jsx";
import React, {useState} from "react";
import {FaEuroSign, FaPlus} from "react-icons/fa";

import "../../styles/pages/finance/liquidity.css";


export default function Liquidity({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}){


    const [liquids] = useState([

        {
            id: 7,
            name: "Einnahmen von Verkauf",
            category: "Einnahme",
            typ: "Monatlich",
            price: 21000,
        },

        {
            id: 8,
            name: "Fixkosten",
            category: "Ausgabe",
            typ: "Monatlich",
            price: -9050,
        },

        {
            id: 9,
            name: "Variable Kosten",
            category: "Ausgabe",
            typ: "Monatlich",
            price: -4200,
        },


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

        {
            id: 4,
            name: "Stakeholder Investoren",
            category: "Einnahme",
            typ: "Monatlich",
            price: 5700,
        },

        {
            id: 5,
            name: "Stakeholder Investoren",
            category: "Einnahme",
            typ: "Monatlich",
            price: 1700,
        },

        {
            id: 6,
            name: "Steuern",
            category: "Ausgabe",
            typ: "Einmalig",
            price: -1500,
        },

    ]);






    //variablen aus der Datenbank holen
    const [bestand, setBestand] = useState(50000);
    const [einzahlungen, setEinzahlungen] = useState(12000);
    const [auszahlungen, setAuszahlungen] = useState(7500);
    const [naechster, setNaechster] = useState(-3700);
    const [abschreibung, setAbschreibung] = useState(1200);
    const [gewinn, setGewinn] = useState(10000);

    //runway rechnung = ((aktuelle liquidität - einmalige abrechnungen) / monatliche abrechnungen)
    //implementier noch runway rechnung
    const [runway, setRunway] = useState("31,8 Monate");
    //implementiere noch rechnung für erstengrades
    const [erstenGrades, setErstenGrades] = useState(55);

    var allEinzahlungen = rechenallEinzahlungen();

    var allAuszahlungen = rechenallAuszahlungen();

    const cashFlow = einzahlungen - auszahlungen;
    const operativerCF = gewinn + abschreibung;
    const endbestand = bestand + allEinzahlungen + allAuszahlungen;






    function rechenallEinzahlungen(){
        return liquids.reduce((total, item) => {
            if (item.category === "Einnahme") {
                return total + item.price;
            }
            return total;
        }, 0);
    }

    function rechenallAuszahlungen(){
        return liquids.reduce((total, item) => {
            if (item.category === "Ausgabe") {
                return total + item.price;
            }
            return total;
        }, 0);
    }




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
                            <h2>€ {bestand.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>Liquide Mittel am Periodenende</span>
                            <h2>€ {endbestand.toLocaleString()}</h2>
                        </div>
                    </div>



                    {/* HAB VERGESSEN FÜR WAS DAS HIER IST
                    <div className="revenueCard">
                        <div>
                            <span>Nächster Monat</span>
                            <h2>€ {naechster.toLocaleString()}</h2>
                        </div>
                    </div>
                    */}

                    <div className="revenueCard">
                        <div>
                            <span>Liquiditätsgrad 1</span>
                            <h2>{erstenGrades.toLocaleString()}%</h2>
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
                            <span>alle Einzahlungen diesen Monat</span>
                            <h2>€ {allEinzahlungen.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>alle Auszahlungen diesen Monat</span>
                            <h2>€ {allAuszahlungen.toLocaleString()}</h2>
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
                            <span>Operativer Cashflow</span>
                            <h2>€ {operativerCF.toLocaleString()}</h2>
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