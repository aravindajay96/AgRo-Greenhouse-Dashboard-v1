// PlantImages.jsx
import React from "react";

export default function PlantImages() {
  // Two sets of embedded images from /public folders
  const strawberryImages = [
    { url: "/strawberry/20250209.jpg", title: "2025/02/09" },
    { url: "/strawberry/20250209 (2).jpg", title: "2025/02/09" },
    { url: "/strawberry/20250210.jpg", title: "2025/02/10" },
    { url: "/strawberry/20250210 (2).jpg", title: "2025/02/10" },
    { url: "/strawberry/20250212.jpg", title: "2025/02/12" },
    { url: "/strawberry/20250305.jpg", title: "2025/03/05" },
    { url: "/strawberry/20250308.jpg", title: "2025/03/08" },
  ];

  const kochchiImages = [
    { url: "/kochchi/20200725.jpg", title: "2020/07/25" },
    { url: "/kochchi/20200805.jpg", title: "2020/08/05" },
    { url: "/kochchi/20200818.jpg", title: "2020/08/18" },
    { url: "/kochchi/20200907.jpg", title: "2020/09/07" },
  ];

  const renderImageSection = (title, images, emoji) => (
    <div style={{ marginBottom: "50px" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
        {emoji} {title}
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#fff",
              width: "300px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={img.url}
              alt={img.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            <p
              style={{
                padding: "12px",
                fontWeight: "500",
                fontSize: "1rem",
                color: "#333",
                background: "#f9f9f9",
                margin: 0,
              }}
            >
              {img.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      {renderImageSection("Strawberry", strawberryImages, "🍓")}
      {renderImageSection("Kochchi", kochchiImages, "🌶️")}
    </div>
  );
}
