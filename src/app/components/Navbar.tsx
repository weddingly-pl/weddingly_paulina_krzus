"use client";
import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isDrawerOpen, setIsDrawerOpen }: NavbarProps) {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setShowNavbar(currentScrollY <= lastScrollY);
      if (isDrawerOpen && currentScrollY !== lastScrollY) {
        setIsDrawerOpen(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDrawerOpen, setIsDrawerOpen]);

  const navItems = [
    { href: "#data-miejsce", text: "Data i miejsce" },
    { href: "#dysk", text: "Dysk" },
    { href: "#muzyka", text: "Muzyka" },
    { href: "#kontakt", text: "Kontakt" },
    { href: "#faq", text: "FAQ" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsDrawerOpen(false);
  };

  return (
    <header
      className={`fixed w-full py-6 backdrop-blur-md bg-[var(--background-color)] border-b border-[#293238]/10 transition-transform duration-300 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto px-12 md:px-24 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-[#293238] font-medium flex items-center gap-2">
          <Image
            src="/vectors/weddingly_symbol.svg"
            alt="Weddingly Logo"
            width={32}
            height={32}
          />
          K & D
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 font-serif text-base">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-[#293238] hover:text-[var(--primary-hover)] transition-colors font-medium"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a 
            href="#rsvp" 
            onClick={(e) => scrollToSection(e, '#rsvp')}
            className="font-serif text-base px-6 py-2 btn-cta rounded-full"
          >
            Potwierdź obecność
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-[70]"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-6 w-6 text-[#293238]" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-[#293238]" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 left-0 w-full h-screen bg-[var(--background-color)] backdrop-blur-md z-[60] transform transition-all duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isDrawerOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="min-h-screen flex flex-col px-6 md:px-12 pt-24 pb-12">
          {/* Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-6 text-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="block text-xl font-serif text-[#293238] hover:text-[var(--primary-hover)] transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#rsvp" 
                  onClick={(e) => scrollToSection(e, '#rsvp')}
                  className="block w-full text-[18px] font-serif px-6 py-3 btn-cta rounded-full text-center"
                >
                  Potwierdź obecność
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
