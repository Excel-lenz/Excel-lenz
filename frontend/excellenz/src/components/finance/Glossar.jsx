import React, { useState } from 'react';


const glossarData = [
    // 1. Allgemeine Finanzbegriffe
    { term: 'Umsatz', category: 'Allgemeine Finanzbegriffe', definition: 'Der gesamte Geldbetrag, den ein Unternehmen durch den Verkauf von Produkten oder Dienstleistungen in einem bestimmten Zeitraum einnimmt (vor Abzug von Kosten oder Steuern).' },
    { term: 'Kosten', category: 'Allgemeine Finanzbegriffe', definition: 'Alle finanziellen Aufwendungen und Ausgaben, die ein Unternehmen für den laufenden Betrieb, die Produktion und den Vertrieb von Waren oder Dienstleistungen tätigen muss.' },
    { term: 'Liquidität', category: 'Allgemeine Finanzbegriffe', definition: 'Die Verfügbarkeit von genügend flüssigen Mitteln (Bargeld, Bankguthaben), damit das Unternehmen all seine fälligen Zahlungsverpflichtungen, wie Rechnungen, Gehälter und Steuern, jederzeit rechtzeitig bezahlen kann.' },
    { term: 'Fixkosten', category: 'Allgemeine Finanzbegriffe', definition: 'Kosten, die jeden Monat konstant bleiben, unabhängig von deinem Umsatz oder Produktionsvolumen (z. B. Büromiete, Gehälter, Software-Abos).' },
    { term: 'Variable Kosten', category: 'Allgemeine Finanzbegriffe', definition: 'Kosten, die sich proportional zum Umsatz oder Produktionsvolumen verändern (z. B. Rohstoffe, Material, Produktionskosten, Versand).' },
    { term: 'Deckungsbeitrag', category: 'Allgemeine Finanzbegriffe', definition: 'Der Geldbetrag, der nach Abzug der variablen Kosten übrig bleibt, um die Fixkosten des Unternehmens zu decken. Formel: Deckungsbeitrag = Umsatz - variable Kosten.' },
    { term: 'Gewinn & Verlust (GuV)', category: 'Allgemeine Finanzbegriffe', definition: 'Die finale Gegenüberstellung aller Einnahmen und Ausgaben, um den finanziellen Erfolg (Netto-Gewinn oder Verlust) des Unternehmens zu berechnen. Formel: Gewinn = Deckungsbeitrag - Fixkosten.' },
    { term: 'Abschreibungen', category: 'Allgemeine Finanzbegriffe', definition: 'Die rechnerische Erfassung der Wertminderung von langlebigen Vermögensgegenständen (z. B. Maschinen, Computer) über deren normale Nutzungsdauer.' },

    // 2. Dashboard
    { term: 'Was ist ein Streak?', category: 'Dashboard', definition: 'Ein Gamification-Feature, das die tägliche und regelmäßige Dateneingabe des Nutzers belohnt, um die Motivation langfristig zu steigern.' },
    { term: 'Was sind kritische Hinweise?', category: 'Dashboard', definition: 'Eine optische Hervorhebung von kritischen Finanzwerten (z. B. drohende Engpässe) direkt auf dem Dashboard durch Signalfarben zur Risikominimierung.' },
    { term: 'Was bedeutet "Auf Kurs"?', category: 'Dashboard', definition: 'Ein positiver Statusindikator auf dem Dashboard, der anzeigt, dass die aktuellen Ist-Werte die gesetzten Budgetziele erfolgreich erreichen.' },

    // 3. Finanzplanung
    { term: 'Break-even-Point (Erfolgsgrenze)', category: 'Finanzplanung', definition: 'Der Punkt, an dem Umsatz und Gesamtkosten exakt gleich sind. Ab diesem Moment erwirtschaftet dein Unternehmen Gewinne. Formel: Break-even-Point = Fixkosten / (Preis - variable Kosten je Einheit).' },

    // 4. Liquidität
    { term: 'Liquiditätsplanung', category: 'Liquidität', definition: 'Die vorausschauende Überwachung des Cashflows und der verfügbaren Mittel am Periodenende, um finanzielle Engpässe frühzeitig zu erkennen und zu vermeiden.' },

    // 5. Investitionen
    { term: 'Kapitalbedarf', category: 'Investitionen', definition: 'Die Summe an finanziellen Mitteln, die für den Start und die erste laufende Betriebsphase des Unternehmens benötigt wird (Investitionen + laufende Kosten + Sicherheitspuffer).' },
    { term: 'Finanzierungsplanung', category: 'Investitionen', definition: 'Die Planung und Strukturierung der Finanzierungsquellen (Eigenkapital und Fremdkapital), um den ermittelten Kapitalbedarf vollständig zu decken.' },
    { term: 'Eigenkapital', category: 'Investitionen', definition: 'Das eigene Geld, das die Gründer oder Gesellschafter selbst in das Unternehmen einbringen und das nicht von Banken oder fremden Dritten stammt.' },
    { term: 'Kredit (Fremdkapital)', category: 'Investitionen', definition: 'Ein Geldbetrag, den sich das Unternehmen von einer Bank oder einem externen Geldgeber leiht und der über einen bestimmten Zeitraum mit Zinsen zurückgezahlt werden muss.' },
    { term: 'Rentabilität (ROI)', category: 'Investitionen', definition: 'Eine Kennzahl, die das Verhältnis zwischen dem eingesetzten Kapital (Investitionen) und dem erzielten Gewinn und die Wirtschaftlichkeit des Unternehmens misst.' },

    // 6. Einstellungen
    { term: 'Wirtschaftssektoren', category: 'Einstellungen', definition: 'Aufteilung in Primärer Sektor (Urproduktion wie Landwirtschaft), Sekundärer Sektor (Industrie und Verarbeitung) und Tertiärer Sektor (Dienstleistungen, Software, Handel).' },
    { term: 'Rechtsform', category: 'Einstellungen', definition: 'Der rechtliche Rahmen eines Unternehmens (z. B. GmbH, UG, Einzelunternehmen), der die persönliche Haftung und die steuerlichen Pflichten regelt.' },

    // 7. Produkte & Sales
    { term: 'Warenbestand (Inventar)', category: 'Produkte & Sales', definition: 'Alle Produkte, Materialien und Rohstoffe, die aktuell im Lager liegen und für den Verkauf oder die Produktion bereitstehen.' },
    { term: 'Kunden-Verlustquote (Churn Rate)', category: 'Produkte & Sales', definition: 'Der Prozentsatz der Kunden, die innerhalb eines bestimmten Zeitراums die Dienstleistung kündigen oder nicht mehr bei dir einkaufen.' },
    { term: 'Wiederkaufrate (Retention Rate)', category: 'Produkte & Sales', definition: 'Der Prozentsatz der Kunden, die nach ihrem ersten Kauf erneut bei deinem Unternehmen bestellen.' }
];

