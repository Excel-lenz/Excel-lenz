import "../../styles/pages/sales/products.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Card from "../../components/Card";
import Sidebar from "../../components/sidebar.jsx";

// ===== CHANGED =====
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../api/products/productsAPI";
import Input from "../../components/inputs.jsx";

export default function Sales({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen
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


    useEffect(() => {
        const load = async () => {
            const data = await getProducts();
            setProducts(data);
        };

        load();
    }, []);


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


    const handleEdit = (product) => {

        setProductName(product.name);
        setPrice(product.price);
        setDescription(product.description);

        setEditingId(product.id);

        setShowForm(true);
    };


    const handleDelete = async (id) => {


        if (
            !window.confirm(
                "Produkt wirklich löschen?"
            )
        ) {
            return;
        }

        try {
            await deleteProduct(id);
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
            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
            />

            <main className="prodMain">

                <header className="prodHeader">

                    <div>
                        <h1>Products</h1>
                        <p>!</p>
                    </div>

                    <button
                        className="addProdBtn"
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