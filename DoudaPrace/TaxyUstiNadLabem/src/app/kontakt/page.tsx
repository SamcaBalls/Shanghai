import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Taxi Ústí nad Labem",
  description:
    "Kontaktujte taxislužbu v Ústí nad Labem. Telefon +420 777 036 926, NONSTOP provoz, stanoviště u hlavního nádraží.",
};

export default function Kontakt() {
  return (
    <div className="pb-16">
      {/* Header */}
      <section className="bg-accent text-white pt-32 pb-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Kontakt</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Jsme tu pro vás 24 hodin denně, 7 dní v týdnu.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="card !p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <a
                      href="tel:+420777036926"
                      className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                      +420 777 036 926
                    </a>
                    <p className="text-subtle-text text-sm mt-1">
                      Klikněte pro zavolání
                    </p>
                  </div>
                </div>
              </div>

              <div className="card !p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Provozní doba</h3>
                    <p className="text-lg font-bold text-primary">NONSTOP</p>
                    <p className="text-subtle-text text-sm mt-1">
                      24 hodin denně, 7 dní v týdnu, 365 dní v roce
                    </p>
                  </div>
                </div>
              </div>

              <div className="card !p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <a
                      href="mailto:cvirkjan@centrum.cz"
                      className="text-lg font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                      cvirkjan@centrum.cz
                    </a>
                    <p className="text-subtle-text text-sm mt-1">
                      Napište nám e-mail
                    </p>
                  </div>
                </div>
              </div>

              <div className="card !p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Stanoviště</h3>
                    <p className="font-medium">U hlavního nádraží</p>
                    <p className="text-subtle-text text-sm mt-1">
                      U Nádraží, 400 01 Ústí nad Labem
                    </p>
                  </div>
                </div>
              </div>

              <a href="tel:+420777036926" className="btn-primary w-full text-center text-lg !py-4">
                Zavolat teď
              </a>
            </div>

            {/* Map */}
            <div className="card !p-2 h-[450px] md:h-auto">
              <iframe
                src="https://maps.google.com/maps?q=U+N%C3%A1dra%C5%BE%C3%AD,+%C3%9Ast%C3%AD+nad+Labem-m%C4%9Bsto&z=17&output=embed&hl=cs"
                className="w-full h-full rounded-lg"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Stanoviště taxi u hlavního nádraží v Ústí nad Labem"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
