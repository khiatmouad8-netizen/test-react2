import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import RecentOrders from "../components/RecentOrders";
import RecentProducts from "../components/RecentProducts";

import revenueIcon from "../assets/money.png";
import ordersIcon from "../assets/shop.png";
import productsIcon from "../assets/products.png";
import customersIcon from "../assets/customers.webp";

import "./AdminDashboard.css";


function AdminDashboard() {

  /* =========================
     SIDEBAR
  ========================= */
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSection, setActiveSection] =
    useState("dashboard");


  /* =========================
     EMPTY DATA
  ========================= */

  const [orders, setOrders] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);


  /* =========================
     SEARCH
  ========================= */

  const [search, setSearch] =
    useState("");


  /* =========================
     ADD PRODUCT MODAL
  ========================= */

  const [showAddProduct, setShowAddProduct] =
    useState(false);


  /* =========================
     NEW PRODUCT
  ========================= */

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  });


  /* =========================
     STATISTICS
  ========================= */

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.amount),
    0
  );


  const totalOrders = orders.length;


  const totalProducts = products.length;


  const totalCustomers = customers.length;


  /* =========================
     SEARCH ORDERS
  ========================= */

  const filteredOrders = useMemo(() => {

    if (!search.trim()) {
      return orders;
    }

    const value =
      search.toLowerCase();


    return orders.filter((order) =>

      order.id
        .toLowerCase()
        .includes(value) ||

      order.customer
        .toLowerCase()
        .includes(value) ||

      order.product
        .toLowerCase()
        .includes(value) ||

      order.status
        .toLowerCase()
        .includes(value)

    );

  }, [orders, search]);


  /* =========================
     SEARCH PRODUCTS
  ========================= */

  const filteredProducts = useMemo(() => {

    if (!search.trim()) {
      return products;
    }

    const value =
      search.toLowerCase();


    return products.filter((product) =>

      product.name
        .toLowerCase()
        .includes(value) ||

      product.category
        .toLowerCase()
        .includes(value)

    );

  }, [products, search]);


  /* =========================
     INPUT CHANGE
  ========================= */

  const handleInputChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setNewProduct((previous) => ({
      ...previous,
      [name]: value
    }));

  };


  /* =========================
     ADD PRODUCT
  ========================= */

  const handleAddProduct = (e) => {

    e.preventDefault();


    if (
      !newProduct.name.trim() ||
      !newProduct.category.trim() ||
      !newProduct.price ||
      !newProduct.stock
    ) {

      return;

    }


    const product = {

      id: Date.now(),

      name:
        newProduct.name,

      category:
        newProduct.category,

      price:
        Number(newProduct.price),

      stock:
        Number(newProduct.stock),

      image:
        "👕"

    };


    setProducts((previous) => [
      ...previous,
      product
    ]);


    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: ""
    });


    setShowAddProduct(false);

  };


  /* =========================
     SECTION DATA
  ========================= */

  const sectionTitles = {

    dashboard: {
      title: "Dashboard",
      description:
        "Welcome back! Here's what's happening with your store."
    },

    products: {
      title: "Products",
      description:
        "Manage all products in your store."
    },

    orders: {
      title: "Orders",
      description:
        "View and manage customer orders."
    },

    customers: {
      title: "Customers",
      description:
        "Manage your store customers."
    },

    inventory: {
      title: "Inventory",
      description:
        "Monitor your product stock."
    },

    analytics: {
      title: "Analytics",
      description:
        "View your store performance."
    },

    settings: {
      title: "Settings",
      description:
        "Manage your admin settings."
    }

  };


  const currentSection =
    sectionTitles[activeSection];


  return (

    <div className="admin-layout">


      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />


      <main className="dashboard">


        {/* =========================
            TOPBAR
        ========================= */}

        <header className="topbar">

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="topbar-right">

  <button
    className="top-icon"
    onClick={() => setShowNotifications(!showNotifications)}
  >
    🔔
    <span></span>
  </button>

  {showNotifications && (
    <div className="notifications-dropdown">
      <h3>Notifications</h3>

      <div className="notification-item">
        <strong>New Order</strong>
        <p>You received a new order.</p>
      </div>

      <div className="notification-item">
        <strong>New Customer</strong>
        <p>A new customer has registered.</p>
      </div>

      <div className="notification-item">
        <strong>Low Stock</strong>
        <p>A product is running low in stock.</p>
      </div>
    </div>
  )}

</div>

            <div className="top-profile">

              <div className="profile-avatar">
                A
              </div>

              <div>

                <strong>
                  Admin
                </strong>

                <small>
                  Administrator
                </small>

              </div>

            </div>

          

        </header>



        {/* =========================
            PAGE HEADER
        ========================= */}

        <section className="page-header">

          <div>

            <h1>
              {currentSection.title}
            </h1>

            <p>
              {currentSection.description}
            </p>

          </div>


          {(activeSection === "dashboard" ||
            activeSection === "products") && (

            <button
              className="add-product"
              onClick={() =>
                setShowAddProduct(true)
              }
            >
              + Add Product
            </button>

          )}

        </section>



        {/* =========================
            DASHBOARD
        ========================= */}

        {activeSection === "dashboard" && (

          <>

            {/* STATISTICS */}

            <section className="stats-grid">

              <StatCard
                title="Total Revenue"
                value={`$${totalRevenue.toLocaleString()}`}
                change="0%"
                icon={revenueIcon}
                positive={true}
              />


              <StatCard
                title="Total Orders"
                value={totalOrders}
                change="0%"
                icon={ordersIcon}
                positive={true}
              />


              <StatCard
                title="Products"
                value={totalProducts}
                change="0%"
                icon={productsIcon}
                positive={true}
              />


              <StatCard
                title="Customers"
                value={totalCustomers}
                change="0%"
                icon={customersIcon}
                positive={true}
              />

            </section>



            {/* SALES */}

            <section className="chart-card">

              <div className="chart-header">

                <div>

                  <h3>
                    Sales Overview
                  </h3>

                  <p>
                    Revenue performance
                  </p>

                </div>

              </div>


              <div className="empty-chart">

                <div className="empty-chart-icon">
                  📊
                </div>

                <h3>
                  No sales data yet
                </h3>

                <p>
                  Sales data will appear when customers start placing orders.
                </p>

              </div>

            </section>



            {/* ORDERS + PRODUCTS */}

            <section className="dashboard-bottom">

              <RecentOrders
                orders={filteredOrders}
              />

              <RecentProducts
                products={filteredProducts}
              />

            </section>

          </>

        )}



        {/* =========================
            PRODUCTS
        ========================= */}

        {activeSection === "products" && (

          <section className="full-section-card">

            <div className="section-card-header">

              <div>

                <h2>
                  All Products
                </h2>

                <p>
                  {products.length} products
                </p>

              </div>

            </div>


            {filteredProducts.length === 0 ? (

              <div className="big-empty">

                <div>
                  👕
                </div>

                <h3>
                  No products yet
                </h3>

                <p>
                  Click "Add Product" to create your first product.
                </p>

                <button
                  className="add-product"
                  onClick={() =>
                    setShowAddProduct(true)
                  }
                >
                  + Add Product
                </button>

              </div>

            ) : (

              <div className="all-products-grid">

                {filteredProducts.map(
                  (product) => (

                    <div
                      className="admin-product-card"
                      key={product.id}
                    >

                      <div className="admin-product-image">
                        {product.image}
                      </div>

                      <h3>
                        {product.name}
                      </h3>

                      <p>
                        {product.category}
                      </p>

                      <strong>
                        ${product.price}
                      </strong>

                      <span>
                        {product.stock} in stock
                      </span>

                    </div>

                  )
                )}

              </div>

            )}

          </section>

        )}



        {/* =========================
            ORDERS
        ========================= */}

        {activeSection === "orders" && (

          <section className="full-section-card">

            <RecentOrders
              orders={filteredOrders}
            />

          </section>

        )}



        {/* =========================
            CUSTOMERS
        ========================= */}

        {activeSection === "customers" && (

          <section className="full-section-card">

            {customers.length === 0 ? (

              <div className="big-empty">

                <div>
                  👥
                </div>

                <h3>
                  No customers yet
                </h3>

                <p>
                  Customers will appear here when they register.
                </p>

              </div>

            ) : (

              customers.map(
                (customer, index) => (

                  <div
                    className="customer-row"
                    key={index}
                  >
                    {customer}
                  </div>

                )
              )

            )}

          </section>

        )}



        {/* =========================
            INVENTORY
        ========================= */}

        {activeSection === "inventory" && (

          <section className="full-section-card">

            <div className="section-card-header">

              <h2>
                Inventory
              </h2>

              <span>
                {products.length} products
              </span>

            </div>


            {products.length === 0 ? (

              <div className="big-empty">

                <div>
                  📦
                </div>

                <h3>
                  Inventory is empty
                </h3>

                <p>
                  Products will appear here when added.
                </p>

              </div>

            ) : (

              products.map(
                (product) => (

                  <div
                    className="inventory-row"
                    key={product.id}
                  >

                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.stock} units
                    </span>

                  </div>

                )
              )

            )}

          </section>

        )}



        {/* =========================
            ANALYTICS
        ========================= */}

        {activeSection === "analytics" && (

          <section className="full-section-card">

            <div className="big-empty">

              <div>
                📊
              </div>

              <h3>
                No analytics data yet
              </h3>

              <p>
                Analytics will be generated from real orders and sales.
              </p>

            </div>

          </section>

        )}



        {/* =========================
            SETTINGS
        ========================= */}

        {activeSection === "settings" && (

          <section className="full-section-card">

            <div className="settings-content">

              <h2>
                Admin Settings
              </h2>

              <p>
                Settings will be connected to the backend later.
              </p>

            </div>

          </section>

        )}



        {/* =========================
            ADD PRODUCT MODAL
        ========================= */}

        {showAddProduct && (

          <div
            className="modal-overlay"
            onClick={() =>
              setShowAddProduct(false)
            }
          >

            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <h2>
                    Add Product
                  </h2>

                  <p>
                    Create a new product
                  </p>

                </div>


                <button
                  className="close-modal"
                  onClick={() =>
                    setShowAddProduct(false)
                  }
                >
                  ×
                </button>

              </div>


              <form
                onSubmit={handleAddProduct}
              >

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Classic Hoodie"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />


                <label>
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Hoodies"
                  value={newProduct.category}
                  onChange={handleInputChange}
                />


                <div className="form-row">

                  <div>

                    <label>
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      min="0"
                      value={newProduct.price}
                      onChange={handleInputChange}
                    />

                  </div>


                  <div>

                    <label>
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      placeholder="0"
                      min="0"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="save-product"
                >
                  Add Product
                </button>

              </form>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}


export default AdminDashboard;