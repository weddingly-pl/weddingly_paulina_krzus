"use client";
import React from "react";

export default function Muzyka() {
  return (
    <section className="py-24 bg-[var(--background-color)]">
      <div className="container mx-auto px-12 md:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Muzyka</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Przygotowaliśmy dla Was playlistę z utworami, które będą towarzyszyć nam podczas tego wyjątkowego dnia.
          </p>
        </div>

        {/* Spotify Embed */}
        <div id="muzyka" className="max-w-3xl mx-auto rounded-2xl overflow-hidden">
          <iframe 
            style={{ borderRadius: "12px" }} 
            src="https://open.spotify.com/embed/playlist/4tol5bz10FMGSZzzy8rvKK" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}