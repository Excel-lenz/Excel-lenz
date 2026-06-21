import React, { useState } from "react";
import Sidebar from "C:\\Users\\Minh Quan Nguyen\\Documents\\GitHub\\Excel-lenz\\frontend\\excellenz\\src\\components\\sidebar.jsx";

import {
  FaPlus,
  FaEuroSign,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";

import "C:\\Users\\Minh Quan Nguyen\\Documents\\GitHub\\Excel-lenz\\frontend\\excellenz\\src\\styles\\pages\\costs.css";

export default function Costs({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}) 
{

  const [typ, setTyp] = useState("monatlich");

  const [miete, setMiete] = useState(60);
  const [nebenkosten, setNebenkosten] = useState(7);
  const [gehalt, setGehalt] = useState(342);
  const [sonstigeFixkosten, setSonstigeFixkosten] = useState(23);
  const [einheit, setEinheit] = useState(34);
  const [menge, setMenge] = useState(99);

  const fixkostenMonatlich = miete + nebenkosten + gehalt + sonstigeFixkosten;

  const variableKostenMonatlich = einheit * menge;

  const faktor = typ === "jährlich" ? 12 : 1;

  const fixkostenGesamt = fixkostenMonatlich * faktor;

  const variableKostenGesamt = variableKostenMonatlich * faktor;

  const gesamtkosten = fixkostenGesamt + variableKostenGesamt;
  
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

      <main className="costsMain">

        <header className="costsHeader">
          <div>
            <h1>Kostenplanung</h1>  
          </div>
        </header>

        <div className="kostenplanung">
          <header className="header">
            <div className="toggle">
              <button className={`tab ${typ === "monatlich" ? "active" : ""}`} 
              onClick={() => setTyp("monatlich")}>Monatlich</button>

              <button className={`tab ${typ === "jaehrlich" ? "active" : ""}`}
              onClick={() => setTyp("jaehrlich")}>Jährlich</button>
            </div>
          </header>

          <div className="cardsEingaben">
            <div className="fixkosten">
              <div className="costsCard">
                <h2>Fixkosten</h2>
                <br></br>

                <div className="inputGrid">
                  <div className="inputGroup">
                    <span>Miete </span>
                    
                    <input type="number" value={miete} onChange={(e) => setMiete(Number(e.target.value))}></input>
                    <br></br>
                  </div>


                  <div className="inputGroup">
                    <span>Nebenkosten </span>
                    
                    <input type="number" value={nebenkosten} onChange={(e) => setNebenkosten(Number(e.target.value))}></input>
                    <br></br>
                  </div>

                  <div className="inputGroup">
                    <span>Gehalt </span>
                    
                    <input type="number" value={gehalt} onChange={(e) => setGehalt(Number(e.target.value))}></input>
                    <br></br>
                  </div>

                  <div className="inputGroup">
                    <span>sonstige Fixkosten </span>
                    
                    <input type="number" value={sonstigeFixkosten} onChange={(e) => setSonstigeFixkosten(Number(e.target.value))}></input>
                  </div>

                </div>

              </div>
            </div>

            <div className="variableKosten">
              <div className="costsCard">
                <h2>Variable Kosten</h2>
                <br></br>
                <span>Einheit </span>
                <br></br>
                <input type="number" value={einheit} onChange={(e) => setEinheit(Number(e.target.value))}></input>
                <br></br>
                <br></br>
                
                <span>Menge </span>
                <br></br>
                <input type="number" value={menge} onChange={(e) => setMenge(Number(e.target.value))}></input>
              </div>

            </div>
          </div>

          <section className="cardsAusgaben">
            <div className="costsCard resultCard">
              <span>Fixkosten ({typ === "monatlich" ? "Monat" : "Jahr"})</span>
              <h2>{fixkostenGesamt.toLocaleString("de-DE")} €</h2>
            </div>

            <div className="costsCard resultCard">
              <span>Variable Kosten ({typ === "monatlich" ? "Monat" : "Jahr"})</span>
              <h2>{variableKostenGesamt.toLocaleString("de-DE")} €</h2>
            </div>

            <div className="costsCard resultCard">
              <span>Gesamtkosten ({typ === "monatlich" ? "Monat" : "Jahr"})</span>
              <h2>{gesamtkosten.toLocaleString("de-DE")} €</h2>
            </div>
          </section>

        </div>

      </main>
    </div>

  )

}