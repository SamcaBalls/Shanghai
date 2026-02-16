"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Jak si mohu objednat taxi?",
    a: "Zavolejte nám na +420 777 036 926, případně vyplňte objednávkový formulář na našem webu. Jsme k dispozici 24/7.",
  },
  {
    q: "Jaké jsou vaše ceny?",
    a: "Jízda po městě stojí od 30 Kč/km. Na letiště Praha nebo Drážďany nabízíme fixní cenu 2 500 Kč. Ceny jsou transparentní a bez skrytých poplatků.",
  },
  {
    q: "Mohu platit kartou?",
    a: "Ano, přijímáme platební karty. Samozřejmě můžete platit i hotově.",
  },
  {
    q: "Jakými auty jezdíte?",
    a: "Jezdíme vozy Škoda Superb s klimatizací, Wi-Fi a velkým zavazadlovým prostorem. Vozy pravidelně dezinfikujeme ozónem.",
  },
  {
    q: "Jezdíte i mimo Ústí nad Labem?",
    a: "Ano, zajišťujeme přepravu po celé ČR i do zahraničí. Nejčastěji na letiště Praha a Drážďany.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-muted">
      <div className="container-main">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Časté <span className="text-primary">dotazy</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card !p-0 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-black/[0.02] transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-subtle-text flex-shrink-0 ml-4 transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-subtle-text text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
