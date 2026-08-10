import { Link } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  return (

    <aside className={`sidebar ${sidebarOpen ? "expanded" : "collapsed"}`}>

       {/* Toggle */}
  <div className="sidebar-toggle-container">
    <button
      className="sidebar-toggle"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      ☰
    </button>
  </div>

  {/* Logo */}
  <div className="sidebar-brand">
    <span className="brand-icon">🧾</span>

    {sidebarOpen && (
      <span className="brand-text">
        Receipt 
        Generator
      </span>
    )}
  </div>


      <nav className="sidebar-nav">

        <Link to="/dashboard" className="sidebar-link">
          <span className="sidebar-icon">📊</span>

          {sidebarOpen && (
            <span>Dashboard</span>
          )}
        </Link>


        <Link to="/customers" className="sidebar-link">
          <span className="sidebar-icon">👥</span>

          {sidebarOpen && (
            <span>Customers</span>
          )}
        </Link>


        <Link to="/products" className="sidebar-link">
          <span className="sidebar-icon">📦</span>

          {sidebarOpen && (
            <span>Products</span>
          )}
        </Link>


        <Link to="/create-receipt" className="sidebar-link">
          <span className="sidebar-icon">➕</span>

          {sidebarOpen && (
            <span>Create Receipt</span>
          )}
        </Link>


        <Link to="/receipts" className="sidebar-link">
          <span className="sidebar-icon">🧾</span>

          {sidebarOpen && (
            <span>Receipts</span>
          )}
        </Link>


        <Link to="/reports" className="sidebar-link">
          <span className="sidebar-icon">📈</span>

          {sidebarOpen && (
            <span>Reports</span>
          )}
        </Link>


        <Link to="/settings" className="sidebar-link">
          <span className="sidebar-icon">⚙️</span>

          {sidebarOpen && (
            <span>Settings</span>
          )}
        </Link>

      </nav>


      <div className="sidebar-bottom">

        <button className="logout-button">

          <span className="sidebar-icon">🚪</span>

          {sidebarOpen && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;