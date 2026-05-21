import React, {useState} from "react";
import "../styles/finanz.css";

//noch nichts wie sidebar und so eingefügt,
//dient bis jetzt einfach nur als vorlage
//Layout, UI, noch nichts konkretes, bis jetzt nur die basic Umsatzechnung


export default function Finanz() {

    const [] = useState();

    //Variablen sind bis jetzt nur als Beispiel mit vorgegebenen Wert


    //Variablen Umsatz
    const [verkauf, setVerkauf] = useState(2000);
    const [preis, setPreis] = useState(25);
    const umsatz = verkauf * preis;
    //const alterUmsatz = ;
    //const umsatzWachstum = ((umsatz - alterUmsatz) / alterUmsatz) * 100;


    //Variablen Kostenplanung
    const [einheitKosten] = useState(20);
    const [prodMengen] = useState(3000);
    const [fixKosten] = useState(5000);
    const varKosten = einheitKosten * prodMengen;
    const gesamtKosten = varKosten + fixKosten;


    //Variablen Gewinn
    const gewinn = umsatz - gesamtKosten;


    //Variablen Kapitalbedarf
    const [eigenKapital] = useState(20);
    const [kapitalBedarf] = useState(3000);

    const fremdKapital = kapitalBedarf - eigenKapital;
    const gesamtKapital = eigenKapital + fremdKapital


    return (
        <div className="vbox">
            <h1 className="title">Finanzen</h1>


            {/* UMSATZ SEKTION */}
            <section>
                <h1>Umsatz</h1>
                <h2 className="smalltitle">pro Monat: </h2>
                <div className="hbox">
                    <div className="eingabe box">
                        Verkaufseinheiten: {verkauf}
                    </div>
                    <div className="eingabe box">
                        Preis: {preis}€
                    </div>
                </div>
                <div className="berechnet box">
                    Umsatz: {umsatz}€
                </div>
                <div className="platzhalter">füge hier Umsatzdiagramm ein</div>
            </section>


            {/* KOSTEN SEKTION */}
            <section>
                <h1>Kosten</h1>
                <h2 className="smalltitle">pro Monat: </h2>
                <div className="hbox">
                    <div className="eingabe box">
                        Kosten je Einheit: {einheitKosten}
                    </div>
                    <div className="eingabe box">
                        produzierte Mengen: {prodMengen}
                    </div>
                </div>
                <div className="hbox">
                    <div className="berechnet box">
                        Variable Kosten: {varKosten}
                    </div>
                    <div className="eingabe box">
                        Fixkosten: {fixKosten}
                    </div>
                </div>
                <div className="berechnet box">
                    Gesamtkosten: {gesamtKosten}€
                </div>

                <div className="platzhalter">hier komm Stuff oder so noch rein</div>

            </section>


            <section>
                <h1>Gewinn</h1>
                <div className="berechnet box">
                    Gewinn: {gewinn}€
                </div>
            </section>



            <section>
                <h1>Kapitalbedarf</h1>
            </section>


            <section>
                <h1>Finanzierung</h1>
            </section>


            <section>
                <h1>Rentabilität</h1>
            </section>


            <section>
                <h1>Liquidität</h1>
            </section>



        </div>

    );
}
