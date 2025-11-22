"use client";
import React from "react";

export default function Kosmetyczki() {
  const recommendations = [
    {
      name: "Dominika Szymczyk",
      specialty: "Makijaż",
      instagram: "dominikaszymczyk.mua",
      url: "https://www.instagram.com/dominikaszymczyk.mua/",
      emoji: "💄"
    },
    {
      name: "Hair Mess",
      specialty: "Fryzury",
      instagram: "hair_mess_in_poznan",
      url: "https://www.instagram.com/hair_mess_in_poznan/",
      emoji: "💇‍♀️"
    }
  ];

  return (
    <section id="kosmetyczki" className="py-24 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Polecane stylistki</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Drogie Panie, często pytacie, jakie stylistki fryzur i makijażystki polecamy w okolicach naszego wesela.
            Przychodzimy w odpowiedzią i podrzucamy kilka polecajek od Panny Młodej!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#003E3C]/10"
              >
                <span className="text-5xl mb-6">{rec.emoji}</span>
                <h3 className="text-2xl font-serif mb-2">{rec.name}</h3>
                <p className="text-lg text-gray-500 mb-4">{rec.specialty}</p>
                <a
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--icon-color)] hover:opacity-80 transition-opacity"
                >
                  <span className="text-lg">@{rec.instagram}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}