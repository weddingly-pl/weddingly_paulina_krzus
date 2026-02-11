"use client";
import React from "react";

export default function Kosmetyczki() {
  return (
    <section id="kosmetyczki" className="py-24 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Fryzjerzy i makijażystki</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Jeśli któraś z Pań potrzebuje umówić fryzjera bądź makijażystkę proszę o telefon :)
          </p>
        </div>
      </div>
    </section>
  );
}