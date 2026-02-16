import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-accent text-white/80 pt-12 pb-6">
      <div className="container-main">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              <span className="text-primary">Taxi</span> Ústí nad Labem
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              NONSTOP taxislužba s tradicí od roku 1994. Komfortní přeprava po
              městě i na letiště.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Rychlé odkazy</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Domů" },
                { href: "/cenik", label: "Ceník" },
                { href: "/vozovy-park", label: "Vozový park" },
                { href: "/kontakt", label: "Kontakt" },
                { href: "/ochrana-osobnich-udaju", label: "Ochrana osobních údajů" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Kontakt</h4>
            <div className="space-y-2 text-sm text-white/50">
              <p>
                <a
                  href="tel:+420777036926"
                  className="hover:text-primary transition-colors"
                >
                  +420 777 036 926
                </a>
              </p>
              <p>
                <a
                  href="mailto:cvirkjan@centrum.cz"
                  className="hover:text-primary transition-colors"
                >
                  cvirkjan@centrum.cz
                </a>
              </p>
              <p>NONSTOP provoz</p>
              <p>
                Stanoviště: U hlavního nádraží
                <br />
                Ústí nad Labem
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/30">
          <p>
            &copy; {new Date().getFullYear()} Taxi Ústí nad Labem | IČ:
            46782648. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
