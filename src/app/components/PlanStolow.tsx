"use client";
import React from "react";

export default function PlanStolow() {
  // Przykładowe, zmyślone nazwiska (po 8 osób na stół)
  const tables = [
    {
      tableNumber: 1,
      guests: [
        "Anna Kowalska",
        "Jan Kowalski",
        "Piotr Nowak",
        "Marta Wiśniewska",
        "Kamil Lewandowski",
        "Zofia Zielińska",
        "Paweł Jankowski",
        "Ewa Szymańska",
      ],
    },
    {
      tableNumber: 2,
      guests: [
        "Magdalena Kaczmarek",
        "Tomasz Wójcik",
        "Karolina Piotrowska",
        "Robert Michalski",
        "Olga Baran",
        "Mateusz Bąk",
        "Julia Grabowska",
        "Adam Sobczak",
      ],
    },
    {
      tableNumber: 3,
      guests: [
        "Agnieszka Pawlak",
        "Damian Kowal",
        "Ewelina Dudek",
        "Wojciech Duda",
        "Dorota Majewska",
        "Przemysław Wieczorek",
        "Patrycja Król",
        "Rafał Pawlik",
      ],
    },
    {
      tableNumber: 4,
      guests: [
        "Katarzyna Stępień",
        "Marcin Lis",
        "Beata Michalak",
        "Szymon Janik",
        "Dominika Sowa",
        "Bartosz Marek",
        "Ewelina Urbańska",
        "Grzegorz Konieczny",
      ],
    },
    {
      tableNumber: 5,
      guests: [
        "Natalia Gajewska",
        "Tomasz Wróbel",
        "Edyta Kołodziej",
        "Marek Nowicki",
        "Sylwia Bielecka",
        "Hubert Sawicki",
        "Wioletta Malinowska",
        "Łukasz Polak",
      ],
    },
    {
      tableNumber: 6,
      guests: [
        "Izabela Tomczyk",
        "Michał Kopeć",
        "Marzena Woźniak",
        "Paweł Kasprzak",
        "Urszula Dudek",
        "Krzysztof Walczak",
        "Aleksandra Kurek",
        "Sebastian Grzelak",
      ],
    },
  ];

  return (
    <section className="py-24 bg-[var(--background-color)]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Nagłówek sekcji */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[var(--text-black)]">
            Plan stołów
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light italic">
            Oto nasz układ okrągłych stołów – każdy z Was znajdzie tu swoje 
            miejsce w doborowym towarzystwie!
          </p>
        </div>

        {/* Grid stołów */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tables.map((table) => (
            <div
              key={table.tableNumber}
              className="flex flex-col items-center justify-center"
            >
              {/* Okrągły stół */}
              <div className="w-64 h-64 bg-white border border-gray-200 rounded-full shadow-md p-4 relative flex flex-col justify-center">
                {/* Numer stołu */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-serif text-gray-500">
                  Stół {table.tableNumber}
                </div>

                {/* Lista gości */}
                <ul className="list-none text-center text-xs md:text-sm text-gray-700 space-y-1 mt-4">
                  {table.guests.map((guest, idx) => (
                    <li key={idx}>{guest}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
