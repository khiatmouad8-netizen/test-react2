function Sidebar({ activeSection, setActiveSection }) {

  const menuItems = [
    {
      id: "dashboard",
      icon: "▦",
      label: "Dashboard"
    },
    {
      id: "products",
      icon: "👕",
      label: "Products"
    },
    {
      id: "orders",
      icon: "🛒",
      label: "Orders"
    },
    {
      id: "customers",
      icon: "👥",
      label: "Customers"
    },
    {
      id: "inventory",
      icon: "📦",
      label: "Inventory"
    }
  ];


  const otherItems = [
    {
      id: "analytics",
      icon: "📊",
      label: "Analytics"
    },
    {
      id: "settings",
      icon: "⚙",
      label: "Settings"
    }
  ];


  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="logo">

        <div className="logo-icon">
          C
        </div>

        <div>
          <h2>Clothify</h2>
          <span>ADMIN PANEL</span>
        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="sidebar-nav">

        <p className="menu-title">
          MAIN MENU
        </p>


        {menuItems.map((item) => (

          <button
            key={item.id}
            className={`nav-item ${
              activeSection === item.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveSection(item.id)
            }
          >

            <span className="nav-icon">
              {item.icon}
            </span>

            <span className="nav-label">
              {item.label}
            </span>

          </button>

        ))}


        <p className="menu-title">
          OTHER
        </p>


        {otherItems.map((item) => (

          <button
            key={item.id}
            className={`nav-item ${
              activeSection === item.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveSection(item.id)
            }
          >

            <span className="nav-icon">
              {item.icon}
            </span>

            <span className="nav-label">
              {item.label}
            </span>

          </button>

        ))}

      </nav>


      {/* ADMIN PROFILE */}

      <div className="sidebar-bottom">

        <div className="admin-profile">

          <div className="profile-avatar">
            A
          </div>

          <div>
            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>
          </div>

          <span className="profile-more">
            •••
          </span>

        </div>

      </div>

    </aside>
  );
}


export default Sidebar;