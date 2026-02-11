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
            Jest jesienny wieczor, 1szy Listopad 2020 roku. 
            <br />
            Tak … to właśnie tego wieczoru się poznali, dzięki znajomym, którzy bardziej tego chcieli niż Oni sami! 
            <br />
            <br />
            On - Przemek lat 28, ostoja spokoju, analityczny umysł, który wszystko musi przemyśleć i poukładać, domator, wrażliwa dusza. Dobry człowiek - tak o Nim mówią. Pracoholik - bez pracy żyć nie umie. 
            <br />
            <br />
            Ona - Paula lat 30, z jednej strony (tej imprezowej) wulkan energii, ogień, pomysłów milion na minutę, dusza towarzystwa, ale z drugiej stąpająca twardo po ziemii, bez zawahania dążąca do swoich celow. 
            <br />
            <br />
            Oboje po trudnych związkach, ale być może potrzebnych. 
            <br />
            Gdyby nie ich wspólni znajomi, nie znali by się pewnie do dzis :) a dzis ….
            Są wdzięczni za wszystko, co razem stworzyli, a najbardziej za to ze są szczęśliwymi rodzicami wspaniałych dzieci Noemi i Nikodema, którzy są dowodem ich wspaniałej i pięknej miłości 
            <br />
            <br />
            Dziś to już opowieść której bohaterów jest więcej niż dwoje … RODZINA !
          </p>
        </div>

        {/* Right column - image with arch shape */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <div className="relative w-full aspect-[3/4] rounded-t-full overflow-hidden">
            <Image
              src="/images/1770576572839-IMG_0002.jpeg"
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
