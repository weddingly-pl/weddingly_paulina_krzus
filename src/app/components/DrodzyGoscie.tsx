"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function DrodzyGoscie() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-08-15T16:30:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24 flex flex-col md:flex-row items-center">
        {/* Left column - image with arch shape */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-16">
          <div className="relative w-full aspect-[3/4] rounded-t-full overflow-hidden">
            <Image
              src="/images/ZDJĘCIE4 - Klaudia.jpg"
              alt="Wedding couple"
              fill
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Right column - text and countdown */}
        <div className="w-full md:w-1/2 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-center md:text-center">Drodzy Goście</h2>
          <p className="text-[18px] text-gray-600 mb-12 leading-relaxed">
            Z radością zapraszamy Was na nasz ślub w 2026 roku!
            Będzie nam niezmiernie miło, jeśli uświetnicie ten wyjątkowy dzień swoją obecnością.
            Szczegóły znajdziecie poniżej!
          </p>

          {/* Elegant Countdown Timer */}
          <div className="font-serif">
            <div className="text-xl text-gray-600 italic mb-4 text-center md:text-center">
              Do naszego wielkiego dnia pozostało:
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl text-[var(--icon-color)]">{timeLeft.days}</span>
                <span className="text-sm text-gray-600">dni</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl text-[var(--icon-color)]">{timeLeft.hours}</span>
                <span className="text-sm text-gray-600">godzin</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl text-[var(--icon-color)]">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-sm text-gray-600">minut</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl text-[var(--icon-color)]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-sm text-gray-600">sekund</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
