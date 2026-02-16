export default function CTAStrip() {
  return (
    <section className="py-16 bg-accent text-white relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(244,180,0,0.15),transparent_50%)]" />

      <div className="container-main relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Potřebujete <span className="text-primary">taxi</span>?
        </h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Zavolejte nám a za pár minut jsme u vás. Jednoduše a dostupně.
        </p>
        <a href="tel:+420777036926" className="btn-primary text-lg">
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
          +420 777 036 926
        </a>
      </div>
    </section>
  );
}
