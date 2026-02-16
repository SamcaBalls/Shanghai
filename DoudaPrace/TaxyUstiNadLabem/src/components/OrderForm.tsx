"use client";

import { useState, useMemo, useRef, useEffect } from "react";

function getMinDateTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

const PLACES = [
  // Letiště
  "Letiště Praha",
  "Letiště Drážďany",
  // Ústecký kraj – města a obce
  "Ústí nad Labem",
  "Děčín",
  "Teplice",
  "Most",
  "Chomutov",
  "Litoměřice",
  "Louny",
  "Žatec",
  "Kadaň",
  "Jirkov",
  "Klášterec nad Ohří",
  "Bílina",
  "Duchcov",
  "Krupka",
  "Roudnice nad Labem",
  "Lovosice",
  "Rumburk",
  "Varnsdorf",
  "Šluknov",
  "Česká Kamenice",
  "Benešov nad Ploučnicí",
  "Štětí",
  "Litvínov",
  "Meziboří",
  "Osek",
  "Dubí",
  "Podbořany",
  "Postoloprty",
  "Třebenice",
  "Libochovice",
  "Budyně nad Ohří",
  "Terezín",
  "Libouchec",
  "Velké Březno",
  "Chabařovice",
  "Trmice",
  "Řehlovice",
  "Stráž nad Ohří",
  "Vejprty",
  "Kovářská",
  "Hora Svatého Šebestiána",
  "Měděnec",
  "Perštejn",
  "Vilémov",
  "Česká Lípa",
  "Nový Bor",
  "Jiříkov",
  "Mikulášovice",
  "Krásná Lípa",
  "Chřibská",
  "Dolní Poustevna",
  "Hřensko",
  "Jílové",
  "Malšovice",
  "Huntířov",
  "Arnoltice",
  "Tisá",
  "Petrovice",
  "Telnice",
  "Modlany",
  "Bořislav",
  "Háj u Duchcova",
  "Hostomice",
  "Lahošť",
  "Kostomlaty pod Milešovkou",
  "Proboštov",
  "Novosedlice",
  "Oldřichov",
  "Světec",
  "Kladruby",
  "Ohníč",
  "Lom",
  "Obrnice",
  "Havraň",
  "Braňany",
  "Mariánské Radčice",
  "Patokryje",
  "Lišnice",
  "Želenice",
  "Bečov",
  "Jeníkov",
];

function filterPlaces(query: string): string[] {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return PLACES.filter((p) =>
    p.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q)
  ).slice(0, 6);
}

function PlaceInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  className: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef(false);

  useEffect(() => {
    setActive(-1);
  }, [suggestions]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(place: string) {
    skipRef.current = true;
    onChange(place);
    setOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    onChange(val);
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }
    if (val.length >= 1) {
      setSuggestions(filterPlaces(val));
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      select(suggestions[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        required
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-black/10 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((place, i) => (
            <li
              key={place}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                i === active
                  ? "bg-primary/10 text-black"
                  : "hover:bg-gray-50"
              }`}
              onMouseDown={() => select(place)}
              onMouseEnter={() => setActive(i)}
            >
              {place}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function OrderForm() {
  const minDateTime = useMemo(() => getMinDateTime(), []);
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    name: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ from: "", to: "", date: "", name: "", phone: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full h-12 px-4 bg-white border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

  return (
    <section id="objednavka" className="section-padding bg-white">
      <div className="container-main">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rychlá <span className="text-primary">objednávka</span>
            </h2>
            <p className="text-subtle-text">
              Vyplňte formulář a my se vám ozveme. Nebo nám rovnou zavolejte.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card !p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Odkud
                </label>
                <PlaceInput
                  placeholder="Adresa vyzvednutí"
                  className={inputClass}
                  value={form.from}
                  onChange={(val) => setForm({ ...form, from: val })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Kam</label>
                <PlaceInput
                  placeholder="Cílová adresa"
                  className={inputClass}
                  value={form.to}
                  onChange={(val) => setForm({ ...form, to: val })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Datum a čas
              </label>
              <input
                type="datetime-local"
                required
                min={minDateTime}
                className={inputClass}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Jméno
                </label>
                <input
                  type="text"
                  required
                  placeholder="Vaše jméno"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Telefon
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+420 ..."
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-subtle-text">
              <input type="checkbox" required className="mt-0.5 accent-primary" />
              <span>
                Souhlasím se{" "}
                <a
                  href="/ochrana-osobnich-udaju"
                  target="_blank"
                  className="text-primary underline hover:text-primary-dark"
                >
                  zpracováním osobních údajů
                </a>{" "}
                za účelem vyřízení objednávky.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full !py-4 text-base mt-2"
            >
              {status === "sending" ? "Odesílání..." : "Objednat jízdu"}
            </button>

            {status === "ok" && (
              <p className="text-success text-sm text-center font-medium">
                Objednávka odeslána! Brzy se vám ozveme.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm text-center font-medium">
                Něco se pokazilo. Zkuste to znovu nebo nám zavolejte.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
