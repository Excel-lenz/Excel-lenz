import React, { useState, useEffect } from "react"; // ===== CHANGED =====
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/sales/products.css";
import { FaPlus } from "react-icons/fa";
import Card from "../../components/Card";


// ===== CHANGED =====
import {
    getProducts,
    createProduct,
    updateProduct,   // ===== NEW =====
    deleteProduct,   // ===== NEW =====
} from "../../api/products/productAPI";
import Input from "../../components/inputs.jsx";

export default function Sales({
                              }) {

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [productCategory, setProductCategory] = useState("");
    const [taxRate, setTaxRate] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    // =====================================================
    // ===== NEW =====
    // Load products from Django
    // =====================================================
    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error(
                "Failed loading products:",
                err
            );
        }
    };

    // =====================================================
    // ===== NEW =====
    // Load products when component mounts
    // =====================================================
    useEffect(() => {
        const load = async () => {
            const data = await getProducts();
            setProducts(data);
        };

        load();
    }, []);

    // =====================================================
    // ===== CHANGED =====
    // Create + Update support
    // =====================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editingId) {

                await updateProduct(
                    editingId,
                    {
                        name: productName,
                        price: parseFloat(price),   // ✅ HERE
                        description,
                    }
                );

                await loadProducts();

            } else {

                await createProduct({
                    name: productName,
                    price: parseFloat(price),
                    description,
                    category: productCategory,      // NEW
                    tax_rate: parseFloat(taxRate),  // NEW
                });

                await loadProducts();
            }

            setProductName("");
            setPrice("");
            setDescription("");
            setEditingId(null);
            setShowForm(false);

        } catch (err) {
            console.error("FULL ERROR:", err.response?.data || err);
            alert(JSON.stringify(err.response?.data));
        }
    };

    // =====================================================
    // Existing edit handler
    // =====================================================
    const handleEdit = (product) => {

        setProductName(product.name);
        setPrice(product.price);
        setDescription(product.description);

        setEditingId(product.id);

        setShowForm(true);
    };

    // =====================================================
    // ===== CHANGED =====
    // Delete from Django
    // =====================================================
    const handleDelete = async (id) => {

        // ===== NEW =====
        if (
            !window.confirm(
                "Produkt wirklich löschen?"
            )
        ) {
            return;
        }

        try {

            // ===== NEW =====
            await deleteProduct(id);

            // ===== NEW =====
            await loadProducts();

        } catch (err) {

            console.error(
                "Failed deleting product:",
                err
            );

        }
    };

    return (

        <div className="layout">


            <main className="prodMain">

                <header className="prodHeader">

                    <div>
                        <h1>Products</h1>
                        <p>!</p>
                    </div>

                    <button
                        className="addProdBtn"

                        // ===== CHANGED =====
                        onClick={() => {

                            setEditingId(null);

                            setProductName("");
                            setPrice("");
                            setDescription("");

                            setShowForm(true);
                        }}
                    >
                        <FaPlus />
                        Neues Produkt
                    </button>

                </header>

                <div className="productsGrid">

                    {products.map((product) => (

                        <Card
                            key={product.id}
                            title={product.name}
                        >

                            <p>
                                <strong>Preis:</strong>{" "}
                                {product.price} €
                            </p>

                            <p>
                                {product.description}
                            </p>

                            <div className="cardActions">

                                <button
                                    className="editBtn"
                                    onClick={() =>
                                        handleEdit(product)
                                    }
                                >
                                    Bearbeiten
                                </button>

                                <button
                                    className="deleteBtn"
                                    onClick={() =>
                                        handleDelete(
                                            product.id
                                        )
                                    }
                                >
                                    Löschen
                                </button>

                            </div>

                        </Card>

                    ))}

                </div>

                {showForm && (

                    <div className="modalOverlay">

                        <div className="modal">

                            {/* ===== CHANGED ===== */}
                            <h2>
                                {editingId
                                    ? "Produkt bearbeiten"
                                    : "Neues Produkt hinzufügen"}
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="formGroup">

                                    <label>
                                        Produktname
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="z.B. Gaming Maus"
                                        value={productName}
                                        onChange={(e) =>
                                            setProductName(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="formGroup">

                                    <label>
                                        Preis (€)
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="formGroup">
                                    <label>
                                        Kategorie
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Kategorie"
                                        value={productCategory}
                                        onChange={(e) => setProductCategory(e.target.value)}
                                    />
                                </div>

                                <div className="formGroup">
                                    <label>
                                        Steuersatz (%)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Steuersatz (%)"
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(e.target.value)}
                                    />
                                </div>

                                <div className="formGroup">

                                    <label>
                                        Beschreibung
                                    </label>

                                    <textarea
                                        placeholder="Produktbeschreibung..."
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="modalActions">

                                    <button
                                        type="button"
                                        onClick={() => {

                                            setShowForm(
                                                false
                                            );

                                            // ===== NEW =====
                                            setEditingId(
                                                null
                                            );

                                        }}
                                    >
                                        Abbrechen
                                    </button>

                                    <button
                                        type="submit"
                                    >
                                        {/* ===== CHANGED ===== */}
                                        {editingId
                                            ? "Aktualisieren"
                                            : "Speichern"}
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