import React, { useState } from "react";

const glossarData = [
    { category: "Allgemeine Finanzbegriffe", term: "Umsatz", definition: "Die Gesamtheit aller Einnahmen eines Unternehmen innerhalb eines bestimmten Zeitraums." },
    { category: "Allgemeine Finanzbegriffe", term: "Kosten", definition: "Der finanzielle Aufwand, der für die Produktion von Gütern oder Dienstleistungen entsteht." },
    { category: "Allgemeine Finanzbegriffe", term: "Liquidität", definition: "Die Fähigkeit eines Unternehmens, seinen Zahlungsverpflichtungen fristgerecht nachkommen." },
    { category: "Allgemeine Finanzbegriffe", term: "Fixkosten", definition: "Kosten, die unabhängig von der Produktionsmenge konstant bleiben (z. B. Miete)." },
    { category: "Allgemeine Finanzbegriffe", term: "Variable Kosten", definition: "Kosten, die sich mit der Produktionsmenge verändern (z. B. Rohstoffe)." },
    { category: "Allgemeine Finanzbegriffe", term: "Deckungsbeitrag", definition: "Der Betrag, der zur Deckung der Fixkosten zur Verfügung steht (Umsatz minus variable Kosten)." },
    { category: "Allgemeine Finanzbegriffe", term: "Gewinn & Verlust (GuV)", definition: "Die finale Gegenüberstellung aller Einnahmen und Ausgaben, um den finanziellen Erfolg zu berechnen." },
    { category: "Allgemeine Finanzbegriffe", term: "Abschreibungen", definition: "Die Erfassung der Wertminderung von langlebigen Vermögenswerten über die Zeit." },
    { category: "Dashboard", term: "Was ist ein Streak?", definition: "Die Anzahl der aufeinanderfolgenden Wochen oder Tage, an denen Ziele aktiv erreicht wurden." },
    { category: "Dashboard", term: "Was sind kritische Hinweise?", definition: "Automatisierte Warnungen im System, wenn KPIs oder Budgets Meilensteine verfehlen." },
    { category: "Dashboard", term: "Was bedeutet \"Auf Kurs\"?", definition: "Statusanzeige, dass das aktuelle Wachstum den gesetzten Jahres- und Monatszielen entspricht." },
    { category: "Finanzplanung", term: "Break-even-Point (Erfolgsgrenze)", definition: "Der Punkt, an dem Einnahmen und Gesamtkosten gleich sind – ab hier macht man Gewinn." },
    { category: "Liquidität", term: "Liquiditätsplanung", definition: "Die vراشحة Kalkulation von Zahlungsströmen, um Insolvenzen zu verhindern." },
    { category: "Investitionen", term: "Kapitalbedarf", definition: "Die Summe an finanziellen Mitteln, die für die Gründung oder Erweiterung benötigt wird." },
    { category: "Investitionen", term: "Finanzierungsplanung", definition: "Die Festlegung, wie der Kapitalbedarf gedeckt wird (Eigenkapital vs. Fremdkapital)." }
];

const categories = ["Alle", "Allgemeine Finanzbegriffe", "Dashboard", "Finanzplanung", "Liquidität", "Investitionen"];

export default function Glossar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Alle");
    const [openIndex, setOpenIndex] = useState(null);

    // تصفية ذكية بناءً على الفئة المختارة + نص البحث
    const filteredGlossar = glossarData.filter((item) => {
        const matchesCategory = selectedCategory === "Alle" || item.category === selectedCategory;
        const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ padding: "40px", maxWidth: "1400px", margin: "0 auto", color: "#f1f5f9", fontFamily: "sans-serif" }}>

            {/* الهيدر العلوي الذكي */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "40px", borderBottom: "1px solid #004433", paddingBottom: "24px" }}>
                <div>
                    <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: 0, color: "#00e676", letterSpacing: "-0.5px" }}>Hilfe & Dokumentation</h1>
                    <p style={{ color: "#a0aec0", marginTop: "6px", fontSize: "16px" }}>Durchsuchen Sie Fachbegriffe und Systemfunktionen von Excel-Lenz.</p>
                </div>

                {/* شريط البحث المطور */}
                <div style={{ position: "relative", minWidth: "350px" }}>
                    <input
                        type="text"
                        placeholder="Suchen Sie nach Begriffen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "14px 20px",
                            borderRadius: "12px",
                            border: "1px solid #004433",
                            backgroundColor: "#032920",
                            color: "#ffffff",
                            fontSize: "15px",
                            outline: "none",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
                        }}
                    />
                </div>
            </div>

            {/* لوحة التقسيم الاحترافية (Sidebar + Main Grid) */}
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "40px", alignItems: "start" }}>

                {/* القائمة الجانبية للفئات (Navigation) */}
                <div style={{ backgroundColor: "#021a14", padding: "20px", borderRadius: "16px", border: "1px solid #004433", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#a0aec0", textTransform: "uppercase", marginBottom: "12px", paddingLeft: "8px", trackingWide: "1px" }}>Kategorien</h3>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setOpenIndex(null); }}
                            style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: selectedCategory === cat ? "600" : "400",
                                backgroundColor: selectedCategory === cat ? "#00e676" : "transparent",
                                color: selectedCategory === cat ? "#021a14" : "#cbd5e1",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* شبكة عرض المصطلحات الاحترافية (Main Display) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {filteredGlossar.length > 0 ? (
                        filteredGlossar.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    style={{
                                        borderRadius: "14px",
                                        border: "1px solid #004433",
                                        backgroundColor: "#032920",
                                        overflow: "hidden",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "22px 24px",
                                            backgroundColor: "transparent",
                                            border: "none",
                                            color: "#ffffff",
                                            cursor: "pointer",
                                            textAlign: "left"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#00e676", backgroundColor: "#021a14", padding: "5px 12px", borderRadius: "6px", textTransform: "uppercase" }}>
                        {item.category}
                      </span>
                                            <span style={{ fontWeight: "600", fontSize: "18px" }}>{item.term}</span>
                                        </div>
                                        <span style={{ fontSize: "16px", color: "#00e676", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      ▼
                    </span>
                                    </button>

                                    {/* صندوق الشرح المنسدل بتصميم غني وعميق */}
                                    {isOpen && (
                                        <div style={{ padding: "24px", backgroundColor: "#021a14", borderTop: "1px solid #004433", color: "#cbd5e1", fontSize: "16px", lineHeight: "1.7", letterSpacing: "0.2px" }}>
                                            <strong style={{ color: "#00e676", display: "block", marginBottom: "6px" }}>Definition:</strong>
                                            {item.definition}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: "center", color: "#a0aec0", padding: "60px", border: "1px dashed #004433", borderRadius: "16px", backgroundColor: "#032920" }}>
                            <p style={{ fontSize: "16px" }}>Keine passenden Begriffe gefunden.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}