import { createContext, useContext, useState } from "react";

const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {

    const [receipts, setReceipts] = useState([]);

    // Add a new receipt
    const addReceipt = (receipt) => {
        setReceipts((currentReceipts) => [
            ...currentReceipts,
            receipt
        ]);
    };

    // Update an existing receipt
    const updateReceipt = (updatedReceipt) => {
        setReceipts((currentReceipts) =>
            currentReceipts.map((receipt) =>
                receipt.receiptNumber === updatedReceipt.receiptNumber
                    ? updatedReceipt
                    : receipt
            )
        );
    };

    // Delete receipt
    const deleteReceipt = (receiptNumber) => {
        setReceipts((currentReceipts) =>
            currentReceipts.filter(
                (receipt) =>
                    receipt.receiptNumber !== receiptNumber
            )
        );
    };

    return (
        <ReceiptContext.Provider
            value={{
                receipts,
                addReceipt,
                updateReceipt,
                deleteReceipt
            }}
        >
            {children}
        </ReceiptContext.Provider>
    );
}

export function useReceipts() {
    return useContext(ReceiptContext);
}