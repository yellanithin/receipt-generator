import { useState } from "react";
import ReceiptPreview from "../components/ReceiptPreview";

function Receipts() {

    // Search and date filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Stores the receipt that the user wants to view
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    //edit receipt
    const [editingReceipt, setEditingReceipt] = useState(null);

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm("");
        setFromDate("");
        setToDate("");
    };

    // Temporary receipt data
    const [receipts, setReceipts] = useState([
        {
            receiptNumber: "RCPT001",
            customer: "Rahul Kumar",
            phone: "9876543210",
            date: "2026-08-13",
            amount: 1800,
            status: "Paid",

            products: [
                {
                    name: "Keyboard",
                    quantity: 1,
                    price: 1200
                },
                {
                    name: "Mouse",
                    quantity: 2,
                    price: 300
                }
            ],

            subtotal: 1800,
            discountAmount: 0,
            taxAmount: 0,
            finalTotal: 1800
        },

        {
            receiptNumber: "RCPT002",
            customer: "Ravi Kumar",
            phone: "9876543211",
            date: "2026-08-12",
            amount: 2500,
            status: "Pending",

            products: [
                {
                    name: "Headphones",
                    quantity: 1,
                    price: 2000
                },
                {
                    name: "USB Cable",
                    quantity: 1,
                    price: 500
                }
            ],

            subtotal: 2500,
            discountAmount: 0,
            taxAmount: 0,
            finalTotal: 2500
        },

        {
            receiptNumber: "RCPT003",
            customer: "Anil Kumar",
            phone: "9876543212",
            date: "2026-08-10",
            amount: 950,
            status: "Paid",

            products: [
                {
                    name: "USB Cable",
                    quantity: 2,
                    price: 250
                },
                {
                    name: "Mouse Pad",
                    quantity: 1,
                    price: 450
                }
            ],

            subtotal: 950,
            discountAmount: 0,
            taxAmount: 0,
            finalTotal: 950
        },

        {
            receiptNumber: "RCPT004",
            customer: "Suresh Kumar",
            phone: "9876543213",
            date: "2026-08-05",
            amount: 1200,
            status: "Paid",

            products: [
                {
                    name: "Keyboard",
                    quantity: 1,
                    price: 1200
                }
            ],

            subtotal: 1200,
            discountAmount: 0,
            taxAmount: 0,
            finalTotal: 1200
        }
    ]);

    // Filter receipts
    const filteredReceipts = receipts.filter((receipt) => {

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            receipt.receiptNumber.toLowerCase().includes(search) ||
            receipt.customer.toLowerCase().includes(search);

        const matchesFromDate =
            !fromDate || receipt.date >= fromDate;

        const matchesToDate =
            !toDate || receipt.date <= toDate;

        return (
            matchesSearch &&
            matchesFromDate &&
            matchesToDate
        );
    });
    const handleEdit = (receipt) => {
        setEditingReceipt({
            ...receipt,

            products: receipt.products.map((product) => ({
                ...product
            }))
        });
    };

    const handleSaveEdit = () => {

        const updatedProducts = editingReceipt.products;

        // Calculate subtotal
        const subtotal = updatedProducts.reduce(
            (total, product) =>
                total + product.quantity * product.price,
            0
        );

        // For now, keep discount and tax unchanged
        const discountAmount = editingReceipt.discountAmount;
        const taxAmount = editingReceipt.taxAmount;

        // Calculate final total
        const finalTotal =
            subtotal - discountAmount + taxAmount;

        const updatedReceipt = {
            ...editingReceipt,
            products: updatedProducts,
            subtotal: subtotal,
            amount: finalTotal,
            finalTotal: finalTotal
        };

        setReceipts((currentReceipts) =>
            currentReceipts.map((receipt) =>
                receipt.receiptNumber === editingReceipt.receiptNumber
                    ? updatedReceipt
                    : receipt
            )
        );

        // Close edit window
        setEditingReceipt(null);
    };

    const handleAddEditProduct = () => {

        const newProduct = {
            name: "",
            quantity: 1,
            price: 0
        };

        setEditingReceipt({
            ...editingReceipt,
            products: [
                ...editingReceipt.products,
                newProduct
            ]
        });
    };

    const handleRemoveEditProduct = (index) => {

        const updatedProducts = editingReceipt.products.filter(
            (_, productIndex) => productIndex !== index
        );

        setEditingReceipt({
            ...editingReceipt,
            products: updatedProducts
        });
    };

    const handleDelete = (receiptNumber) => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${receiptNumber}?`
        );

        if (!confirmDelete) {
            return;
        }

        setReceipts((currentReceipts) =>
            currentReceipts.filter(
                (receipt) =>
                    receipt.receiptNumber !== receiptNumber
            )
        );
    };
    return (
        <div className="page-content">

            {/* Page Header */}
            <div className="page-header">

                <div>
                    <h1>Receipts</h1>
                    <p>View and manage your receipts</p>
                </div>

                <button
                    type="button"
                    className="primary-button"
                >
                    + Create Receipt
                </button>

            </div>


            {/* Filters */}
            <div className="receipt-filters">

                <div className="filter-group search-group">

                    <label>Search</label>

                    <input
                        type="text"
                        placeholder="Search customer or receipt number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>


                <div className="filter-group">

                    <label>From Date</label>

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />

                </div>


                <div className="filter-group">

                    <label>To Date</label>

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />

                </div>


                <button
                    type="button"
                    className="clear-filter-button"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>

            </div>


            {/* Receipt Table */}
            <div className="receipt-table">

                {/* Table Header */}
                <div className="receipt-table-header">

                    <span>Receipt No.</span>
                    <span>Customer</span>
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span>Action</span>

                </div>


                {/* Receipt Rows */}
                {filteredReceipts.length > 0 ? (

                    filteredReceipts.map((receipt) => (

                        <div
                            className="receipt-table-row"
                            key={receipt.receiptNumber}
                        >

                            <span>
                                {receipt.receiptNumber}
                            </span>

                            <span>
                                {receipt.customer}
                            </span>

                            <span>
                                {receipt.date}
                            </span>

                            <span>
                                ₹{receipt.amount.toLocaleString("en-IN")}
                            </span>

                            <span>
                                {receipt.status}
                            </span>

                            <div className="receipt-actions">

                                <button
                                    type="button"
                                    className="view-receipt-button"
                                    onClick={() => setSelectedReceipt(receipt)}
                                >
                                    View
                                </button>

                                <button
                                    type="button"
                                    className="edit-receipt-button"
                                    onClick={() => handleEdit(receipt)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="delete-receipt-button"
                                    onClick={() => handleDelete(receipt.receiptNumber)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="no-receipts">
                        No receipts found.
                    </div>

                )}

            </div>


            {/* Receipt Preview */}
            {selectedReceipt && (

                <div className="receipt-preview-container">

                    <button
                        type="button"
                        className="close-preview-button"
                        onClick={() => setSelectedReceipt(null)}
                    >
                        ✕ Close
                    </button>

                    <ReceiptPreview
                        customerName={selectedReceipt.customer}
                        phone={selectedReceipt.phone}
                        receiptNumber={selectedReceipt.receiptNumber}
                        receiptDate={selectedReceipt.date}
                        paymentStatus={selectedReceipt.status}
                        products={selectedReceipt.products}
                        subtotal={selectedReceipt.subtotal}
                        discountAmount={selectedReceipt.discountAmount}
                        taxAmount={selectedReceipt.taxAmount}
                        finalTotal={selectedReceipt.finalTotal}
                    />

                </div>

            )}
            {editingReceipt && (
                <div className="edit-receipt-overlay">

                    <div className="edit-receipt-modal">

                        <div className="edit-receipt-header">

                            <div>
                                <h2>Edit Receipt</h2>

                                <p>
                                    {editingReceipt.receiptNumber}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="close-modal-button"
                                onClick={() => setEditingReceipt(null)}
                            >
                                ✕
                            </button>

                        </div>


                        <div className="edit-receipt-body">

                            {/* Customer Name */}

                            <div className="form-group">

                                <label>Customer Name</label>

                                <input
                                    type="text"
                                    value={editingReceipt.customer}
                                    onChange={(e) =>
                                        setEditingReceipt({
                                            ...editingReceipt,
                                            customer: e.target.value
                                        })
                                    }
                                />

                            </div>


                            {/* Phone */}

                            <div className="form-group">

                                <label>Phone Number</label>

                                <input
                                    type="tel"
                                    value={editingReceipt.phone}
                                    onChange={(e) =>
                                        setEditingReceipt({
                                            ...editingReceipt,
                                            phone: e.target.value
                                        })
                                    }
                                />

                            </div>


                            {/* Date */}

                            <div className="form-group">

                                <label>Receipt Date</label>

                                <input
                                    type="date"
                                    value={editingReceipt.date}
                                    onChange={(e) =>
                                        setEditingReceipt({
                                            ...editingReceipt,
                                            date: e.target.value
                                        })
                                    }
                                />

                            </div>


                            <h3 className="edit-products-title">
                                Products
                            </h3>

                            <button
                                type="button"
                                className="add-edit-product-button"
                                onClick={handleAddEditProduct}
                            >
                                + Add Product
                            </button>


                            {editingReceipt.products.map((product, index) => (

                                <div
                                    className="edit-product-row"
                                    key={index}
                                >

                                    <div className="form-group">

                                        <label>Product</label>

                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) => {

                                                const updatedProducts = [
                                                    ...editingReceipt.products
                                                ];

                                                updatedProducts[index] = {
                                                    ...updatedProducts[index],
                                                    name: e.target.value
                                                };

                                                setEditingReceipt({
                                                    ...editingReceipt,
                                                    products: updatedProducts
                                                });

                                            }}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>Quantity</label>

                                        <input
                                            type="number"
                                            min="1"
                                            value={product.quantity}
                                            onChange={(e) => {

                                                const updatedProducts = [
                                                    ...editingReceipt.products
                                                ];

                                                updatedProducts[index] = {
                                                    ...updatedProducts[index],
                                                    quantity: Number(e.target.value)
                                                };

                                                setEditingReceipt({
                                                    ...editingReceipt,
                                                    products: updatedProducts
                                                });

                                            }}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>Price</label>

                                        <input
                                            type="number"
                                            min="0"
                                            value={product.price}
                                            onChange={(e) => {

                                                const updatedProducts = [
                                                    ...editingReceipt.products
                                                ];

                                                updatedProducts[index] = {
                                                    ...updatedProducts[index],
                                                    price: Number(e.target.value)
                                                };

                                                setEditingReceipt({
                                                    ...editingReceipt,
                                                    products: updatedProducts
                                                });

                                            }}
                                        />

                                    </div>
                                    <button
                                        type="button"
                                        className="remove-edit-product-button"
                                        onClick={() => handleRemoveEditProduct(index)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}

                        </div>


                        <div className="edit-receipt-actions">

                            <button
                                type="button"
                                className="close-receipt-button"
                                onClick={() => setEditingReceipt(null)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="primary-button"
                                onClick={handleSaveEdit}
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Receipts;