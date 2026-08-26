import { useState, useEffect } from "react";
import ReceiptPreview from "../components/ReceiptPreview";
import { useReceipts } from "../context/ReceiptContext";

function CreateReceipt() {
    const { addReceipt,generateReceiptNumber } = useReceipts();
    const [products, setProducts] = useState([]);

    const [discount, setDiscount] = useState(0);

    const [tax, setTax] = useState(0);

    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [receiptNumber, setReceiptNumber] = useState("");
    const [receiptDate, setReceiptDate] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("Paid");

    useEffect(() => {
        setReceiptNumber(generateReceiptNumber());
    }, [generateReceiptNumber]);
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

    const validateReceipt = () => {
        if (!customerName.trim()) {
            alert("Please enter customer name.");
            return false;
        }

        if (!phone.trim()) {
            alert("Please enter phone number.");
            return false;
        }

        if (!receiptDate) {
            alert("Please select receipt date.");
            return false;
        }

        if (products.length === 0) {
            alert("Please add at least one product.");
            return false;
        }

        for (const product of products) {
            if (!product.name.trim()) {
                alert("Please enter product name.");
                return false;
            }

            if (product.quantity <= 0) {
                alert("Quantity must be greater than 0.");
                return false;
            }

            if (product.price < 0) {
                alert("Price cannot be negative.");
                return false;
            }
        }

        return true;
    };

    const saveReceipt = () => {
        const isValid = validateReceipt();

        if (!isValid) {
            return;
        }

        const newReceipt = {
            receiptNumber,
            customer: customerName,
            phone,
            date: receiptDate,
            amount: finalTotal,
            status: paymentStatus,
            discount,
            tax,
            products: products.map((product) => ({
                name: product.name,
                quantity: product.quantity,
                price: product.price
            })),

            subtotal,
            discountAmount,
            taxAmount,
            finalTotal
        };

        addReceipt(newReceipt);

        alert("Receipt saved successfully!");
    };

    const printReceipt = () => {
        window.print();
    };

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
                            value={receiptNumber}
                            onChange={(e) => setReceiptNumber(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Receipt Date</label>
                        <input
                            type="date"
                            value={receiptDate}
                            onChange={(e) => setReceiptDate(e.target.value)}
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
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Payment Status</label>

                        <select
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                        >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
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
                                    min="0"
                                    step="0.01"
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

                <div className="create-receipt-actions">

                    <button
                        type="button"
                        className="add-product-button"
                        onClick={addProduct}
                    >
                        + Add Product
                    </button>

                    <button
                        type="button"
                        className="save-receipt-button"
                        onClick={saveReceipt}
                    >
                        Save Receipt
                    </button>

                    <button
                        type="button"
                        className="print-button"
                        onClick={printReceipt}
                    >
                        🖨️ Print Receipt
                    </button>

                </div>

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

            <ReceiptPreview
                customerName={customerName}
                phone={phone}
                receiptNumber={receiptNumber}
                receiptDate={receiptDate}
                paymentStatus={paymentStatus}
                products={products}
                subtotal={subtotal}
                discountAmount={discountAmount}
                taxAmount={taxAmount}
                finalTotal={finalTotal}
            />

        </div>
    );
}

export default CreateReceipt;