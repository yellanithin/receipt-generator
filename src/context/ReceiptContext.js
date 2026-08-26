import { createContext, useContext, useState } from "react";

const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {

    const [receipts, setReceipts] = useState(() => {
        const savedReceipts = localStorage.getItem("receipts");

        return savedReceipts
            ? JSON.parse(savedReceipts)
            : [];
    });

    const [lastReceiptNumber, setLastReceiptNumber] = useState(() => {
        const savedNumber =
            localStorage.getItem("lastReceiptNumber");

        return savedNumber ? Number(savedNumber) : 0;
    });

    const generateReceiptNumber = () => {
        const nextNumber = lastReceiptNumber + 1;

        return `RCPT${String(nextNumber).padStart(3, "0")}`;
    };

    const saveToLocalStorage = (updatedReceipts) => {
        localStorage.setItem(
            "receipts",
            JSON.stringify(updatedReceipts)
        );
    };

    const addReceipt = (receipt) => {

        setReceipts((currentReceipts) => {

            const updatedReceipts = [
                ...currentReceipts,
                receipt
            ];

            saveToLocalStorage(updatedReceipts);

            return updatedReceipts;
        });

        const nextNumber = lastReceiptNumber + 1;

        setLastReceiptNumber(nextNumber);

        localStorage.setItem(
            "lastReceiptNumber",
            nextNumber.toString()
        );
    };

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
                deleteReceipt,
                generateReceiptNumber
            }}
        >
            {children}
        </ReceiptContext.Provider>
    );
}

export function useReceipts() {
    return useContext(ReceiptContext);
}