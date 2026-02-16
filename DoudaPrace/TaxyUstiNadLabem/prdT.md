# PRD – Taxi Ústí nad Labem (Kompletní specifikace webu)

## 1. Přehled

### Cíl
Vytvořit moderní, minimalistický a vysoce konverzní web pro taxislužbu, který:
- maximalizuje počet telefonátů a objednávek
- působí luxusně a důvěryhodně
- funguje perfektně na mobilu

---

## 2. Branding

### Tone of voice
- profesionální
- stručný
- sebevědomý
- žádný cringe marketing

### Claim
> Taxi Ústí nad Labem – NONSTOP pohodlí bez kompromisů

---

## 3. Struktura webu

### Stránky:
- Home
- Ceník
- Vozový park
- Kontakt

---

## 4. HOMEPAGE (hlavní stránka)

### 4.1 Hero sekce

**Text:**
Taxi Ústí nad Labem  
NONSTOP taxislužba 24/7

**Podtext:**
Rychlá, pohodlná a spolehlivá doprava po Ústí i na letiště.

**CTA tlačítka:**
- Zavolat: +420 777 036 926
- Objednat jízdu

---

### 4.2 Výhody

- NONSTOP provoz
- Platba kartou
- Wi-Fi ve voze
- Komfortní vozy Škoda Superb
- Praxe od roku 1994

---

### 4.3 O nás

Taxislužba provozovaná Janem Čvirkem s dlouholetou tradicí od roku 1994.  
Zaměřujeme se na komfort, spolehlivost a férové ceny.

---

### 4.4 Rychlá objednávka

Formulář:
- Odkud
- Kam
- Datum a čas
- Jméno
- Telefon

Tlačítko:
- Objednat jízdu

---

## 5. CENÍK

### Město
- od 30 Kč / km

### Letiště (fixní ceny)
- Ústí nad Labem → Praha letiště: 2500 Kč
- Ústí nad Labem → Drážďany letiště: 2500 Kč

### Další info
- možnost platby kartou
- ceny jsou transparentní

---

## 6. VOZOVÝ PARK

### Hlavní vozidla
- Škoda Superb

### Vybavení
- klimatizace
- Wi-Fi
- velký zavazadlový prostor
- ozónová dezinfekce

### Text
Naše vozy splňují standardy první třídy.  
Důraz klademe na čistotu, pohodlí a bezpečnost.

---

## 7. KONTAKT

### Telefon
+420 777 036 926

### Provoz
NONSTOP

### Stanoviště
U hlavního nádraží  
U Nádraží, 400 01 Ústí nad Labem

### Funkce
- klikací telefon
- mapa (Google Maps embed)

---

## 8. UX / UI

### Design
- černá + bílá + jemný akcent (luxusní)
- hodně whitespace
- velká tlačítka

### UX principy
- objednávka do 30 sekund
- sticky tlačítko "Zavolat"
- mobile-first

---

## 9. TECHNICKÁ ARCHITEKTURA

### Frontend
- React (Next.js)
- TailwindCSS

### Backend
- Node.js (Express)

### API
REST

---

## 10. API SPECIFIKACE

### POST /api/order

Request:
{
  "from": "string",
  "to": "string",
  "date": "string",
  "name": "string",
  "phone": "string"
}

Response:
{
  "status": "ok"
}

---

## 11. DATABÁZE

### Kolekce: orders

- id
- from
- to
- date
- name
- phone
- createdAt

---

## 12. FUNKČNÍ LOGIKA

### Objednávka:
1. Uživatel vyplní formulář
2. Odešle se na backend
3. Uloží se do DB
4. Odešle se notifikace (SMS/email)

---

## 13. SEO

### Keywords
- taxi ústí nad labem
- taxi nonstop ústí
- taxi letiště praha
- taxi drážďany

### Požadavky
- SSR (Next.js)
- rychlost načítání
- meta description

---

## 14. BEZPEČNOST

- validace formuláře
- ochrana proti spamu (rate limit / captcha)
- HTTPS

---

## 15. MVP

### MUST
- homepage
- telefon
- formulář
- ceník

### OPTIONAL
- mapa
- galerie
- online platby

---

## 16. BUDOUCÍ ROZŠÍŘENÍ

- tracking řidiče
- mobilní aplikace
- zákaznické účty
- hodnocení

---

## 17. HLAVNÍ CÍL

Uživatel přijde → klikne → zavolá / objedná

