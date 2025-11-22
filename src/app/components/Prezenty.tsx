import React from "react";

export default function PrezentySlubne() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">Prezenty</h2>
      </div>
      <p className="text-base md:text-lg text-gray-600 font-serif max-w-2xl mx-auto">
        Drodzy Goście, przygotowaliśmy dla Was krótkie rebusy, które
        ułatwią Wam wybór prezentu. Mamy nadzieję, że te wskazówki
        wywołają uśmiech i pomogą w podjęciu decyzji!
      </p>
      <br></br>
      <br></br>
      {/* Główny kontener z rebusami */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center", // Wyśrodkowanie rebusów
        }}
      >
        {/* Pierwszy rebus */}
        <div
          style={{
            flex: "1 1 45%", // Zajmuje 45% szerokości, aby dwa rebusy zmieściły się obok siebie
            maxWidth: "500px", // Maksymalna szerokość rebusa
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid rgba(0, 62, 60, 0.1)",
          }}
        >
          {/* Linia 1: Prezent -> Koperta -> Dom */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <span style={{ fontSize: "3rem" }}>🎁</span>
            <span style={{ color: "#D94141", fontSize: "2rem" }}>→</span>
            <span style={{ fontSize: "3rem" }}>✉️</span>
            <span style={{ color: "#D94141", fontSize: "2rem" }}>→</span>
            <span style={{ fontSize: "3rem" }}>🏠</span>
          </div>
        </div>

        {/* Drugi rebus */}
        <div
          style={{
            flex: "1 1 45%", // Zajmuje 45% szerokości
            maxWidth: "500px", // Maksymalna szerokość rebusa
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid rgba(0, 62, 60, 0.1)",
          }}
        >
          {/* Linia 2: Kwiaty -> Wino -> Lotto */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <span style={{ fontSize: "3rem" }}>💐</span>
            <span style={{ color: "#D94141", fontSize: "2rem" }}>→</span>
            <span style={{ fontSize: "3rem" }}>🍷</span>
            <span style={{ color: "#D94141", fontSize: "2rem" }}>→</span>
            <span style={{ fontSize: "3rem" }}>🎟️</span>
          </div>
        </div>
      </div>
    </section>
  );
}