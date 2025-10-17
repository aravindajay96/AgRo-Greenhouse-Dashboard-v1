import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/" },
    { icon: "⚡", label: "Energy", path: "/energy" },
    { icon: "🌿", label: "Plants", path: "/plants" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "80px",
        background: "#1e293b", // modern dark navy tone
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        height: "100vh",
        boxShadow: "2px 0 12px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          marginBottom: "30px",
          fontWeight: "bold",
          color: "#38bdf8",
        }}
      >
        🌱
      </h2>

      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          title={item.label} // shows tooltip on hover
          style={{
            color: location.pathname === item.path ? "#38bdf8" : "#e2e8f0",
            margin: "20px 0",
            fontSize: "24px",
            textDecoration: "none",
            transition: "all 0.3s ease",
            transform:
              location.pathname === item.path ? "scale(1.2)" : "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#38bdf8";
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== item.path) {
              e.currentTarget.style.color = "#e2e8f0";
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          {item.icon}
        </Link>
      ))}

      <div style={{ flexGrow: 1 }}></div>

      <Link
        to="/settings"
        title="Settings"
        style={{
          color: "#94a3b8",
          fontSize: "22px",
          marginBottom: "20px",
          textDecoration: "none",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
      >
        ⚙️
      </Link>
    </div>
  );
}
