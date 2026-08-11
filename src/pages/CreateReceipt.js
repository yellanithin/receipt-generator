import { useState } from "react";

import ReceiptPreview from "../components/ReceiptPreview";

function CreateReceipt() {
    const [products, setProducts] = useState([]);

    const [discount, setDiscount] = useState(0);

    const [tax, setTax] = useState(0);

    //add a new product
    const addProduct = () => {
        const newProduct = {
            name: "",
            quantity: 1,
            price: 0
        };

        setProducts([...products, newProduct]);
    };

    // Update product information
    const updateProduct = (index, field, value) => {
        const updatedProducts = [...products];

        updatedProducts[index][field] = value;

        setProducts(updatedProducts);
    };

    // Remove product
    const removeProduct = (index) => {

        const updatedProducts = products.filter(
            (_, productIndex) => productIndex !== index
        );

        setProducts(updatedProducts);
    };

    // Calculate total price of all products
    const subtotal = products.reduce((total, product) => {
        return total + product.quantity * product.price;
    }, 0);

    const discountAmount = (subtotal * discount) / 100;

    const totalAfterDiscount = subtotal - discountAmount;

    const taxAmount = (totalAfterDiscount * tax) / 100;

    const finalTotal = totalAfterDiscount + taxAmount;

    return (
        <div className="page-content">

            <div className="page-header">
                <div>
                    <h1>Create Receipt</h1>
                    <p>Create a new receipt for your customer</p>
                </div>
            </div>

            <div className="receipt-form">

                <h2>Receipt Details</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Receipt Number</label>
                        <input
                            type="text"
                            value="RCPT001"
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Receipt Date</label>
                        <input
                            type="date"
                        />
                    </div>

                </div>

                <h2>Customer Details</h2>

                <div className="form-row">

                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            placeholder="Enter customer name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                        />
                    </div>

                </div>

                <h2>Products</h2>


                <div className="product-list">

                    {products.map((product, index) => (
                        <div className="product-row" key={index}>

                            <div className="form-group">
                                <label>Product Name</label>

                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    value={product.name}
                                    onChange={(e) =>
                                        updateProduct(index, "name", e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>

                                <input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) =>
                                        updateProduct(index, "quantity", Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Price (₹)</label>

                                <input
                                    type="number"
                                    min=""
                                    value={product.price}
                                    onChange={(e) =>
                                        updateProduct(index, "price", Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Total</label>

                                <input
                                    type="text"
                                    value={`₹${(product.quantity * product.price).toFixed(2)}`}
                                    readOnly
                                />
                            </div>

                            <button
                                type="button"
                                className="remove-product"
                                onClick={() => removeProduct(index)}
                            >
                                Remove
                            </button>

                        </div>
                    ))}

                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={addProduct}
                >
                    + Add Product
                </button>

                <div className="receipt-summary">

                    <div className="summary-row">
                        <span>Subtotal</span>

                        <strong>
                            ₹{subtotal.toFixed(2)}
                        </strong>
                    </div>

                    <div className="summary-row discount-row">

                        <label>Discount (%)</label>

                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                        />

                    </div>

                    <div className="summary-row">
                        <span>Discount Amount</span>

                        <strong>
                            -₹{discountAmount.toFixed(2)}
                        </strong>
                    </div>

                    <div className="summary-row discount-row">

                        <label>Tax (%)</label>

                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={tax}
                            onChange={(e) => setTax(Number(e.target.value))}
                        />

                    </div>

                    <div className="summary-row">
                        <span>Tax Amount</span>

                        <strong>
                            +₹{taxAmount.toFixed(2)}
                        </strong>
                    </div>

                    <div className="summary-row final-row">
                        <span>Final Total</span>

                        <strong>
                            ₹{finalTotal.toFixed(2)}
                        </strong>
                    </div>

                </div>

            </div>

            <ReceiptPreview />

        </div>
    );
}

export default CreateReceipt;