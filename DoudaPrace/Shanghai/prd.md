# Product Requirements Document (PRD): MusicTutor

| Atribut | Detail |
| :--- | :--- |
| **Projekt** | MusicTutor (Pracovní název) |
| **Verze** | 1.0 (MVP) |
| **Datum** | 30. ledna 2026 |
| **Status** | Draft / Ke schválení |
| **Platforma** | Webová aplikace (Desktop & Mobile) |

---

## 1. Shrnutí (Executive Summary)
**MusicTutor** je online tržiště (marketplace), které efektivně propojuje studenty hudby s kvalifikovanými lektory hudebních nástrojů a zpěvu.

Cílem MVP (Minimum Viable Product) je odstranit třecí plochy v procesu hledání učitele, sjednávání termínů a plateb. Platforma centralizuje nabídku lektorů, poskytuje transparentní hodnocení a automatizuje administrativu spojenou s výukou.

## 2. Definice problému a Příležitost
### Problémy
* **Studenti:** Obtížné hledání kvalitních lektorů v lokaci, chybějící recenze, nutnost složité domluvy termínů přes telefon/SMS.
* **Lektoři:** Časté rušení lekcí na poslední chvíli (ztráta příjmu), neefektivní správa kalendáře, nutnost řešit marketing a platby v hotovosti.

### Řešení
Webová platforma umožňující vyhledávání, okamžitou rezervaci termínu a zabezpečenou platbu předem (escrow), což chrání obě strany.

## 3. Cílová skupina (User Personas)

### A. Student (Hledající)
* **Profil:** Začátečník nebo pokročilý hudebník, případně rodič hledající kroužek pro dítě.
* **Potřeby:** Chce rychle najít ověřeného učitele v okolí nebo online, vidět cenu a hodnocení.
* **Pain points:** Nedůvěra k inzerátům na bazarech, nejasná kvalita výuky.

### B. Lektor (Poskytovatel)
* **Profil:** Učitel ZUŠ, student konzervatoře, aktivní hudebník.
* **Potřeby:** Chce zaplnit volné kapacity, získat nové žáky bez nutnosti vlastní reklamy, mít jistotu platby.
* **Pain points:** Studenti, kteří nezaplatí nebo nepřijdou.

## 4. Funkční požadavky (Functional Requirements)

### 4.1 Autentizace a Správa účtů
| ID | Funkce | Popis | Priorita |
| :--- | :--- | :--- | :--- |
| **AUTH-01** | Registrace/Login | Email + Heslo, OAuth (Google, Facebook). | P1 |
| **AUTH-02** | Rozlišení rolí | Přepínač při registraci: "Chci učit" vs. "Chci se učit". | P1 |
| **AUTH-03** | Profil Lektora | Editace bio, vzdělání, nahraných médií (YouTube link), ceníku a lokality. | P1 |

### 4.2 Vyhledávání a Discovery
| ID | Funkce | Popis | Priorita |
| :--- | :--- | :--- | :--- |
| **SRCH-01** | Hlavní hledání | Fulltext input (nástroj) + Lokace (Město/PSČ). | P1 |
| **SRCH-02** | Filtry | Cena (rozsah), Úroveň (začátečník/pokročilý), Místo (U lektora/U žáka/Online). | P1 |
| **SRCH-03** | Výpis výsledků | Karty lektorů s fotkou, cenou, hodnocením a vzdáleností. | P1 |

### 4.3 Rezervační systém
| ID | Funkce | Popis | Priorita |
| :--- | :--- | :--- | :--- |
| **BOOK-01** | Dostupnost | Lektor definuje volné časové bloky v týdenním cyklu. | P1 |
| **BOOK-02** | Rezervace slotu | Student vybere volný slot v kalendáři lektora. | P1 |
| **BOOK-03** | Storno podmínky | Definice pravidel pro vrácení peněz (např. zrušení 24h předem = 100% refund). | P2 |

### 4.4 Platby
| ID | Funkce | Popis | Priorita |
| :--- | :--- | :--- | :--- |
| **PAY-01** | Platební brána | Integrace (Stripe/GoPay). Platba kartou při rezervaci. | P1 |
| **PAY-02** | Payouts | Vyplácení lektorů 1x měsíčně nebo na vyžádání (po odečtení provize). | P1 |
| **PAY-03** | Fakturace | Automatické generování dokladu o zaplacení pro studenta. | P2 |

### 4.5 Hodnocení a Trust
| ID | Funkce | Popis | Priorita |
| :--- | :--- | :--- | :--- |
| **REV-01** | Recenze | Textové hodnocení + hvězdičky (1-5). | P1 |
| **REV-02** | Validace | Recenzi může napsat pouze student, který absolvoval zaplacenou lekci. | P1 |

## 5. Nefunkční požadavky (Non-Functional Requirements)
* **Performance:** Načtení detailu lektora < 200 ms.
* **Security:** Veškerá komunikace přes HTTPS. Hesla hashována (bcrypt/Argon2). Soulad s GDPR.
* **Mobile-First:** Responzivní design optimalizovaný pro mobilní telefony.
* **Škálovatelnost:** Backend připraven na tisíce souběžných uživatelů.

## 6. Metriky úspěchu (KPIs)
1.  **Akvizice:** 50 aktivních lektorů do 1 měsíce od spuštění.
2.  **Engagement:** Průměrně 3 rezervované lekce na studenta měsíčně.
3.  **Monetizace:** GMV (Gross Merchandise Value) - celkový objem plateb přes platformu.

## 7. Technický Stack (Návrh)
* **Frontend:** Next.js (React) - kvůli SEO a rychlosti.
* **Backend:** Node.js (NestJS) nebo Python (FastAPI).
* **Databáze:** PostgreSQL (relační data), Redis (caching).
* **Infrastruktura:** Vercel (FE) + AWS/Render (BE + DB).
* **Mapy:** Mapbox nebo Google Maps API.

## 8. Roadmapa (Fáze vývoje)

### Fáze 1: MVP (Měsíc 1-3)
* Základní registrace a profily.
* Vyhledávání a filtrace.
* Jednoduchý kalendář a platby kartou.

### Fáze 2: Growth (Měsíc 4-6)
* Interní chat pro komunikaci před lekcí.
* Balíčky lekcí (např. 5+1 zdarma).
* Integrace kalendáře (Google Calendar Sync).

### Fáze 3: Scale (Měsíc 6+)
* Mobilní aplikace (iOS/Android).
* Video učebna (integrované videohovory).
* Dárkové poukazy.