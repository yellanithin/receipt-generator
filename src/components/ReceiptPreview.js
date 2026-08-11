function ReceiptPreview() {

    return (
        <div className="receipt-preview">

            <div className="receipt-header">

                <h1>ABC COMPUTERS</h1>

                <p>Computer Accessories</p>

            </div>

            <div className="receipt-info">

                <p>
                    <strong>Receipt No:</strong> RCPT001
                </p>

                <p>
                    <strong>Date:</strong> 11-08-2026
                </p>

            </div>

            <div className="customer-info">

                <h3>Customer</h3>

                <p>Nitin Kumar</p>

                <p>9876543210</p>

            </div>

            <div className="receipt-items">

                <div className="receipt-item header">

                    <span>Product</span>
                    <span>Qty</span>
                    <span>Price</span>
                    <span>Total</span>

                </div>

                <div className="receipt-item">

                    <span>Keyboard</span>
                    <span>2</span>
                    <span>₹500</span>
                    <span>₹1000</span>

                </div>

                <div className="receipt-item">

                    <span>Mouse</span>
                    <span>1</span>
                    <span>₹800</span>
                    <span>₹800</span>

                </div>

            </div>

            <div className="receipt-summary">

                <div>
                    <span>Subtotal</span>
                    <strong>₹1800.00</strong>
                </div>

                <div>
                    <span>Discount</span>
                    <strong>-₹180.00</strong>
                </div>

                <div>
                    <span>Tax</span>
                    <strong>+₹81.00</strong>
                </div>

                <div className="receipt-total">
                    <span>TOTAL</span>
                    <strong>₹1701.00</strong>
                </div>

            </div>

            <div className="receipt-footer">

                <p>Thank You!</p>

            </div>

        </div>
    );
}

export default ReceiptPreview;