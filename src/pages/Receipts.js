import { useState } from "react";
function Receipts() {

    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const clearFilters = () => {
        setSearchTerm("");
        setFromDate("");
        setToDate("");
    };
    const receipts = [
        {
            receiptNumber: "RCPT001",
            customer: "Rahul Kumar",
            date: "2026-08-13",
            amount: 1800,
            status: "Paid"
        },
        {
            receiptNumber: "RCPT002",
            customer: "Ravi Kumar",
            date: "2026-08-12",
            amount: 2500,
            status: "Pending"
        },
        {
            receiptNumber: "RCPT003",
            customer: "Anil Kumar",
            date: "2026-08-10",
            amount: 950,
            status: "Paid"
        },
        {
            receiptNumber: "RCPT004",
            customer: "Suresh Kumar",
            date: "2026-08-05",
            amount: 1200,
            status: "Paid"
        }
    ];
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
    return (
        <div className="page-content">

            <div className="page-header">

                <div>
                    <h1>Receipts</h1>
                    <p>View and manage your receipts</p>
                </div>

                <button className="primary-button">
                    + Create Receipt
                </button>

            </div>

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

            <div className="receipt-table">

                <div className="receipt-table-header">
                    <span>Receipt No.</span>
                    <span>Customer</span>
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Status</span>
                </div>

                {filteredReceipts.map((receipt) => (
                    <div className="receipt-table-row" key={receipt.receiptNumber}>

                        <span>{receipt.receiptNumber}</span>

                        <span>{receipt.customer}</span>

                        <span>{receipt.date}</span>

                        <span>₹{receipt.amount.toLocaleString("en-IN")}</span>

                        <span>{receipt.status}</span>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default Receipts;