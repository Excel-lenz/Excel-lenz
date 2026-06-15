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

    var allEinzahlungen = rechenallEinzahlungen();

    var allAuszahlungen = rechenallAuszahlungen();

    const cashFlow = einzahlungen - auszahlungen;
    const operativerCF = gewinn + abschreibung;
    const endbestand = bestand + allEinzahlungen + allAuszahlungen;

    const [showFirstTable, setShowFirstTable] = useState(true);


    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("de-DE");
    };



    const sortOrder = {
        Monatlich: 0,
        Einmalig: 1,
    };

    const sortedLiquids = [...liquids].sort((a, b) => {
        if (a.typ === "Monatlich" && b.typ === "Einmalig") return -1;
        if (a.typ === "Einmalig" && b.typ === "Monatlich") return 1;

        if (a.typ === "Einmalig" && b.typ === "Einmalig") {
            return new Date(a.datum) - new Date(b.datum);
        }

        return 0;
    });

    const sortedEinnahmen = sortedLiquids.filter((item) =>{
        return item.category === "Einnahme";
    })

    const sortedAusgaben = sortedLiquids.filter((item) =>{
        return item.category === "Ausgabe";
    })

    const [selectedSortedList, setSelectedSortedList] = useState(sortedLiquids);

    const [nextSelectedSortedList, setNextSelectedSortedList] = useState(selectedSortedList);

    const selectedSortedMonatlich = selectedSortedList.filter((item) =>{
        return item.typ === "Monatlich";
    })

    const selectedSortedEinmalig = selectedSortedList.filter((item) =>{
        return item.typ === "Einmalig";
    })

    const filteredLiquids = sortedLiquids.filter((item) => {
        if (item.typ === "Monatlich") return true;

        if (item.typ === "Einmalig") {
            return item.datum >= startDate && item.datum <= endDate;
        }

        return false;
    });

    const [selectedFilteredList, setSelectedFilteredList] = useState(filteredLiquids);

    const [nextSelectedFilteredList, setNextSelectedFilteredList] = useState(selectedFilteredList);

    const filteredEinnahmen = filteredLiquids.filter((item) =>{
        return item.category === "Einnahme";
    })

    const filteredAusgaben = filteredLiquids.filter((item) =>{
        return item.category === "Ausgabe";
    })

    useEffect(() => {
        setNextSelectedSortedList(selectedSortedList);
    }, [selectedSortedList]);

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


    const [activeCategory, setActiveCategory] = useState("all");
    const [activeType, setActiveType] = useState("all");

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

                {/*
                <div className="tableHeader">
                    <button onClick={() => setSelectedSortedList(sortedLiquids)}>
                        All
                    </button>
                    <button onClick={() => setSelectedSortedList(sortedEinnahmen)}>
                        Einnahmen
                    </button>
                    <button onClick={() => setSelectedSortedList(sortedAusgaben)}>
                        Ausgaben
                    </button>
                </div>
                */}

                <div className="tableHeader">
                    <button className={activeCategory === "all" ? "activeBtn" : ""}
                        onClick={() =>{
                            setActiveCategory("all");
                            setActiveType("all");
                        setSelectedSortedList(sortedLiquids);
                        setNextSelectedSortedList(sortedLiquids);
                    }
                    }>
                        All
                    </button>
                    <button className={activeCategory === "einnahmen" ? "activeBtn" : ""}
                        onClick={() => {
                            setActiveCategory("einnahmen");
                            setActiveType("all");
                        setSelectedSortedList(sortedEinnahmen);
                        setNextSelectedSortedList(sortedEinnahmen);
                    }
                    }>
                        Einnahmen
                    </button>
                    <button className={activeCategory === "ausgaben" ? "activeBtn" : ""}
                        onClick={() => {
                            setActiveCategory("ausgaben");
                            setActiveType("all");
                        setSelectedSortedList(sortedAusgaben);
                        setNextSelectedSortedList(sortedAusgaben);
                    }}>
                        Ausgaben
                    </button>
                </div>

                <div className="tableHeader">
                    <button className={activeType === "all" ? "activeBtn" : ""}
                        onClick={() => {
                            setActiveType("all");
                            setNextSelectedSortedList(selectedSortedList)
                        }}>
                        All
                    </button>
                    <button className={activeType === "monatlich" ? "activeBtn" : ""}
                        onClick={() => {
                        setActiveType("monatlich");
                        setNextSelectedSortedList(selectedSortedMonatlich)
                    }}>
                        Monatlich
                    </button>
                    <button className={activeType === "einmalig" ? "activeBtn" : ""}
                        onClick={() => {
                            setActiveType("einmalig");
                            setNextSelectedSortedList(selectedSortedEinmalig)
                        }}>
                        Einmalig
                    </button>
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
                    {nextSelectedSortedList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.typ}</td>
                            <td>{item.datum}</td>
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
                    </div>

                    <button className="tableSwapBtn"
                        onClick={() => setShowFirstTable(!showFirstTable)}
                    >
                        Swap Table
                    </button>
                </div>

                <div className="tableHeader">
                    <button onClick={() => setSelectedFilteredList(filteredLiquids)}>
                        All
                    </button>
                    <button onClick={() => setSelectedFilteredList(filteredEinnahmen)}>
                        Einnahmen
                    </button>
                    <button onClick={() => setSelectedFilteredList(filteredAusgaben)}>
                        Ausgaben
                    </button>
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
                    {selectedFilteredList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.typ}</td>
                            <td>{item.datum}</td>
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


                <div>
                    {showFirstTable ? <AllTable /> : <MonthTable />}
                </div>



            </main>


        </div>






    );
}