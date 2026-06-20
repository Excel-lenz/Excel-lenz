import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/sales/products.css"
import {FaEuroSign, FaPlus} from "react-icons/fa";
import Card from "../../components/Card";




export default function Sales({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}) {
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([]);

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
        setProducts(
            products.map((product) =>
                product.id === editingId
                    ? {
                          ...product,
                          name: productName,
                          price,
                          description,
                      }
                    : product
            )
        );
    } else {
        const newProduct = {
            id: Date.now(),
            name: productName,
            price,
            description,
        };

        setProducts([...products, newProduct]);
    }

    setProductName("");
    setPrice("");
    setDescription("");
    setEditingId(null);
    setShowForm(false);
};
const handleEdit = (product) => {
    setProductName(product.name);
    setPrice(product.price);
    setDescription(product.description);

    setEditingId(product.id);
    setShowForm(true);
};
const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
};
    return(
        
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
                                    <p>
                                        !
                                    </p>
                                </div>
            
                                <button
    className="addProdBtn"
    onClick={() => setShowForm(true)}
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
                <strong>Preis:</strong> {product.price} €
            </p>

            <p>{product.description}</p>

            <div className="cardActions">
                <button
                    className="editBtn"
                    onClick={() => handleEdit(product)}
                >
                    Bearbeiten
                </button>

                <button
                    className="deleteBtn"
                    onClick={() => handleDelete(product.id)}
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
            <h2>Neues Produkt hinzufügen</h2>

            <form onSubmit={handleSubmit}>
    <div className="formGroup">
        <label>Produktname</label>
        <input
            type="text"
            placeholder="z.B. Gaming Maus"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
        />
    </div>


    <div className="formGroup">
        <label>Preis (€)</label>
        <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
        />
    </div>

    <div className="formGroup">
        <label>Beschreibung</label>
        <textarea
            placeholder="Produktbeschreibung..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </div>

    <div className="modalActions">
        <button
            type="button"
            onClick={() => setShowForm(false)}
        >
            Abbrechen
        </button>

        <button type="submit">
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