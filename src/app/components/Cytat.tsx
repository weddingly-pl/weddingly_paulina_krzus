import React from "react";

export default function LoveQuote() {
  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "10px auto",
        padding: "10px 20px",
        textAlign: "center",
        backgroundColor: "#F2E8DF",
        borderRadius: "10px",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >

      {/* Cytat */}
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "1.5rem",
          lineHeight: "1.5",
          color: "#333",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        "After all this time? Always"
      </p>

    </section>
  );
}
