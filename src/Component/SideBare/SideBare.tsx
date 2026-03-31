import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Auth/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { useAppSelector } from "../../hooks/hooks";
import "./sidebarestyle.css";

import FullLogo from "../../assets/Images/aVQPU59Ss9kqJDYYYDTe2sSe7FLQHMy8l8IfmjgH.png";
import ShortLogo from "../../assets/Images/playstore.png";

export const SideBare = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menu = [

    {
      name: "Home",
      icon: "bi-house",
      path: "/dashboard"
    },

    {
      name: "Catalog",
      icon: "bi-grid",
      submenu: [
        { name: "Product List", path: "/Product-List" },
        { name: "Add Product", path: "/add-product" },
        { name: "My catalog", path: "/my-catalog" },
        { name: "Imports", path: "/imports" },
        { name: "Exports", path: "/exports" },
        { name: "Bimmerz Catalog", path: "/bimmerz-catalog" },
        { name: "Brand Catalog", path: "/brand-catalog" },
        { name: "My Brands", path: "/my-brands" },
        { name: "Add Fulfilled by Bimmerz", path: "/add-fbn-product" }
      ]
    },
    {
      name: "Add Product",
      icon: "bi-grid",
      submenu: [
        { name: "Add Product", path: "/add-product" },
        { name: "Add Product By Catalog", path: "/add-by-catalog" },
        { name: "Add New Product", path: "/add-new-product" },
      ]
    },

    {
      name: "Fulfillment",
      icon: "bi-truck",
      submenu: [
        { name: "Fulfilled by Bimmerz Inventory", path: "/fbn-inventory" },
        { name: "Partner Orders", path: "/partner-orders" },
        { name: "Shipments", path: "/shipments" },
        { name: "Returns", path: "/returns" }
      ]
    },
    {
      name: "Fulfilled by Partner",
      icon: "bi-truck",
      submenu: [
        { name: "Directship", path: "/directship" },
        // { name: "Partner Orders", path: "/partner-orders" },
        // { name: "Shipments", path: "/shipments" },
        // { name: "Returns", path: "/returns" }
      ]
    },

    {
      name: "Promotion Center",
      icon: "bi-megaphone",
      submenu: [
         { name: "Promotions", path: "/promotions" },
        { name: "Deals", path: "/deals" },
        { name: "Vireula bundles", path: "/vireula-bundles" },
        { name: "Coupons", path: "/coupons" }
      ]
    },

    {
      name: "Payments",
      icon: "bi-credit-card",
      path: "/payments"
    },

    {
      name: "Sales Reports",
      icon: "bi-bar-chart",
      submenu: [
        { name: "Sales Overview", path: "/sales-overview" },
        { name: "Statements", path: "/statements" },
        { name: "Transaction View", path: "/transaction-view" },
        { name: "Orders Report", path: "/orders-report" },
        { name: "Product Performance", path: "/product-performance" }
      ]
    },

    {
      name: "Users & Access",
      icon: "bi-people",
      submenu: [
        { name: "Users", path: "/users" },
        { name: "Roles", path: "/roles" }
      ]
    }

  ];

  return (

    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>


      <div
        className={`sidebar-logo d-flex ${!collapsed ? "flex-row" : "flex-column"}`}
        onClick={() => setCollapsed(!collapsed)}
      >
        {!collapsed ? (
          <img src={FullLogo} width={180} alt="logo" />
        ) : (
          <img src={ShortLogo} width={60} alt="logo" />
        )}

        <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"} ms-1`}></i>
      </div>


      {user && !collapsed && (
        <div className="sidebar-user">
          <small>Logged in as</small>
          <p>{user?.supplier_name}</p>
        </div>
      )}


      <div className="sidebar-menu">

        {menu.map((item) => (

          <div key={item.name}>

            <div
              className={`sidebar-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => {

                if (item.submenu) {
                  setOpenSubmenu(openSubmenu === item.name ? null : item.name);
                } else if (item.path) {
                  navigate(item.path);
                  setOpenSubmenu(null);
                }

              }}
            >

              <i className={`bi ${item.icon}`}></i>

              {!collapsed && (
                <>
                  <span>{item.name}</span>
                </>
              )}

              {item.submenu && !collapsed && (
                <i
                  className={`bi ${
                    openSubmenu === item.name
                      ? "bi-chevron-up ms-auto"
                      : "bi-chevron-down ms-auto"
                  }`}
                ></i>
              )}

            </div>


            {item.submenu && openSubmenu === item.name && !collapsed && (

              <div className="submenu">

                {item.submenu.map((sub) => (

                  <div
                    key={sub.name}
                    className={`sidebar-item submenu-item ${
                      location.pathname === sub.path ? "active" : ""
                    }`}
                    onClick={() => navigate(sub.path)}
                  >
                    <span>{sub.name}</span>
                  </div>

                ))}

              </div>

            )}

          </div>

        ))}

      </div>


      {!collapsed && (
        <div className="sidebar-logout">
          <button onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      )}

    </div>
  );
};