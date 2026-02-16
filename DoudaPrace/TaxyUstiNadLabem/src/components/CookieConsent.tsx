"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-accent/95 backdrop-blur-sm border-t border-white/10 p-4 md:p-6">
      <div className="container-main flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/80 flex-1">
          Tento web používá cookies pro zajištění správného fungování stránek.
          Více informací najdete v{" "}
          <Link
            href="/ochrana-osobnich-udaju"
            className="text-primary underline hover:text-primary-dark"
          >
            zásadách ochrany osobních údajů
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-white/60 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
          >
            Odmítnout
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-primary text-black font-semibold rounded-md hover:bg-primary-dark transition-colors"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}
