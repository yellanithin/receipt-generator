import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import CreateReceipt from "./pages/CreateReceipt";
import Receipts from "./pages/Receipts";

import "./App.css";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>

      <div className={`app ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="main-area">

          <Navbar />

          <main className="content-area">

            <Routes>

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/customers"
                element={<Customers />}
              />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/create-receipt"
                element={<CreateReceipt />}
              />

              <Route
                path="/receipts"
                element={<Receipts />}
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;