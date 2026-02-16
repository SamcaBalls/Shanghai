import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | Taxi Ústí nad Labem",
  description:
    "Zásady ochrany osobních údajů a informace o zpracování cookies na webu Taxi Ústí nad Labem.",
};

export default function OchranaOsobnichUdaju() {
  return (
    <div className="pb-16">
      <section className="bg-accent text-white pt-32 pb-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ochrana <span className="text-primary">osobních údajů</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Informace o zpracování osobních údajů dle GDPR
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-3xl mx-auto prose prose-gray">
          <div className="card !p-8 md:!p-10 space-y-8 text-sm leading-relaxed text-gray-700">
            <div>
              <h2 className="text-xl font-bold text-black mb-3">
                1. Správce osobních údajů
              </h2>
              <p>
                Správcem osobních údajů je provozovatel taxislužby Taxi Ústí nad
                Labem, IČ: 46782648, se sídlem U Nádraží, 400 01 Ústí nad
                Labem (dále jen &ldquo;Správce&rdquo;).
              </p>
              <p className="mt-2">
                Kontakt: e-mail{" "}
                <a
                  href="mailto:cvirkjan@centrum.cz"
                  className="text-primary hover:underline"
                >
                  cvirkjan@centrum.cz
                </a>
                , telefon{" "}
                <a
                  href="tel:+420777036926"
                  className="text-primary hover:underline"
                >
                  +420 777 036 926
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black mb-3">
                2. Jaké údaje zpracováváme
              </h2>
              <p>Při objednávce jízdy prostřednictvím formuláře zpracováváme:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  <strong>Jméno</strong> – pro identifikaci zákazníka
                </li>
                <li>
                  <strong>Telefonní číslo</strong> – pro kontaktování ohledně
                  objednávky
                </li>
                <li>
                  <strong>Místo vyzvednutí a cíl cesty</strong> – pro realizaci
                  přepravy
                </li>
                <li>
                  <strong>Datum a čas</strong> – pro naplánování jízdy
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black mb-3">
                3. Účel a právní základ zpracování
              </h2>
              <p>Osobní údaje zpracováváme na základě:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  <strong>Plnění smlouvy</strong> (čl. 6 odst. 1 písm. b) GDPR)
                  – údaje z objednávkového formuláře jsou nezbytné pro realizaci
                  přepravní služby.
                </li>
                <li>
                  <strong>Oprávněného zájmu</strong> (čl. 6 odst. 1 písm. f)
                  GDPR) – technické cookies nezbytné pro fungování webu.
                </li>
                <li>
                  <strong>Souhlasu</strong> (čl. 6 odst. 1 písm. a) GDPR) –
                  analytické cookies a další volitelné zpracování.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black mb-3">
                4. Doba uchovávání údajů
              </h2>
              <p>
                Osobní údaje z objednávek uchováváme po dobu nezbytnou pro
                realizaci přepravy a dále po dobu stanovenou právními předpisy
                (zejména daňovými a účetními), maximálně však 3 roky od
                provedení jízdy, pokud není zákonem stanoveno jinak.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black mb-3">
                5. Cookies
              </h2>
              <p>Tento web používá následující typy cookies:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  <strong>Nezbytné cookies</strong> – zajišťují základní
                  fungování webu (přihlášení, formuláře). Nelze je vypnout.
                </li>
                <li>
                  <strong>Analytické cookies</strong> – pomáhají nám pochopit,
                  jak návštěvníci web používají. Zpracovávají se pouze s vaším
                  souhlasem.
                </li>
              </ul>
              <p className="mt-2">
                Souhlas s cookies můžete kdykoli odvolat smazáním cookies ve
                vašem prohlížeči.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black mb-3">
                6. Vaše práva
              </h2>
              <p>Jako subjekt údajů máte právo:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>na přístup ke svým osobním údajům,</li>
                <li>na opravu nepřesných údajů,</li>
                <li>na výmaz údajů (&ldquo;právo být zapomenut&rdquo;),</li>
                <li>na omezení zpracování,</li>
                <li>na přenositelnost údajů,</li>
                <li>vznést námitku proti zpracování,</li>
                <li>
                  podat stížnost u Úřadu pro ochranu osobních údajů (
                  <a
                    href="https://www.uoou.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.uoou.cz
                  </a>
                  ).
                </li>
              </ul>
              <p className="mt-2">
                Pro uplatnění svých práv nás kontaktujte na{" "}
                <a
                  href="mailto:cvirkjan@centrum.cz"
                  className="text-primary hover:underline"
                >
                  cvirkjan@centrum.cz
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black mb-3">
                7. Předávání údajů třetím stranám
              </h2>
              <p>
                Osobní údaje nepředáváme žádným třetím stranám s výjimkou
                případů, kdy je to vyžadováno zákonem (např. orgány státní
                správy). Údaje nejsou předávány do třetích zemí mimo EU.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 text-xs text-gray-400">
              Poslední aktualizace: únor 2026
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
