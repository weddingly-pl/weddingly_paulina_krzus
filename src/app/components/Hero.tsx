"use client";
import React from "react";
import Image from "next/image";
import { CalendarDaysIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-end justify-center pb-12 animate-fadeIn">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <picture>
          <Image
              src="/images/ZDJĘCIE88 - Klaudia.jpg"
              alt="Wedding background"
              fill
              sizes="100vw"
              quality={100}
              priority
              className="
                object-cover 
                object-[55%_90%]   // mobile: mega w lewo
                md:object-[10%_10%] // od md w górę: środek
                brightness-[0.85] 
                transition-all duration-700
              "
            />

        </picture>
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto text-center text-white mt-auto">
        <div className="relative inline-block">
          <p className="text-4xl md:text-5xl font-serif mb-6 tracking-wide drop-shadow-lg animate-slideDown">
            Pobieramy się!
          </p>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif mb-10 tracking-wide drop-shadow-lg animate-slideUp">
          Klaudia & Darek
        </h1>

        {/* Wedding Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl mx-auto bg-white/20 backdrop-blur-md rounded-lg p-5 md:p-7 shadow-lg">
          <div className="flex flex-col items-center space-y-1.5 p-1.5">
            <CalendarDaysIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
            <div>
              <h3 className="text-sm md:text-base font-semibold mb-1 text-white">Data</h3>
              <p className="text-xs md:text-sm text-white">15 sierpnia 2026</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1.5 p-1.5">
            <ClockIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
            <div>
              <h3 className="text-sm md:text-base font-semibold mb-1 text-white">Godzina</h3>
              <p className="text-xs md:text-sm text-white">16:30</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1.5 p-1.5">
            <MapPinIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
            <div>
              <h3 className="text-sm md:text-base font-semibold mb-1 text-white">Ślub</h3>
              <p className="text-xs md:text-sm text-white">Parafia Matki Bożej Królowej Polski Marki-Pustelnik - Jutrzenki 26, 05-270 Marki</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1.5 p-1.5">
            <MapPinIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
            <div>
              <h3 className="text-sm md:text-base font-semibold mb-1 text-white">Wesele</h3>
              <p className="text-xs md:text-sm text-white">Cicha 23, 05-270 Marki</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
