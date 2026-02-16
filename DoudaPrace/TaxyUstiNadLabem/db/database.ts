import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db", "orders.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        "from" TEXT NOT NULL,
        "to" TEXT NOT NULL,
        date TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
    // Add status column if it doesn't exist (migration for existing DB)
    const columns = db.prepare("PRAGMA table_info(orders)").all() as { name: string }[];
    if (!columns.some((c) => c.name === "status")) {
      db.exec(`ALTER TABLE orders ADD COLUMN status TEXT NOT NULL DEFAULT 'pending'`);
    }
    if (!columns.some((c) => c.name === "handledBy")) {
      db.exec(`ALTER TABLE orders ADD COLUMN handledBy TEXT`);
    }

    // Employees table
    db.exec(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        passwordHash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'employee',
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // Sessions table
    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE NOT NULL,
        employeeId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE
      )
    `);
  }
  return db;
}

export type OrderStatus = "pending" | "accepted" | "rejected" | "completed";

export interface Order {
  from: string;
  to: string;
  date: string;
  name: string;
  phone: string;
}

export interface OrderRow extends Order {
  id: number;
  status: OrderStatus;
  handledBy: string | null;
  createdAt: string;
}

export function createOrder(order: Order) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO orders ("from", "to", date, name, phone) VALUES (?, ?, ?, ?, ?)`
  );
  const result = stmt.run(order.from, order.to, order.date, order.name, order.phone);
  return result.lastInsertRowid;
}

export function getOrders(status?: OrderStatus): OrderRow[] {
  const db = getDb();
  if (status) {
    return db
      .prepare(`SELECT * FROM orders WHERE status = ? ORDER BY createdAt DESC`)
      .all(status) as OrderRow[];
  }
  return db
    .prepare(`SELECT * FROM orders ORDER BY createdAt DESC`)
    .all() as OrderRow[];
}

export function updateOrderStatus(id: number, status: OrderStatus, handledBy?: string): boolean {
  const db = getDb();
  const result = db
    .prepare(`UPDATE orders SET status = ?, handledBy = ? WHERE id = ?`)
    .run(status, handledBy ?? null, id);
  return result.changes > 0;
}

// ---- Employees ----

export type EmployeeRole = "admin" | "employee";

export interface EmployeeRow {
  id: number;
  username: string;
  name: string;
  passwordHash: string;
  role: EmployeeRole;
  createdAt: string;
}

export function createEmployee(
  username: string,
  name: string,
  passwordHash: string,
  role: EmployeeRole = "employee"
): number {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO employees (username, name, passwordHash, role) VALUES (?, ?, ?, ?)`
    )
    .run(username, name, passwordHash, role);
  return result.lastInsertRowid as number;
}

export function getEmployeeByUsername(username: string): EmployeeRow | undefined {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM employees WHERE username = ?`)
    .get(username) as EmployeeRow | undefined;
}

export function getEmployeeById(id: number): EmployeeRow | undefined {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM employees WHERE id = ?`)
    .get(id) as EmployeeRow | undefined;
}

export function getEmployees(): Omit<EmployeeRow, "passwordHash">[] {
  const db = getDb();
  return db
    .prepare(`SELECT id, username, name, role, createdAt FROM employees ORDER BY createdAt DESC`)
    .all() as Omit<EmployeeRow, "passwordHash">[];
}

export function deleteEmployee(id: number): boolean {
  const db = getDb();
  // Also delete sessions for this employee
  db.prepare(`DELETE FROM sessions WHERE employeeId = ?`).run(id);
  const result = db.prepare(`DELETE FROM employees WHERE id = ?`).run(id);
  return result.changes > 0;
}

export function updateEmployeeRole(id: number, role: EmployeeRole): boolean {
  const db = getDb();
  const result = db
    .prepare(`UPDATE employees SET role = ? WHERE id = ?`)
    .run(role, id);
  return result.changes > 0;
}

export function getEmployeeCount(): number {
  const db = getDb();
  const row = db.prepare(`SELECT COUNT(*) as count FROM employees`).get() as { count: number };
  return row.count;
}

// ---- Sessions ----

export function createSession(token: string, employeeId: number): void {
  const db = getDb();
  db.prepare(`INSERT INTO sessions (token, employeeId) VALUES (?, ?)`).run(
    token,
    employeeId
  );
}

export function getSession(
  token: string
): Omit<EmployeeRow, "passwordHash"> | undefined {
  const db = getDb();
  return db
    .prepare(
      `SELECT e.id, e.username, e.name, e.role, e.createdAt
       FROM sessions s JOIN employees e ON s.employeeId = e.id
       WHERE s.token = ?`
    )
    .get(token) as Omit<EmployeeRow, "passwordHash"> | undefined;
}

export function deleteSession(token: string): boolean {
  const db = getDb();
  const result = db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
  return result.changes > 0;
}
