# Shanghai - Čínská restaurace

Moderní React web restaurace Shanghai s admin panelem a databází.

## Struktura projektu

```
.
├── src/                  # Frontend (React)
├── server/              # Backend (Node.js + SQLite)
└── README.md
```

## Instalace a spuštění

### 1. Frontend (React)

```bash
# V hlavní složce projektu
npm install
npm run dev
```

Server se spustí na `http://localhost:3000`

### 2. Backend (Node.js)

V **novém terminálu**:

```bash
cd server
npm install
npm start
```

Server se spustí na `http://localhost:5000`

## Jak to funguje

1. **Zákazníci** vyplní formulář "Rezervace online" na webu
2. Data se uloží do SQLite databáze přes REST API
3. **Admin panel** (👨‍💼 v headeru) načte všechny rezervace z databáze
4. **Zaměstnanci** mohou rezervace přesouvat mezi stavy a spravovat je

## Admin Panel

- **Přihlášení**: Heslo = `shanghai123`
- **Kanban Board** se třemi sloupci:
  - 📋 Nadcházející
  - ⏳ V průběhu
  - ✅ Hotovo

## API Endpoints

- `GET /api/reservations` - Načíst všechny rezervace
- `POST /api/reservations` - Vytvořit novou rezervaci
- `PATCH /api/reservations/:id/status` - Aktualizovat stav
- `DELETE /api/reservations/:id` - Smazat rezervaci

## Databáze

SQLite databáze se vytváří automaticky v `server/database.db`

Struktura tabulky:
```sql
CREATE TABLE reservations (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  date TEXT,
  time TEXT,
  guests INTEGER,
  note TEXT,
  status TEXT ('upcoming', 'in-progress', 'completed'),
  created_at DATETIME,
  updated_at DATETIME
)
```

## Vývoj

Spusťte oba servery současně v různých terminálech:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server && npm run dev
```

## Budoucí rozšíření

- Email notifikace o rezervacích
- Automatické SMS potvrzení
- Online menu
- Online objednávky
