export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/TaxiHero.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container-main relative z-10 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            NONSTOP taxislužba 24/7
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Taxi Ústí
            <br />
            <span className="text-primary">nad Labem</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
            Rychlá, pohodlná a spolehlivá doprava po Ústí i na letiště.
            Provozujeme komfortní vozy Škoda Superb s tradicí od roku 1994.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+420777036926" className="btn-primary text-base">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Zavolat teď
            </a>
            <a href="#objednavka" className="btn-secondary !text-white !border-white/20 hover:!bg-white/10">
              Objednat jízdu
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
