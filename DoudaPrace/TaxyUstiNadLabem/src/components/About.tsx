export default function About() {
  return (
    <section className="section-padding bg-muted">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-soft">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-white font-bold px-5 py-3 rounded-lg shadow-btn text-sm">
              Od roku 1994
            </div>
          </div>

          {/* Text side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Důvěryhodná taxislužba
              <br />
              <span className="text-primary">s tradicí</span>
            </h2>
            <p className="text-subtle-text mb-6 leading-relaxed">
              Taxislužba provozovaná Janem Čvirkem s dlouholetou tradicí od roku
              1994. Zaměřujeme se na komfort, spolehlivost a férové ceny.
              Přepravíme vás kamkoli po městě i mimo něj.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Spolehlivost a dochvilnost",
                "Komfortní vozy Škoda Superb",
                "Transparentní ceny bez skrytých poplatků",
                "Přeprava na letiště Praha i Drážďany",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <a href="/kontakt" className="btn-primary">
              Kontaktujte nás
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
