import Sidebar from "../../components/sidebar.jsx";
import React, {useState} from "react";
import {FaEuroSign, FaPlus} from "react-icons/fa";
import DatePicker from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

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
            datum:"2026-05-17",
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
            name: "Steuern2",
            category: "Ausgabe",
            typ: "Einmalig",
            datum:"2026-07-27",
            price: -2500,
        },

        {
            id: 10,
            name: "Steuern3",
            category: "Ausgabe",
            typ: "Einmalig",
            datum:"2026-09-12",
            price: -1700,
        },

        {
            id: 11,
            name: "Steuern4",
            category: "Ausgabe",
            typ: "Einmalig",
            datum:"2026-08-15",
            price: -1100,
        },

        {
            id: 11,
            name: "CoolesGeld",
            category: "Einnahme",
            typ: "Einmalig",
            datum:"2026-05-07",
            price: 3200,
        },

    ]);




    const [startDate, setStartDate] = useState("2026-05-10");
    const [endDate, setEndDate] = useState("2026-08-27");

    const [heuteDatum, setHeuteDatum] = useState("2026-06-20");
    const [gruendungsDatum, setGruendungsDatum] = useState("2025-10-14");



    const getMonthCount = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return (
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth()) +
            1
        );
    };

    const monthCount = getMonthCount(startDate, endDate);

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



    const cashFlow = einzahlungen - auszahlungen;
    const operativerCF = gewinn + abschreibung;


    const [showFirstTable, setShowFirstTable] = useState(true);


    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("de-DE");
    };


    const [activeCategory, setActiveCategory] = useState("All");
    const [activeType, setActiveType] = useState("All");


    const sortedLiquids = [...liquids].sort((a, b) => {
        if (a.typ === "Monatlich" && b.typ === "Einmalig") return -1;
        if (a.typ === "Einmalig" && b.typ === "Monatlich") return 1;

        if (a.typ === "Einmalig" && b.typ === "Einmalig") {
            return new Date(a.datum) - new Date(b.datum);
        }

        return 0;
    });

    const settingsSortedList = sortedLiquids.filter((item) =>{
            if(activeCategory === "All" || item.category === activeCategory){
                if(activeType === "All" || item.typ === activeType){
                    return true;
                }
            }
            return false;
        })



    const filteredLiquids = sortedLiquids.filter((item) => {
        if (item.typ === "Monatlich") return true;

        if (item.typ === "Einmalig") {
            return item.datum >= startDate && item.datum <= endDate;
        }

        return false;
    });

    const settingsFilteredList = filteredLiquids.filter((item) =>{
        if(activeCategory === "All" || item.category === activeCategory){
            if(activeType === "All" || item.typ === activeType){
                return true;
            }
        }
        return false;
    })


    function LiquidDatePicker({ typeDate, setTypeDate }) {
        return (
            <ReactDatePicker
                selected={typeDate ? new Date(typeDate) : null}
                onChange={(d) =>
                    setTypeDate(d ? d.toISOString().split("T")[0] : "")
                }
                dateFormat="dd.MM.yyyy"
                popperPlacement="bottom-start"
            />
        );
    }


    function rechenallEinzahlungen(){
        return settingsFilteredList.reduce((total, item) => {
            if (item.category === "Einnahme") {
                if (item.typ === "Monatlich") {
                    return total + (item.price * monthCount)
                }
                return total + item.price;
            }
            return total;
        }, 0);
    }

    function rechenallAuszahlungen(){
        return settingsFilteredList.reduce((total, item) => {
            if (item.category === "Ausgabe") {
                if (item.typ === "Monatlich") {
                    return total + (item.price * monthCount)
                }
                return total + item.price;
            }
            return total;
        }, 0);
    }


    const allEinzahlungen = rechenallEinzahlungen();
    const allAuszahlungen = rechenallAuszahlungen();

    const endbestand = bestand + allEinzahlungen + allAuszahlungen;

    {/*
    function AllTable(){
        return(

            <section className="revenueTableWrapper">
                <div className="tableHeader">
                    <h3>Liquiditätsbewegung insgesamt</h3>

                    <button className="tableSwapBtn"
                        onClick={() => setShowFirstTable(!showFirstTable)}
                    >
                        Swap Table
                    </button>
                </div>


                <div className="tableDropdown">
                    <select
                        value={activeCategory}
                        onChange={(e) => {
                            const value = e.target.value;

                            setActiveCategory(value);

                            switch (value) {
                                case "Einnahme":
                                    break;

                                case "Ausgabe":
                                    break;

                                default:
                            }
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Einnahme">Einnahmen</option>
                        <option value="Ausgabe">Ausgaben</option>
                    </select>


                    <select
                        value={activeType}
                        onChange={(e) => {
                            const value = e.target.value;

                            setActiveType(value);

                            switch (value) {
                                case "Monatlich":
                                    break;

                                case "Einmalig":
                                    break;

                                default:
                                    break;
                            }
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Monatlich">Monatlich</option>
                        <option value="Einmalig">Einmalig</option>
                    </select>

                </div>





                <table className="revenueTable">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kategorie</th>
                        <th>Typ</th>
                        <th>Voladate</th>
                        <th>Betrag</th>
                    </tr>
                    </thead>

                    <tbody>
                    {settingsSortedList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.typ}</td>
                            <td>{formatDate(item.datum)}</td>
                            <td className={item.price < 0 ? "negative" : "positive"}>
                                € {item.price}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

        );
    }
    */}


    function MonthTable(){
        return(
            <section className="revenueTableWrapper">

                <div className="tableHeader">
                    <h3>Liquiditätsbewegung von {formatDate(startDate)} bis {formatDate(endDate)}</h3>


                    <div className="tableButtons">
                        <div className="tableDateField">
                            <div>
                                Startdatum festlegen

                            </div>

                            <LiquidDatePicker
                                typeDate={startDate}
                                setTypeDate={setStartDate}
                            />
                        </div>

                        <div className="tableDateField">
                            <div>
                                Enddatum festlegen
                            </div>
                            <LiquidDatePicker
                                typeDate={endDate}
                                setTypeDate={setEndDate}
                            />
                        </div>

                        <div>
                            Anzahl der Monate : {monthCount}
                        </div>

                        <button className="tableSwapBtn"
                                onClick={() => setStartDate(heuteDatum)}
                        >
                            Startdatum: heute
                        </button>

                        <button className="tableSwapBtn"
                                onClick={() => setStartDate(gruendungsDatum)}
                        >
                            Startdatum: gründungstag
                        </button>

                        <button className="tableSwapBtn"
                                onClick={() => setEndDate("2026-12-29")}
                        >
                            Enddatum zurücksetzen
                        </button>

                    </div>

                    {/*
                    <button className="tableSwapBtn"
                        onClick={() => setShowFirstTable(!showFirstTable)}
                    >
                        Swap Table
                    </button>
                    */}

                </div>

                <div className="tableDropdown">
                    <select
                        value={activeCategory}
                        onChange={(e) => {
                            const value = e.target.value;

                            setActiveCategory(value);

                            switch (value) {
                                case "Einnahme":
                                    break;

                                case "Ausgabe":
                                    break;

                                default:
                            }
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Einnahme">Einnahmen</option>
                        <option value="Ausgabe">Ausgaben</option>
                    </select>


                    <select
                        value={activeType}
                        onChange={(e) => {
                            const value = e.target.value;

                            setActiveType(value);

                            switch (value) {
                                case "Monatlich":
                                    break;

                                case "Einmalig":
                                    break;

                                default:
                                    break;
                            }
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Monatlich">Monatlich</option>
                        <option value="Einmalig">Einmalig</option>
                    </select>
                </div>


                <table className="revenueTable">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kategorie</th>
                        <th>Typ</th>
                        <th>Voladate</th>
                        <th>Betrag</th>
                    </tr>
                    </thead>


                    <tbody>
                    {settingsFilteredList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.typ}</td>
                            <td>{formatDate(item.datum)}</td>
                            <td className={item.price < 0 ? "negative" : "positive"}>
                                € {item.price}
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>

            </section>
        );
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
                            <span>alle Einzahlungen von {formatDate(startDate)} bis {formatDate(endDate)}</span>
                            <h2>€ {allEinzahlungen.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="revenueCard">
                        <div>
                            <span>alle Auszahlungen von {formatDate(startDate)} bis {formatDate(endDate)}</span>
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


                <div>
                    {/*
                    {showFirstTable ? <AllTable /> : <MonthTable />}
                    */}
                    <MonthTable />
                </div>



            </main>


        </div>






    );
}