"use client";
import React from "react";
import {
  FaRing,
  FaGlassCheers,
  FaHamburger,
  FaGift,
  FaUsers,
  FaBirthdayCake,
  FaBoxOpen,
  FaDrumstickBite,
  FaLeaf,
  FaUtensils,
} from "react-icons/fa";
import { GiLinkedRings, GiRose } from "react-icons/gi";

export default function Plan() {
  return (
    <section id="plan" className="py-12 bg-[var(--background-color)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[var(--text-black)]">
              Plan Uroczystości
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light italic">
              Harmonogram Naszego Wielkiego Dnia
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 h-full w-px bg-[#BF826B] opacity-20"></div>
            <div className="space-y-16">
              {/* Event 1: 14:00 Mówimy TAK (symbol obrączek) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Mówimy TAK</h3>
                  <p className="text-lg text-gray-600">14:00</p>
                </div>
                <div className="z-10">
                  <GiLinkedRings className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Event 2: 15:30 Powitanie i toast (symbol kieliszków) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8"></div>
                <div className="z-10">
                  <FaGlassCheers className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Powitanie i toast</h3>
                  <p className="text-lg text-gray-600">15:30</p>
                </div>
              </div>

              {/* Event 3: 16:00 Obiad (symbol ciepłego dania) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Obiad</h3>
                  <p className="text-lg text-gray-600">16:00</p>
                </div>
                <div className="z-10">
                  <FaUtensils className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Event 4: 17:00 Życzenia (symbol prezentów) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8"></div>
                <div className="z-10">
                  <FaGift className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Życzenia</h3>
                  <p className="text-lg text-gray-600">17:00</p>
                </div>
              </div>

              {/* Event 5: 18:00 Pierwszy taniec (symbol tańczącej pary) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Pierwszy taniec</h3>
                  <p className="text-lg text-gray-600">18:00</p>
                </div>
                <div className="z-10">
                  <FaUsers className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Event 6: 19:00 Tort (symbol tortu) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8"></div>
                <div className="z-10">
                  <FaBirthdayCake className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Tort</h3>
                  <p className="text-lg text-gray-600">19:00</p>
                </div>
              </div>

              {/* Event 7: 20:00 Niespodzianka (symbol otwartego prezentu) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Niespodzianka</h3>
                  <p className="text-lg text-gray-600">20:00</p>
                </div>
                <div className="z-10">
                  <FaBoxOpen className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Event 8: 20:30 - 23:00 Grill (symbol grilla) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8"></div>
                <div className="z-10">
                  <FaDrumstickBite className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Grill</h3>
                  <p className="text-lg text-gray-600">20:30 - 23:00</p>
                </div>
              </div>

              {/* Event 9: 00:00 Oczepiny (symbol bukietu) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Oczepiny</h3>
                  <p className="text-lg text-gray-600">00:00</p>
                </div>
                <div className="z-10">
                  <GiRose className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Event 10: 01:00 - 04:00 Kolacja II (symbol zastawy) */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8"></div>
                <div className="z-10">
                  <FaHamburger className="w-10 h-10 text-[#BF826B]" />
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-2xl font-serif mb-2 text-[#BF826B]">Kolacja II</h3>
                  <p className="text-lg text-gray-600">01:00 - 04:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
