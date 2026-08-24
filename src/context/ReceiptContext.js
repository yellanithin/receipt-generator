import { createContext, useContext, useState } from "react";

const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {

    // Load receipts from localStorage when the app starts
    const [receipts, setReceipts] = useState(() => {
        const savedReceipts = localStorage.getItem("receipts");

        return savedReceipts
            ? JSON.parse(savedReceipts)
            : [];
    });

    // Save receipts to localStorage
    const saveToLocalStorage = (updatedReceipts) => {
        localStorage.setItem(
            "receipts",
            JSON.stringify(updatedReceipts)
        );
    };

    // Add a new receipt
    const addReceipt = (receipt) => {

        setReceipts((currentReceipts) => {

            const updatedReceipts = [
                ...currentReceipts,
                receipt
            ];

            saveToLocalStorage(updatedReceipts);

            return updatedReceipts;
        });
    };

    // Update an existing receipt
    const updateReceipt = (updatedReceipt) => {

        setReceipts((currentReceipts) => {

            const updatedReceipts = currentReceipts.map(
                (receipt) =>
                    receipt.receiptNumber ===
                    updatedReceipt.receiptNumber
                        ? updatedReceipt
                        : receipt
            );

            saveToLocalStorage(updatedReceipts);

            return updatedReceipts;
        });
    };

    // Delete receipt
    const deleteReceipt = (receiptNumber) => {

        setReceipts((currentReceipts) => {

            const updatedReceipts = currentReceipts.filter(
                (receipt) =>
                    receipt.receiptNumber !== receiptNumber
            );

            saveToLocalStorage(updatedReceipts);

            return updatedReceipts;
        });
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