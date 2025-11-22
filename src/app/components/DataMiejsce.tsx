"use client";
import React from "react";
import { CalendarDaysIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

export default function DataMiejsce() {
  return (
    <section id="data-miejsce" className="py-12 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24">
        {/* Invitation-style header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-center mt-6">Data i miejsce</h2>
        </div>

        {/* Elegant date display */}
        <div className="text-center mb-16 relative max-w-4xl mx-auto px-4 md:px-0">
          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 -translate-x-1/4">
            <Image
              src="/vectors/deco_1.svg"
              alt="Decorative element"
              width={160}
              height={160}
              className="w-full h-full"
            />
          </div>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 translate-x-1/4">
            <Image
              src="/vectors/deco_1.svg"
              alt="Decorative element"
              width={160}
              height={160}
              className="w-full h-full transform scale-x-[-1]"
            />
          </div>
          
          <div className="inline-flex flex-col items-center w-full md:w-auto">
            <div className="w-full border-t border-gray-300 mb-4"></div>
            <div className="grid grid-cols-3 items-center w-full max-w-2xl mx-auto py-2 md:py-2">
              <div className="text-lg md:text-[24px] font-serif text-center">SOBOTA</div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl md:text-8xl font-serif leading-none">15</div>
                <div className="text-xl md:text-2xl font-serif mt-2">2026</div>
              </div>
              <div className="text-lg md:text-[24px] font-serif text-center">SIERPNIA</div>
            </div>
            <div className="w-full border-t border-b border-gray-300 mt-4"></div>
          </div>
        </div>

        {/* Map Container with elegant styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif mb-2 md:mb-3">Ślub</h3>
              <p className="text-lg md:text-xl text-gray-600 font-serif">Parafia Matki Bożej Królowej Polski Marki-Pustelnik</p>
              <p className="text-base md:text-lg text-gray-500">Jutrzenki 26, 05-270 Marki</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4099.236831932382!2d21.113096909317875!3d52.34465278509527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecf7b345212e3%3A0xaf957392cf103372!2sParafia%20Matki%20Bo%C5%BCej%20Kr%C3%B3lowej%20Polski%20Marki-Pustelnik!5e0!3m2!1spl!2spl!4v1763757150649!5m2!1spl!2spl" 
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>





          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif mb-2 md:mb-3">Wesele</h3>
              <p className="text-lg md:text-xl text-gray-600 font-serif">Mała Stajnia (sala w Cichej 23)</p>
              <p className="text-base md:text-lg text-gray-500">Cicha 23, 05-270 Marki</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2049.7729147651617!2d21.127834095011913!3d52.34132004622192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecf5ed0a3365f%3A0xf9e910085e8ae538!2sCicha%2023%20%7C%20Event%20Place%20-%20Przestrze%C5%84%20Eventowa!5e0!3m2!1spl!2spl!4v1763757235112!5m2!1spl!2spl"
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
