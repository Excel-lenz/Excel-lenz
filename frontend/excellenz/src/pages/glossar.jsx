import React, { useMemo, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar.jsx";
import "../styles/pages/dashboard.css";
import "../styles/pages/glossar.css";

const glossarData = [
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Umsatz",
    definition: "Die Gesamtheit aller Einnahmen eines Unternehmens innerhalb eines bestimmten Zeitraums.",
  },
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Kosten",
    definition: "Der finanzielle Aufwand, der fuer die Produktion von Guetern oder Dienstleistungen entsteht.",
  },
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Liquiditaet",
    definition: "Die Faehigkeit eines Unternehmens, seinen Zahlungsverpflichtungen fristgerecht nachzukommen.",
  },
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Fixkosten",
    definition: "Kosten, die unabhaengig von der Produktionsmenge konstant bleiben (z. B. Miete).",
  },
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Variable Kosten",
    definition: "Kosten, die sich mit der Produktionsmenge veraendern (z. B. Rohstoffe).",
  },
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Deckungsbeitrag",
    definition: "Der Betrag, der zur Deckung der Fixkosten zur Verfuegung steht (Umsatz minus variable Kosten).",
  },
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Gewinn und Verlust (GuV)",
    definition: "Die Gegenueberstellung aller Einnahmen und Ausgaben zur Berechnung des finanziellen Erfolgs.",
  },
  {
    category: "Allgemeine Finanzbegriffe",
    term: "Abschreibungen",
    definition: "Die Erfassung der Wertminderung von langlebigen Vermoegenswerten ueber die Zeit.",
  },
  {
    category: "Dashboard",
    term: "Was ist ein Streak?",
    definition: "Die Anzahl der aufeinanderfolgenden Tage oder Wochen, an denen Ziele aktiv erreicht wurden.",
  },
  {
    category: "Dashboard",
    term: "Was sind kritische Hinweise?",
    definition: "Automatisierte Warnungen im System, wenn KPIs oder Budgets Meilensteine verfehlen.",
  },
  {
    category: "Dashboard",
    term: 'Was bedeutet "Auf Kurs"?',
    definition: "Statusanzeige, dass das aktuelle Wachstum den gesetzten Zielen entspricht.",
  },
  {
    category: "Finanzplanung",
    term: "Break-even-Point",
    definition: "Der Punkt, an dem Einnahmen und Gesamtkosten gleich sind. Ab hier wird Gewinn erzielt.",
  },
  {
    category: "Liquiditaet",
    term: "Liquiditaetsplanung",
    definition: "Die Planung von Zahlungsstroemen, um Liquiditaetsengpaesse und Insolvenzen zu vermeiden.",
  },
  {
    category: "Investitionen",
    term: "Kapitalbedarf",
    definition: "Die Summe an finanziellen Mitteln, die fuer Gruendung oder Erweiterung benoetigt wird.",
  },
  {
    category: "Investitionen",
    term: "Finanzierungsplanung",
    definition: "Die Festlegung, wie der Kapitalbedarf gedeckt wird (Eigenkapital versus Fremdkapital).",
  },
];

const categories = [
  "Alle",
  "Allgemeine Finanzbegriffe",
  "Dashboard",
  "Finanzplanung",
  "Liquiditaet",
  "Investitionen",
];

export default function Glossar({
  sidebarOpen,
  setSidebarOpen,
  salesOpen,
  setSalesOpen,
  financeOpen,
  setFinanceOpen,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredGlossar = useMemo(() => {
    return glossarData.filter((item) => {
      const matchesCategory = selectedCategory === "Alle" || item.category === selectedCategory;
      const query = searchTerm.toLowerCase();
      const matchesSearch = item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="layout">
      <Topbar />
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        salesOpen={salesOpen}
        setSalesOpen={setSalesOpen}
        financeOpen={financeOpen}
        setFinanceOpen={setFinanceOpen}
      />

      <main className="main glossar-main">
        <header className="header glossar-header">
          <div>
            <h1 className="title">Hilfe und Dokumentation</h1>
            <p className="subtitle">Durchsuche Fachbegriffe und Systemfunktionen von Excellenz.</p>
          </div>
          <input
            className="glossar-search"
            type="text"
            placeholder="Begriff suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>

        <section className="glossar-grid">
          <aside className="progressSection glossar-categories">
            <p className="glossar-categories-title">Kategorien</p>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`glossar-category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenIndex(null);
                }}
              >
                {category}
              </button>
            ))}
          </aside>

          <section className="glossar-list">
            {filteredGlossar.length === 0 && (
              <div className="chartCard glossar-empty">Keine passenden Begriffe gefunden.</div>
            )}

            {filteredGlossar.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={`${item.term}-${index}`} className="chartCard glossar-item">
                  <button
                    type="button"
                    className="glossar-item-trigger"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div>
                      <span className="glossar-badge">{item.category}</span>
                      <h3 className="glossar-item-title">{item.term}</h3>
                    </div>
                    <span className={`glossar-arrow ${isOpen ? "open" : ""}`}>▼</span>
                  </button>

                  {isOpen && <p className="glossar-definition">{item.definition}</p>}
                </article>
              );
            })}
          </section>
        </section>
      </main>
    </div>
  );
}
