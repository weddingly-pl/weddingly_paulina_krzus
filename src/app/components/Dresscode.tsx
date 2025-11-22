import React from "react";
import { UserIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function DressCode() {
  return (
    <section className="py-24 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24">
        {/* Nagłówek sekcji */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-[48px] font-serif mb-4">
            DRESS CODE
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-serif max-w-2xl mx-auto">
            Nasza uroczystość weselna odbędzie się w klimacie boho.
            Nie oznacza to, że musicie bezwzględnie dostosować się do tego stylu,
            ale będzie nam miło, jeśli dołączycie do tej niepowtarzalnej atmosfery!
          </p>
        </div>

        {/* Grid z sugestiami dla panów i pań */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Panowie */}
          <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#003E3C]/10 w-full md:w-[420px] mx-auto"> {/* Zmiana md:w-[280px] na md:w-[320px] */}
            <div className="w-16 h-16 text-[#BC8F8F] mb-6 mx-auto">
              <UserIcon />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[#BC8F8F] text-center">
              Panowie
            </h3>
            <p className="text-lg text-gray-500 mb-4 text-center">
              Proponujemy styl boho – luźny, ale elegancki, z nutą swobody.
              Kilka pomysłów:
            </p>
            <ul className="text-sm md:text-base text-gray-600 font-serif list-disc list-inside text-center mx-auto max-w-xs mt-3">
              <li>Muszki</li>
              <li>Kamizelki</li>
              <li>Jasne kolory</li>
              <li>Szelki</li>
            </ul>
          </div>

          {/* Panie */}
          <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#003E3C]/10 w-full md:w-[420px] mx-auto"> {/* Zmiana md:w-[280px] na md:w-[320px] */}
            <div className="w-16 h-16 text-[#BC8F8F] mb-6 mx-auto">
              <SparklesIcon />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[#BC8F8F] text-center">
              Panie
            </h3>
            <p className="text-lg text-gray-500 mb-4 text-center">
              Delikatne i zwiewne elementy w stylu boho to strzał w dziesiątkę.
              Możecie postawić na:
            </p>
            <ul className="text-sm md:text-base text-gray-600 font-serif list-disc list-inside text-center mx-auto max-w-xs mt-3">
              <li>Sukienki w stylu boho</li>
              <li>Wygodne buty do tańca</li>
              <li>Koronki, hafty i frędzle</li>
              <li>Jasne, pastelowe odcienie</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}