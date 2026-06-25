import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar.jsx";
import "../../styles/pages/sales/sales.css";
import { deleteSale, getSales, updateSale } from "../../api/sales/salesAPI";
import { formatCurrency } from "../../utils/currency.jsx";
import { useCurrencySettings } from "../../context/currencySettingsContext.jsx";

const parseDateValue = (value) => {
    if (!value) return null;
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

    if (typeof value === "string") {
        const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (dateOnly) {
            const year = Number(dateOnly[1]);
            const month = Number(dateOnly[2]);
            const day = Number(dateOnly[3]);
            const localDate = new Date(year, month - 1, day);

            if (
                localDate.getFullYear() === year &&
                localDate.getMonth() === month - 1 &&
                localDate.getDate() === day
            ) {
                return localDate;
            }

            return null;
        }
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toInputDate = (value) => {
    const date = parseDateValue(value);
    if (!date) return "";
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const formatDate = (value) => {
    const date = parseDateValue(value);
    return date ? date.toLocaleDateString("de-DE") : "-";
};

export default function Sales({ sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen }) {
    const { currencySettings } = useCurrencySettings();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [editingSale, setEditingSale] = useState(null);
    const [editName, setEditName] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editQuantity, setEditQuantity] = useState("");
    const [editTaxRate, setEditTaxRate] = useState("");
    const [editDate, setEditDate] = useState("");

    const loadSales = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getSales();

            const normalized = Array.isArray(data) ? data : [];
            normalized.sort((a, b) => {
                const aDate = parseDateValue(a?.date || a?.created_at)?.getTime() || 0;
                const bDate = parseDateValue(b?.date || b?.created_at)?.getTime() || 0;
                return bDate - aDate;
            });

            setSales(normalized);
        } catch (err) {
            console.error("Failed loading sales:", err);
            setError("Sales konnten nicht geladen werden.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSales();
    }, []);

    const categories = useMemo(() => {
        const values = new Set();
        sales.forEach((sale) => {
            if (sale?.category) values.add(sale.category);
        });
        return ["all", ...Array.from(values).sort((a, b) => a.localeCompare(b))];
    }, [sales]);

    const filteredSales = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        const fromTime = parseDateValue(dateFrom)?.getTime() || null;
        const toTime = parseDateValue(dateTo)?.getTime() || null;

        return sales.filter((sale) => {
            const saleDate = parseDateValue(sale?.date || sale?.created_at);
            const saleTime = saleDate?.getTime() || null;

            const matchesSearch =
                query.length === 0 ||
                String(sale?.name || "").toLowerCase().includes(query) ||
                String(sale?.category || "").toLowerCase().includes(query) ||
                String(sale?.transaction_ID || "").toLowerCase().includes(query);

            const matchesCategory = categoryFilter === "all" || sale?.category === categoryFilter;
            const matchesFrom = fromTime === null || (saleTime !== null && saleTime >= fromTime);
            const matchesTo = toTime === null || (saleTime !== null && saleTime <= toTime);

            return matchesSearch && matchesCategory && matchesFrom && matchesTo;
        });
    }, [sales, searchText, categoryFilter, dateFrom, dateTo]);

    const handleEditClick = (sale) => {
        setEditingSale(sale);
        setEditName(sale?.name || "");
        setEditCategory(sale?.category || "");
        setEditPrice(String(sale?.price ?? ""));
        setEditQuantity(String(sale?.quantity ?? 1));
        setEditTaxRate(String(sale?.tax_rate ?? 0));
        setEditDate(toInputDate(sale?.date || sale?.created_at));
    };

    const closeEditModal = () => {
        setEditingSale(null);
        setEditName("");
        setEditCategory("");
        setEditPrice("");
        setEditQuantity("");
        setEditTaxRate("");
        setEditDate("");
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        if (!editingSale?.id) return;

        const payload = {
            name: editName.trim(),
            category: editCategory.trim(),
            type: "income",
            price: Number(editPrice),
            quantity: parseInt(editQuantity, 10),
            tax_rate: Number(editTaxRate || 0),
        };

        if (editDate) {
            payload.date = new Date(`${editDate}T12:00:00`).toISOString();
        }

        try {
            await updateSale(editingSale.id, payload);
            closeEditModal();
            await loadSales();
        } catch (err) {
            console.error("Failed updating sale:", err);
            alert("Sale konnte nicht bearbeitet werden.");
        }
    };

    const handleDelete = async (saleId) => {
        if (!window.confirm("Moechtest du diesen Sale wirklich loeschen?")) {
            return;
        }

        try {
            await deleteSale(saleId);
            await loadSales();
        } catch (err) {
            console.error("Failed deleting sale:", err);
            alert("Sale konnte nicht geloescht werden.");
        }
    };

    const resetFilters = () => {
        setSearchText("");
        setCategoryFilter("all");
        setDateFrom("");
        setDateTo("");
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

            <main className="salesMain">
                <header className="salesHeader">
                    <div>
                        <h1>Sales</h1>
                    </div>
                </header>

                <section className="salesTableWrapper">
                    <div className="salesToolbar">
                        <input
                            className="salesSearchInput"
                            type="text"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                            placeholder="Suche nach Name, Kategorie oder TX-ID"
                        />

                        <select
                            className="salesFilterSelect"
                            value={categoryFilter}
                            onChange={(event) => setCategoryFilter(event.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === "all" ? "Alle Kategorien" : category}
                                </option>
                            ))}
                        </select>

                        <input
                            className="salesDateInput"
                            type="date"
                            value={dateFrom}
                            onChange={(event) => setDateFrom(event.target.value)}
                        />

                        <input
                            className="salesDateInput"
                            type="date"
                            value={dateTo}
                            onChange={(event) => setDateTo(event.target.value)}
                        />

                        <button className="salesGhostBtn" type="button" onClick={resetFilters}>
                            Filter zuruecksetzen
                        </button>
                    </div>

                    {error && <p className="salesError">{error}</p>}

                    <div className="salesTableMeta">
                        <span>{filteredSales.length} Treffer</span>
                        <button className="salesGhostBtn" type="button" onClick={loadSales}>
                            Neu laden
                        </button>
                    </div>

                    <div className="salesTableScroll">
                        <table className="salesTable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Kategorie</th>
                                    <th>Preis</th>
                                    <th>Menge</th>
                                    <th>Steuer %</th>
                                    <th>Gesamt</th>
                                    <th>Datum</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={8} className="salesEmptyState">Lade Sales...</td>
                                    </tr>
                                ) : filteredSales.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="salesEmptyState">Keine Sales fuer diese Filter gefunden.</td>
                                    </tr>
                                ) : (
                                    filteredSales.map((sale) => {
                                        const total = Number(sale?.price || 0) * Number(sale?.quantity || 0);

                                        return (
                                            <tr key={sale.id}>
                                                <td>{sale.name || "-"}</td>
                                                <td>{sale.category || "-"}</td>
                                                <td>{formatCurrency(sale.price, currencySettings, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                <td>{sale.quantity ?? "-"}</td>
                                                <td>{Number(sale.tax_rate || 0).toFixed(2)}</td>
                                                <td className="salesTotal">{formatCurrency(total, currencySettings, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                <td>{formatDate(sale.date || sale.created_at)}</td>
                                                <td>
                                                    <div className="salesRowActions">
                                                        <button type="button" className="salesEditBtn" onClick={() => handleEditClick(sale)}>
                                                            Bearbeiten
                                                        </button>
                                                        <button type="button" className="salesDeleteBtn" onClick={() => handleDelete(sale.id)}>
                                                            Loeschen
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {editingSale && (
                    <div className="salesModalOverlay">
                        <div className="salesModal">
                            <h2>Sale bearbeiten</h2>
                            <form onSubmit={handleEditSubmit}>
                                <div className="salesFormGrid">
                                    <label>
                                        Name
                                        <input type="text" value={editName} onChange={(event) => setEditName(event.target.value)} required />
                                    </label>

                                    <label>
                                        Kategorie
                                        <input type="text" value={editCategory} onChange={(event) => setEditCategory(event.target.value)} required />
                                    </label>

                                    <label>
                                        Preis
                                        <input type="number" step="0.01" min="0" value={editPrice} onChange={(event) => setEditPrice(event.target.value)} required />
                                    </label>

                                    <label>
                                        Menge
                                        <input type="number" min="1" step="1" value={editQuantity} onChange={(event) => setEditQuantity(event.target.value)} required />
                                    </label>

                                    <label>
                                        Steuersatz (%)
                                        <input type="number" step="0.01" min="0" value={editTaxRate} onChange={(event) => setEditTaxRate(event.target.value)} />
                                    </label>

                                    <label>
                                        Datum
                                        <input type="date" value={editDate} onChange={(event) => setEditDate(event.target.value)} />
                                    </label>
                                </div>

                                <div className="salesModalActions">
                                    <button type="button" className="salesGhostBtn" onClick={closeEditModal}>
                                        Abbrechen
                                    </button>
                                    <button type="submit" className="salesSaveBtn">
                                        Speichern
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}