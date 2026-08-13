function ReceiptPreview({
    customerName,
    phone,
    receiptNumber,
    receiptDate,
    paymentStatus,
    products,
    subtotal,
    discountAmount,
    taxAmount,
    finalTotal }) {

    return (
        <div id="receipt-preview" className="receipt-preview">

            <div className="receipt-header">

                <h1>YNK</h1>

                <p>Accessories</p>

            </div>

            <div className="receipt-info">

                <p>
                    <strong>Receipt No:</strong> {receiptNumber}
                </p>

                <p>
                    <strong>Date:</strong> {receiptDate || "Select Date"}
                </p>

            </div>

            <div className="customer-info">

                <h3>Customer</h3>

                <p>{customerName || "Customer Name"}</p>

                <p>{phone || "Phone Number"}</p>

            </div>

            <div className="receipt-items">

                <div className="receipt-item header">

                    <span>Product</span>
                    <span>Qty</span>
                    <span>Price</span>
                    <span>Total</span>

                </div>

                {products.map((product, index) => (
                    <div className="receipt-item" key={index}>

                        <span>
                            {product.name || "Product"}
                        </span>

                        <span>
                            {product.quantity}
                        </span>

                        <span>
                            ₹{product.price.toFixed(2)}
                        </span>

                        <span>
                            ₹{(product.quantity * product.price).toFixed(2)}
                        </span>

                    </div>
                ))}

            </div>

            <div className="receipt-summary">

                <div>
                    <span>Subtotal</span>
                    <strong>₹{subtotal.toFixed(2)}</strong>
                </div>

                <div>
                    <span>Discount</span>
                    <strong>-₹{discountAmount.toFixed(2)}</strong>
                </div>

                <div>
                    <span>Tax</span>
                    <strong>+₹{taxAmount.toFixed(2)}</strong>
                </div>

                <div className="receipt-total">
                    <span>TOTAL</span>
                    <strong>₹{finalTotal.toFixed(2)}</strong>
                </div>

            </div>

            <div className="receipt-footer">

                <div className="payment-status">
                    <span>Payment Status:</span>

                    <strong>{paymentStatus}</strong>
                </div>
                <p>Thank You!</p>

            </div>

        </div>
    );
}

export default ReceiptPreview;