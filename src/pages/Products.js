function Products() {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your products and prices</p>
        </div>

        <button className="primary-button">
          + Add Product
        </button>
      </div>

      <div className="customer-table">

        <div className="table-header">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        <div className="table-row">
          <span>Keyboard</span>
          <span>Computer</span>
          <span>₹1,200</span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </div>

        <div className="table-row">
          <span>Mouse</span>
          <span>Computer</span>
          <span>₹800</span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </div>

        <div className="table-row">
          <span>USB Cable</span>
          <span>Accessory</span>
          <span>₹300</span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </div>

      </div>

    </div>
  );
}

export default Products;