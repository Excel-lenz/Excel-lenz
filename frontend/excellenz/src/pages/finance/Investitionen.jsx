import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { FaWallet, FaChartLine, FaHourglassHalf, FaCoins, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from "../../components/sidebar";
import "./Investitionen.css";

export default function Investitionen({ sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen }) {

    // 1. Initialer State mit Status-Werten
    const [investments, setInvestments] = useState([
        { id: 1, category: 'Produktentwicklung', desc: 'Platform-Features', cost: 43900, date: '01.01.2026', status: 'Abgeschlossen' },
        { id: 2, category: 'Marketing', desc: 'Kampagnen Q1-Q2', cost: 31350, date: '15.01.2026', status: 'In Bearbeitung' },
        { id: 3, category: 'Infrastruktur', desc: 'Cloud Server', cost: 25100, date: '01.02.2026', status: 'Geplant' },
        { id: 4, category: 'Personal', desc: 'Neueinstellungen', cost: 12540, date: '01.03.2026', status: 'Geplant' },
    ]);

    // Form State erweitert um 'status'
    const [formData, setFormData] = useState({ category: 'Produktentwicklung', cost: '', date: '', desc: '', status: 'Geplant' });

// Berechnung der Gesamtkosten
    const totalCost = investments.reduce((sum, item) => sum + Number(item.cost), 0);

    // --- Dynamische ROI-Berechnung basierend auf dem Projekt-Mix (Excel-Lenz Logic) ---
    const categoryRoiRates = {
        'Produktentwicklung': 0.22, // 22% Erwarteter ROI
        'Marketing': 0.26,          // 26% Erwarteter ROI
        'Infrastruktur': 0.12,       // 12% Erwarteter ROI
        'Personal': 0.16             // 16% Erwarteter ROI
    };

    const totalWeightedRoi = investments.reduce((sum, item) => {
        const rate = categoryRoiRates[item.category] || 0.15;
        return sum + (item.cost * rate);
    }, 0);

    // Berechnet den exakten ROI-Prozentsatz live basierend auf den Tabelleneinträgen
    const dynamicRoi = totalCost > 0 ? (totalWeightedRoi / totalCost) * 100 : 0;
    // Löschfunktion für die Tabelle (Dynamische Aktualisierung)
    const handleDelete = (id) => {
        setInvestments(investments.filter(item => item.id !== id));
    };

    // --- Dynamische Berechnungen für die Finanzsimulation ---
    const baselineCost = 112890;
    const scalingFactor = totalCost > 0 ? totalCost / baselineCost : 0;

    // Dynamische Daten für das Liniendiagramm (Break-Even-Analyse)
    const breakEvenData = [
        { name: 'Monat 0', Gesamtkosten: Math.round(30000 * scalingFactor), Einnahmen: 0 },
        { name: 'Monat 6', Gesamtkosten: Math.round(50000 * scalingFactor), Einnahmen: Math.round(35000 * scalingFactor) },
        { name: 'Monat 12', Gesamtkosten: Math.round(70000 * scalingFactor), Einnahmen: Math.round(75000 * scalingFactor) },
        { name: 'Monat 18', Gesamtkosten: Math.round(90000 * scalingFactor), Einnahmen: Math.round(120000 * scalingFactor) },
        { name: 'Monat 24', Gesamtkosten: Math.round(110000 * scalingFactor), Einnahmen: Math.round(170000 * scalingFactor) },
    ];

    // Erwarteter Gewinn berechnet sich dynamisch basierend auf den Gesamtkosten
    const dynamicProfit = scalingFactor > 0 ? Math.round(68250 * scalingFactor) : 0;

    // Dynamische Daten für das Kreisdiagramm (Kapitalverteilung)
    const categoriesMap = investments.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.cost;
        return acc;
    }, {});

    const pieData = Object.keys(categoriesMap).map(key => ({ name: key, value: categoriesMap[key] }));
    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

    const handleInsert = (e) => {
        e.preventDefault();
        if (!formData.cost || !formData.date) return;

        const newItem = {
            id: Date.now(), // Eindeutige ID generieren
            category: formData.category,
            desc: formData.desc || 'Keine Beschreibung',
            cost: parseFloat(formData.cost),
            date: formData.date.split('-').reverse().join('.'),
            status: formData.status
        };

        setInvestments([...investments, newItem]);
        setFormData({ category: 'Produktentwicklung', cost: '', date: '', desc: '', status: 'Geplant' });
    };

    // Helper-Funktion für das Styling der Status Badges
    const getStatusBadgeClass = (status) => {
        if (status === 'Abgeschlossen') return 'badge-abgeschlossen';
        if (status === 'In Bearbeitung') return 'badge-bearbeitung';
        return 'badge-geplant';
    };

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

            <main className="main">
                <header className="header">
                    <div>
                        <h1 className="title">Investitionen</h1>
                        <p className="subtitle font-german">Live-Analyse und Budgetplanung aller Ausgaben</p>
                    </div>
                </header>

                {/* KPI KARTEN - Dynamische Live-Daten */}
                <section className="invest-kpi-grid">
                    <div className="invest-kpi-card">
                        <div className="invest-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}><FaWallet size={20} /></div>
                        <div className="invest-kpi-info">
                            <p>Investitionskosten</p>
                            <h3>€ {totalCost.toLocaleString('de-DE')}</h3>
                        </div>
                    </div>
                    <div className="invest-kpi-card">
                        <div className="invest-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399' }}><FaChartLine size={20} /></div>
                        <div className="invest-kpi-info">
                            <p>Erwarteter ROI</p>
                            {/* Zeigt den exakten, dynamisch berechneten ROI-Wert an */}
                            <h3>{dynamicRoi.toFixed(1)}%</h3>
                        </div>
                    </div>
                    <div className="invest-kpi-card">
                        <div className="invest-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa' }}><FaHourglassHalf size={20} /></div>
                        <div className="invest-kpi-info">
                            <p>Break-Even</p>
                            <h3>{totalCost > 0 ? "14 Monate" : "0 Monate"}</h3>
                        </div>
                    </div>
                    <div className="invest-kpi-card">
                        <div className="invest-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' }}><FaCoins size={20} /></div>
                        <div className="invest-kpi-info">
                            <p>Erwarteter Gewinn</p>
                            {/* Hier wird der Gewinn jetzt live aktualisiert */}
                            <h3>€ {dynamicProfit.toLocaleString('de-DE')}</h3>
                        </div>
                    </div>
                </section>

                {/* DIAGRAMME */}
                <section className="invest-main-grid">
                    <div className="invest-section-card" style={{ gridColumn: 'span 2' }}>
                        <h4>Break-Even-Analyse</h4>
                        <div style={{ height: '240px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={breakEvenData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222235" />
                                    <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '11px' }} />
                                    <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#161622', borderColor: '#222235', color: '#fff' }} />
                                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                    <Line type="monotone" dataKey="Gesamtkosten" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="Einnahmen" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="invest-section-card">
                        <h4>Kapitalverteilung</h4>
                        <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* FORMULAR & TABELLE */}
                <section className="invest-main-grid">
                    <div className="invest-section-card">
                        <h4>Zukünftige Investitionen planen</h4>
                        <form onSubmit={handleInsert} className="invest-form">
                            <div className="invest-form-group">
                                <label>Kategorie</label>
                                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="invest-field">
                                    <option value="Produktentwicklung">Produktentwicklung</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Infrastruktur">Infrastruktur</option>
                                    <option value="Personal">Personal</option>
                                </select>
                            </div>
                            <div className="invest-form-group">
                                <label>Geplante Kosten (€)</label>
                                <input type="number" required placeholder="z.B. 15000" value={formData.cost} onChange={(e) => setFormData({...formData, cost: e.target.value})} className="invest-field" />
                            </div>
                            <div className="invest-form-group">
                                <label>Geplanter Zeitpunkt</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="tt.mm.jjjj"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    onFocus={(e) => (e.target.type = 'date')}
                                    onBlur={(e) => { if(!e.target.value) e.target.type = 'text' }}
                                    className="invest-field"
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                            {/* NEU: Status-Auswahl im Formular */}
                            <div className="invest-form-group">
                                <label>Status</label>
                                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="invest-field">
                                    <option value="Geplant">Geplant</option>
                                    <option value="In Bearbeitung">In Bearbeitung</option>
                                    <option value="Abgeschlossen">Abgeschlossen</option>
                                </select>
                            </div>
                            <div className="invest-form-group">
                                <label>Beschreibung</label>
                                <textarea rows="2" placeholder="Kurzbeschreibung..." value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="invest-field" style={{ resize: 'none' }}></textarea>
                            </div>
                            <button type="submit" className="invest-submit-btn">
                                <FaPlus size={12} /> Simulation starten
                            </button>
                        </form>
                    </div>

                    <div className="invest-section-card" style={{ gridColumn: 'span 2' }}>
                        <div>
                            <h4>Investitions-Tabelle</h4>
                            <div className="invest-table-container">
                                <table className="invest-data-table">
                                    <thead>
                                    <tr>
                                        <th>Kategorie</th>
                                        <th>Beschreibung</th>
                                        <th style={{ textAlign: 'center' }}>Status</th>
                                        <th style={{ textAlign: 'right' }}>Kosten</th>
                                        <th style={{ textAlign: 'center' }}>Startdatum</th>
                                        <th style={{ textAlign: 'center' }}>Aktion</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {investments.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ color: '#10b981', fontWeight: '500' }}>{item.category}</td>
                                            <td style={{ color: '#94a3b8' }}>{item.desc}</td>
                                            {/* NEU: Status Badge */}
                                            <td style={{ textAlign: 'center' }}>
                          <span className={`invest-badge ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                                            </td>
                                            <td style={{ textAlign: 'right', fontWeight: '600' }}>€ {item.cost.toLocaleString('de-DE')}</td>
                                            <td style={{ textAlign: 'center', color: '#94a3b8' }}>{item.date}</td>
                                            {/* NEU: Lösch-Button */}
                                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <button onClick={() => handleDelete(item.id)} className="invest-delete-btn" title="Löschen">
                                                    <FaTrash size={13} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="invest-total-row">
                            <span style={{ color: '#94a3b8' }}>Gesamt</span>
                            <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>€ {totalCost.toLocaleString('de-DE')}</span>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}