export default function Glossar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState(null);


    const filteredGlossar = glossarData.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto text-slate-100 min-h-screen bg-[#021a14]">
            {/* Titel */}
            <h1 className="text-3xl font-extrabold mb-2 text-[#00f574]">Hilfe & Glossar</h1>
            <p className="text-slate-400 mb-8 text-sm">Erklärungen zu den wichtigsten Begriffen und Funktionen von Excel-Lenz.</p>

            {/* Suchfunktion Input */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Nach Begriffen oder Kategorien suchen..."
                    className="w-full p-4 rounded-xl bg-[#032920] border border-[#004433] text-white placeholder-slate-500 focus:outline-none focus:border-[#00f574] focus:ring-1 focus:ring-[#00f574] transition-all shadow-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
                {filteredGlossar.length > 0 ? (
                    filteredGlossar.map((item, index) => (
                        <div key={index} className="bg-[#032920]/60 border border-[#004433]/80 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
                            <button
                                className="w-full p-4 flex justify-between items-center bg-[#032920] hover:bg-[#053d30] transition-colors text-left"
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="flex items-center space-x-3 gap-2">
                  <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-[#021a14] text-[#00f574] border border-[#004433]">
                    {item.category}
                  </span>
                                    <span className="font-semibold text-white tracking-wide">{item.term}</span>
                                </div>
                                <span className={`text-xs transition-transform duration-200 ${openIndex === index ? 'text-[#00f574] rotate-180' : 'text-slate-400'}`}>
                  ▼
                </span>
                            </button>

                            {/* Definition Text (Ausklappbar) */}
                            {openIndex === index && (
                                <div className="p-5 bg-[#021a14]/40 border-t border-[#004433] text-slate-300 text-sm leading-relaxed">
                                    {item.definition}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500 text-center py-6">Keine passenden Begriffe gefunden.</p>
                )}
            </div>
        </div>
    );
}