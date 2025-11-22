import React from "react";
import { CameraIcon, SparklesIcon, BeakerIcon, CakeIcon } from "@heroicons/react/24/outline";

export default function AtrakcjeWeselne() {
  return (
    <section className="py-12 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24">
        {/* Nagłówek sekcji */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-[48px] font-serif mb-4">
            Atrakcje weselne
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-serif max-w-2xl mx-auto">
            Przygotowaliśmy dla Was kilka wyjątkowych atrakcji, aby ten dzień
            był pełen radości i niezapomnianych chwil. Każda z nich doda magii
            i uśmiechu na naszych wspólnych uroczystościach!
          </p>
        </div>

        {/* Kontener z atrakcjami w gridzie */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24">
          {/* 1) Instax */}
          <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#003E3C]/10 w-full md:w-[280px] mx-auto">
            <div className="w-16 h-16 text-[#BC8F8F] mb-6 mx-auto">
              <CameraIcon />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[#BC8F8F] text-center">
              Instax
            </h3>
            <p className="text-lg text-gray-500 mb-4 text-center">
              Zróbcie sobie pamiątkowe zdjęcia aparatem Instax i wklejcie je do
              naszej Księgi Gości. Będzie to świetna zabawa i cudowna pamiątka!
            </p>
          </div>

          {/* 2) Drink Bar */}
          <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#003E3C]/10 w-full md:w-[280px] mx-auto">
            <div className="w-16 h-16 text-[#BC8F8F] mb-6 mx-auto">
              <BeakerIcon />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[#BC8F8F] text-center">
              Drink Bar
            </h3>
            <p className="text-lg text-gray-500 mb-4 text-center">
              Odkryjcie nasz wyjątkowy Drink Bar i stwórzcie własne koktajle!
              Znajdziecie w nim różnorodne składniki i przepisy na pyszne napoje.
            </p>
          </div>

          {/* 3) Słodki kącik */}
          <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#003E3C]/10 w-full md:w-[280px] mx-auto">
            <div className="w-16 h-16 text-[#BC8F8F] mb-6 mx-auto">
              <CakeIcon />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[#BC8F8F] text-center">
              Słodki kącik
            </h3>
            <p className="text-lg text-gray-500 mb-4 text-center">
              Dla łasuchów przygotowaliśmy bogaty wybór deserów, babeczek i
              słodkich przekąsek. Rozkoszujcie się smakiem i bawcie się słodko!
            </p>
          </div>

          {/* 4) Pokaz fajerwerków */}
          <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#003E3C]/10 w-full md:w-[280px] mx-auto">
            <div className="w-16 h-16 text-[#BC8F8F] mb-6 mx-auto">
              <SparklesIcon />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[#BC8F8F] text-center">
              Pokaz fajerwerków
            </h3>
            <p className="text-lg text-gray-500 mb-4 text-center">
              Na zakończenie wieczoru czeka nas spektakularny pokaz fajerwerków,
              który rozświetli niebo i będzie niezapomnianym zwieńczeniem tego dnia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}