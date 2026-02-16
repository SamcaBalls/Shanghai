"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/cenik", label: "Ceník" },
  { href: "/vozovy-park", label: "Vozový park" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl tracking-tight">
          <span className="text-primary">Taxi</span>{" "}
          <span className={scrolled ? "text-accent" : "text-white"}>
            Ústí n. L.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                scrolled ? "text-accent" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="tel:+420777036926" className="btn-primary text-sm !py-2.5">
            +420 777 036 926
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute left-0 w-full h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                scrolled ? "bg-accent" : "bg-white"
              } ${menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                scrolled ? "bg-accent" : "bg-white"
              } ${menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                scrolled ? "bg-accent" : "bg-white"
              } ${menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full"}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        className={`md:hidden bg-white shadow-soft border-t border-black/5 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-transparent shadow-none"
        }`}
      >
        <div className="container-main py-4 flex flex-col gap-3">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-accent font-medium py-2 hover:text-primary transition-all duration-300 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+420777036926"
            className={`btn-primary text-sm text-center mt-2 transition-all duration-300 ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 50}ms` : "0ms",
            }}
          >
            +420 777 036 926
          </a>
        </div>
      </nav>
    </header>
  );
}
