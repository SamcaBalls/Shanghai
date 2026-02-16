import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ceník | Taxi Ústí nad Labem",
  description:
    "Ceník taxislužby v Ústí nad Labem. Od 30 Kč/km ve městě, letiště Praha a Drážďany za 2 500 Kč.",
};

const prices = [
  {
    title: "Jízda po městě",
    price: "od 30 Kč/km",
    desc: "Standardní jízda po Ústí nad Labem a okolí.",
  },
  {
    title: "Letiště Praha",
    price: "2 500 Kč",
    desc: "Fixní cena za cestu Ústí nad Labem – Praha letiště.",
  },
  {
    title: "Letiště Drážďany",
    price: "2 500 Kč",
    desc: "Fixní cena za cestu Ústí nad Labem – Drážďany letiště.",
  },
];

export default function Cenik() {
  return (
    <div className="pb-16">
      {/* Header */}
      <section className="bg-accent text-white pt-32 pb-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Ceník</span> služeb
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Transparentní ceny bez skrytých poplatků. Platba hotově i kartou.
          </p>
        </div>
      </section>

      {/* Prices */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {prices.map((p) => (
              <div
                key={p.title}
                className="card text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="font-semibold text-lg mb-3">{p.title}</h3>
                <p className="text-3xl font-bold text-primary mb-3">
                  {p.price}
                </p>
                <p className="text-subtle-text text-sm">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="max-w-2xl mx-auto mt-12 card !p-8">
            <h2 className="text-2xl font-bold mb-4">Platební podmínky</h2>
            <ul className="space-y-3">
              {[
                "Přijímáme platbu hotově i platební kartou",
                "Ceny jsou konečné, bez skrytých příplatků",
                "U delších tras nabízíme individuální cenovou nabídku",
                "Pro pravidelné zákazníky poskytujeme zvýhodněné ceny",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-subtle-text mb-4">
              Potřebujete individuální nabídku?
            </p>
            <a href="tel:+420777036926" className="btn-primary">
              Zavolejte nám
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
