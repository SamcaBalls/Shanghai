# Restaurace Shangai - Landing Page

Moderní responzivní landing page pro restauraci Shangai v Ústí nad Labem, vytvořená v Reactu.

## Funkce

- **Hero sekce** s atraktivním pozadím a CTA tlačítkem
- **O restauraci** s informacemi o historii a vlastnostech
- **Galerie** s lightboxem pro zobrazení fotek
- **Otevírací doba** s přehledným zobrazením
- **Rezervační formulář** s validací
- **Kontakt** s mapou a sociálními sítěmi
- **Footer** s důležitými odkazy

## Technologie

- React 18
- Styled Components
- React Icons
- Responzivní design
- Animace při scrollu

## Instalace

1. Nainstalujte závislosti:
```bash
npm install
```

2. Spusťte vývojový server:
```bash
npm start
```

3. Otevřete http://localhost:3000 v prohlížeči

## Produkční build

```bash
npm run build
```

## Barevné schéma

Stránka používá tradiční čínské barvy:
- Červená (#d4af37 - zlatá pro akcenty)
- Černá (#1a1a1a, #000 - pozadí)
- Tmavě hnědá (#2d1810 - sekundární pozadí)

## Struktura komponent

```
src/
├── components/
│   ├── Hero.js          - Hlavní sekce
│   ├── About.js         - O restauraci
│   ├── Gallery.js       - Galerie s lightboxem
│   ├── OpeningHours.js  - Otevírací doba
│   ├── Reservation.js   - Rezervační formulář
│   ├── Contact.js       - Kontakt a mapa
│   ├── Footer.js        - Patička
│   └── Navigation.js    - Navigační menu
├── App.js               - Hlavní komponenta
├── index.js             - Entry point
└── index.css            - Globální styly
```

## Responzivita

Stránka je plně responzivní a optimalizovaná pro:
- Mobilní telefony
- Tablety
- Desktopové prohlížeče

## SEO optimalizace

- Meta tagy pro vyhledávače
- Alt tagy u obrázků
- Sémantická HTML struktura
- Rychlé načítání (<3s)
