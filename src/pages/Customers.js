function Customers() {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customers</p>
        </div>

        <button className="primary-button">
          + Add Customer
        </button>
      </div>

      <div className="customer-table">

        <div className="table-header">
          <span>Name</span>
          <span>Phone</span>
          <span>Email</span>
          <span>Actions</span>
        </div>

        <div className="table-row">
          <span>Rahul Kumar</span>
          <span>9876543210</span>
          <span>rahul@gmail.com</span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </div>

        <div className="table-row">
          <span>John Smith</span>
          <span>9876543211</span>
          <span>john@gmail.com</span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </div>

        <div className="table-row">
          <span>Arun Kumar</span>
          <span>9876543212</span>
          <span>arun@gmail.com</span>
          <span>
            <button>Edit</button>
            <button>Delete</button>
          </span>
        </div>

      </div>

    </div>
  );
}

export default Customers;