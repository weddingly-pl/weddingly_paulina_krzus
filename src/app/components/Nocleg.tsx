"use client";
import React from "react";

export default function Nocleg() {
  return (
    <section id="nocleg" className="py-12 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24">
        <div className="text-center mb-8">
          <br />
          <br />
          <h2 className="text-2xl md:text-3xl font-serif mb-6">
            Prośba o potwierdzenia telefoniczne lub poprzez poniższy formularz.
          </h2>

          {/* Strzałka w dół */}
          <div className="flex justify-center text-4xl animate-bounce">
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}
