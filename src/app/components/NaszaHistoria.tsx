"use client";
import React from "react";
import Image from "next/image";

export default function Info_1() {
  return (
    <section className="py-12 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24 flex flex-col md:flex-row items-center">
        {/* Left column - text */}
        <div className="w-full md:w-1/2 md:text-center md:mr-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-center md:text-center">Nasza Historia</h2>
          <p className="text-lg md:text-lg text-gray-600 mb-12 leading-relaxed text-center">
            Poznaliśmy się na weselu wspólnego przyjaciela latem 2019 roku. Klaudia pracowała wtedy jako projektantka graficzna, 
            a Darek był właśnie po zmianach jako strażak. Przypadkiem siedzialiśmy obok siebie przy stole i cały wieczór rozmawiali­śmy 
            o podróżach, filmach i marzeniach. Po imprezie Darek miał odwagę poprosić ją o numer telefonu - mimo że był trochę zdenerwowany. 
            Pierwsza randka była w ulubionej kawiarni Klaudii, gdzie spędzili siedem godzin, nie zauważając czasu. Od tego momentu byliśmy nierozłączni. 
            Przez lata przeżyliśmy razem wiele przygód: wspólne podróże, budowanie domu, zbieranie umiejętności (Klaudia nauczyła Darka gotować, 
            a on nauczył ją łowić ryby). 15 marca 2024 roku Darek zaproponował na szczycie Tatr - oświadczyny były dokonane przy zachodzie słońca, 
            z pierścionkiem, który Klaudia nosiła w sercu. Teraz, 15 sierpnia 2026, oficjalnie zostajemy mężem i żoną.
          </p>
        </div>

        {/* Right column - image with arch shape */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <div className="relative w-full aspect-[3/4] rounded-t-full overflow-hidden">
            <Image
              src="/images/ZDJĘCIE5 - Klaudia.jpg"
              alt="Wedding couple"
              fill
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
