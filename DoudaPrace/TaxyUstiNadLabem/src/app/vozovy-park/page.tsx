import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vozový park | Taxi Ústí nad Labem",
  description:
    "Naše vozy Škoda Superb nabízí maximální komfort – klimatizace, Wi-Fi, velký zavazadlový prostor a ozónová dezinfekce.",
};

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Klimatizace",
    desc: "Automatická dvouzónová klimatizace pro příjemnou teplotu během celého roku.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
      </svg>
    ),
    title: "Wi-Fi",
    desc: "Bezplatné připojení k internetu během celé jízdy.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Velký zavazadlový prostor",
    desc: "Škoda Superb nabízí jeden z největších kufrů ve své třídě – 625 litrů.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Ozónová dezinfekce",
    desc: "Pravidelná dezinfekce interiéru ozónem pro maximální hygienu a čistotu.",
  },
];

export default function VozovyPark() {
  return (
    <div className="pb-16">
      {/* Header */}
      <section className="bg-accent text-white pt-32 pb-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vozový <span className="text-primary">park</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Cestujte s maximálním komfortem. Naše vozy splňují standardy první
            třídy.
          </p>
        </div>
      </section>

      {/* Main car */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-soft bg-white flex items-center justify-center p-6">
              <img
                src="/images/SkodaSuperb.jpg"
                alt="Škoda Superb – náš vůz"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Škoda <span className="text-primary">Superb</span>
              </h2>
              <p className="text-subtle-text leading-relaxed mb-6">
                Naše vozy splňují standardy první třídy. Důraz klademe na
                čistotu, pohodlí a bezpečnost. Škoda Superb nabízí prostorný
                interiér, tichý chod a prémiový komfort pro každou cestu.
              </p>
              <a href="tel:+420777036926" className="btn-primary">
                Objednat jízdu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-muted">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-center mb-10">
            Vybavení <span className="text-primary">vozů</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <div
                key={f.title}
                className="card text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-subtle-text text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
