import React, { useState, useEffect } from "react";
import "../styles/components/input.css";
import { getTransactions, createTransaction } from "../api/inputs/inputAPI";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getProducts } from "../api/products/productAPI";

export default function Input( {onCreated} ) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [entryType, setEntryType] = useState("");
    const [mouseX, setMouseX] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState(new Date());
    const [taxRate, setTaxRate] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [manualProduct, setManualProduct] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouseX(e.clientX);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.log("Failed loading products", err);
            }
        };

        load();
    }, []);

    const threshold = window.innerWidth - 200;

    const opacity =
        mouseX < threshold
            ? 0
            : Math.min((mouseX - threshold) / 200, 1);

    if (minimized) {
        return (
            <div
                className="restoreArrow"
                onClick={() => setMinimized(false)}>
                ◀
            </div>
        );
    }


    return (
        <>
            {!menuOpen && (
                <div className="inputButtonContainer">
                    <button
                        className="inputButton"
                        onClick={() => setMenuOpen(true)}>
                        Input
                    </button>

                    <button
                        className="minimizeButton"
                        onClick={() => setMinimized(true)}>
                        ×
                    </button>

                </div>
            )}

            {menuOpen && (
                <div className="inputMenu">

                    <div className="menuHeader">

                        <h3>Input</h3>

                        <button
                            className="closeButton"
                            onClick={() => setMenuOpen(false)}
                        >
                            ×
                        </button>

                    </div>

                    <label>Art</label>

                    <select

                        value={entryType}
                        onChange={(e) => setEntryType(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="income">Einnahmen</option>
                        <option value="expense">Ausgaben</option>
                        <option value="product">Product Sales</option>
                    </select>

                    {entryType === "income" && (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <ReactDatePicker
                                selected={date}
                                onChange={(selectedDate) => setDate(selectedDate)}
                                dateFormat="dd.MM.yyyy"
                            />

                            <input
                                type="text"
                                placeholder="Kategorie"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Preis"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Steuersatz (%)"
                                value={taxRate}
                                onChange={(e) => setTaxRate(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Anzahl"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />

                        </>
                    )}

                    {entryType === "expense" && (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <ReactDatePicker
                                selected={date}
                                onChange={(selectedDate) => setDate(selectedDate)}
                                dateFormat="dd.MM.yyyy"
                            />

                            <input
                                type="text"
                                placeholder="Kategorie"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Preis"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Steuersatz (%)"
                                value={taxRate}
                                onChange={(e) => setTaxRate(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Anzahl"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </>
                    )}

                    {entryType === "product" && (
                        <>
                            {manualProduct && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Kategorie"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Preis"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Steuersatz (%)"
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(e.target.value)}
                                    />
                                </>
                            )}
                            <select
                                value={selectedProduct?.id || ""}
                                onChange={(e) => {

                                    if (e.target.value === "manual") {

                                        setManualProduct(true);
                                        setSelectedProduct(null);
                                        setName("");
                                        setCategory("");
                                        setPrice("");
                                        setTaxRate("");
                                        return;
                                    }

                                    setManualProduct(false);

                                    const product = products.find(
                                        (p) => p.id === parseInt(e.target.value)
                                    );

                                    setSelectedProduct(product || null);

                                    if (product) {
                                        setName(product.name);
                                        setCategory(product.category);
                                        setPrice(product.price);
                                        setTaxRate(product.tax_rate);

                                    }
                                }}
                            >
                                <option value="" hidden>
                                    Select Product
                                </option>

                                <option value="manual">
                                    ➕ Create Manually
                                </option>

                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            <ReactDatePicker
                                selected={date}
                                onChange={(selectedDate) => setDate(selectedDate)}
                                dateFormat="dd.MM.yyyy"
                            />

                            <input
                                type="number"
                                placeholder="Anzahl"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </>
                    )}

                    <button
                        className="confirmButton"
                        onClick={async () => {
                            try {
                                let payload;

                                if (entryType === "product") {

                                    if (manualProduct) {

                                        payload = {
                                            name,
                                            category,
                                            type: "income",
                                            price: parseFloat(price),
                                            quantity: parseInt(quantity || 1),
                                            tax_rate: parseFloat(taxRate || 0),
                                            date: date.toISOString(),
                                        };

                                    } else {

                                        payload = {
                                            product: selectedProduct.id,
                                            name: selectedProduct.name,
                                            category: selectedProduct.category,
                                            type: "income",
                                            price: parseFloat(selectedProduct.price),
                                            quantity: parseInt(quantity || 1),
                                            tax_rate: parseFloat(selectedProduct.tax_rate || 0),
                                            date: date.toISOString(),
                                        };

                                    }

                                } else {
                                    payload = {
                                        name,
                                        category,
                                        type: entryType,
                                        price: parseFloat(price),
                                        quantity: parseInt(quantity || 1),
                                        tax_rate: parseFloat(taxRate || 0),
                                        date: date.toISOString(),
                                    };
                                }

                                await createTransaction(payload);

                                setMenuOpen(false);
                                await onCreated();

                                setCategory("");
                                setPrice("");
                                setQuantity("");
                                setName("");
                                setTaxRate("");
                                setSelectedProduct(null);
                                setDate(new Date());

                            } catch (err) {
                                console.log(err.response?.data || err);
                            }
                        }}
                    >
                        Confirm
                    </button>

                </div>
            )}
        </>
    );
}