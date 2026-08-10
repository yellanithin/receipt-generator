function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Receipts</h3>
          <p>125</p>
        </div>

        <div className="card">
          <h3>Total Sales</h3>
          <p>₹18,500</p>
        </div>

        <div className="card">
          <h3>Today's Sales</h3>
          <p>₹2,300</p>
        </div>

        <div className="card">
          <h3>Total Items Sold</h3>
          <p>320</p>
        </div>

      </div>

      <button className="create-button">
        + Create Receipt
      </button>

    </div>
  );
}

export default Dashboard;