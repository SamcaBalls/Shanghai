# Shanghai - Čínská restaurace

Moderní React web restaurace Shanghai v Ústí nad Labem.

## Instalace a spuštění

### 1. Nainstalujte závislosti
```bash
npm install
```

### 2. Spusťte vývojový server
```bash
npm run dev
```

Server se spustí na `http://localhost:3000`

### 3. Build pro produkci
```bash
npm run build
```

## Struktura projektu

```
src/
├── components/
│   ├── Header.jsx         # Navigace a hlavička
│   ├── Hero.jsx           # Úvodní sekce
│   ├── Gallery.jsx        # Galerie fotografií
│   ├── OpeningHours.jsx   # Otevírací doba
│   ├── Reservation.jsx    # Formulář pro rezervaci
│   ├── Contact.jsx        # Kontakt a mapa
│   └── Footer.jsx         # Patička
├── App.jsx                # Hlavní komponenta
├── index.css              # Globální styly
└── main.jsx               # Entry point
```

## Funkce

✅ Responzivní design (mobile, tablet, desktop)  
✅ Navigace v headeru  
✅ Úvodní sekce s call-to-action  
✅ Galerie s modalem pro zvětšené fotografie  
✅ Přehled otevírací doby (dnes zvýrazněno)  
✅ Formulář online rezervace s validací  
✅ Kontaktní informace a social links  
✅ Patička s rychlými odkazy  

## Poznámky

- Rezervační formulář nyní zobrazuje potvrzovací zprávu (bez emailu)
- Fotografie v galerii jsou nahrazeny emojis - nahraďte je svými obrázky
- Pro Google Maps integrujte do `Contact.jsx`
- Přidejte kontaktní informace (telefon, email, adresa)
- Social media odkazy upravte dle vašich profylů

## Budoucí rozšíření

- Online menu
- Online objednávky
- Vícejazyčná verze (CZ/EN)
- Backend pro zpracování rezervací (email notifikace)
