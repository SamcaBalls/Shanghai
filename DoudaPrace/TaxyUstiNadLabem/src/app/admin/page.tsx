"use client";

import { useState, useEffect, useCallback } from "react";

type OrderStatus = "pending" | "accepted" | "rejected" | "completed";
type EmployeeRole = "admin" | "employee";
type AuthTab = "login" | "register";
type AdminSection = "orders" | "employees";

interface Order {
  id: number;
  from: string;
  to: string;
  date: string;
  name: string;
  phone: string;
  status: OrderStatus;
  handledBy: string | null;
  createdAt: string;
}

interface Employee {
  id: number;
  username: string;
  name: string;
  role: EmployeeRole;
  createdAt: string;
}

interface User {
  id: number;
  username: string;
  name: string;
  role: EmployeeRole;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Nová",
  accepted: "Přijatá",
  rejected: "Odmítnutá",
  completed: "Dokončená",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const FILTER_TABS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "Všechny", value: "all" },
  { label: "Nové", value: "pending" },
  { label: "Přijaté", value: "accepted" },
  { label: "Dokončené", value: "completed" },
  { label: "Odmítnuté", value: "rejected" },
];

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRegistrationPassword, setRegRegistrationPassword] = useState("");

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [loading, setLoading] = useState(false);

  // Admin section
  const [section, setSection] = useState<AdminSection>("orders");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  // Restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const authHeaders = useCallback((): HeadersInit => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = filter !== "all" ? `?status=${filter}` : "";
      const res = await fetch(`/api/orders${params}`, {
        headers: authHeaders(),
      });
      if (res.status === 401) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        return;
      }
      const data = await res.json();
      setOrders(data);
    } catch {
      /* empty */
    } finally {
      setLoading(false);
    }
  }, [token, filter, authHeaders]);

  const fetchEmployees = useCallback(async () => {
    if (!token || user?.role !== "admin") return;
    setEmployeesLoading(true);
    try {
      const res = await fetch("/api/employees", {
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    } catch {
      /* empty */
    } finally {
      setEmployeesLoading(false);
    }
  }, [token, user?.role, authHeaders]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, fetchOrders]);

  useEffect(() => {
    if (token && section === "employees" && user?.role === "admin") {
      fetchEmployees();
    }
  }, [token, section, user?.role, fetchEmployees]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Chyba přihlášení");
        return;
      }
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } catch {
      setAuthError("Chyba připojení k serveru");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: regUsername,
          name: regName,
          password: regPassword,
          registrationPassword: regRegistrationPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Chyba registrace");
        return;
      }
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    } catch {
      setAuthError("Chyba připojení k serveru");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    if (token) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: authHeaders(),
      });
    }
    setToken(null);
    setUser(null);
    setOrders([]);
    setEmployees([]);
    setSection("orders");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }

  async function updateStatus(id: number, status: OrderStatus) {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  }

  async function handleDeleteEmployee(id: number) {
    if (!confirm("Opravdu chcete smazat tohoto zaměstnance?")) return;
    const res = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) {
      fetchEmployees();
    } else {
      const data = await res.json();
      alert(data.error || "Chyba při mazání");
    }
  }

  async function handleChangeRole(id: number, newRole: EmployeeRole) {
    const res = await fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      fetchEmployees();
    }
  }

  function formatDate(dateStr: string) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("cs-CZ", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  }

  // Auth screen
  if (!token) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-soft p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-1">Administrace</h1>
          <p className="text-subtle-text text-sm mb-6">
            {authTab === "login"
              ? "Přihlaste se do svého účtu"
              : "Vytvořte si nový účet"}
          </p>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-black/10">
            <button
              onClick={() => {
                setAuthTab("login");
                setAuthError("");
              }}
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                authTab === "login"
                  ? "border-primary text-primary"
                  : "border-transparent text-subtle-text hover:text-black"
              }`}
            >
              Přihlášení
            </button>
            <button
              onClick={() => {
                setAuthTab("register");
                setAuthError("");
              }}
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                authTab === "register"
                  ? "border-primary text-primary"
                  : "border-transparent text-subtle-text hover:text-black"
              }`}
            >
              Registrace
            </button>
          </div>

          {authTab === "login" ? (
            <form onSubmit={handleLogin}>
              <label className="block text-sm font-medium mb-1.5">
                Uživatelské jméno
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                placeholder="Zadejte uživatelské jméno"
              />
              <label className="block text-sm font-medium mb-1.5">Heslo</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                placeholder="Zadejte heslo"
              />
              {authError && (
                <p className="text-red-600 text-sm mb-3">{authError}</p>
              )}
              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {authLoading ? "Přihlašuji..." : "Přihlásit"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <label className="block text-sm font-medium mb-1.5">Jméno</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                placeholder="Vaše celé jméno"
              />
              <label className="block text-sm font-medium mb-1.5">
                Uživatelské jméno
              </label>
              <input
                type="text"
                required
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                placeholder="Zvolte uživatelské jméno"
              />
              <label className="block text-sm font-medium mb-1.5">Heslo</label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                placeholder="Zvolte heslo"
              />
              <label className="block text-sm font-medium mb-1.5">
                Registrační heslo
              </label>
              <input
                type="password"
                required
                value={regRegistrationPassword}
                onChange={(e) => setRegRegistrationPassword(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-black/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                placeholder="Heslo od zaměstnavatele"
              />
              {authError && (
                <p className="text-red-600 text-sm mb-3">{authError}</p>
              )}
              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {authLoading ? "Registruji..." : "Registrovat"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Admin dashboard
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-muted">
      {/* Top bar */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-lg">
              <span className="text-primary">Taxi</span> Administrace
            </h1>
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingCount} nové
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-subtle-text">
              {user?.name}{" "}
              <span className="text-xs opacity-60">
                ({user?.role === "admin" ? "Admin" : "Zaměstnanec"})
              </span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-subtle-text hover:text-black transition-colors"
            >
              Odhlásit
            </button>
          </div>
        </div>
      </header>

      {/* Section tabs (orders / employees) */}
      {isAdmin && (
        <div className="bg-white border-b border-black/5">
          <div className="max-w-6xl mx-auto px-5 flex gap-1">
            <button
              onClick={() => setSection("orders")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                section === "orders"
                  ? "border-primary text-primary"
                  : "border-transparent text-subtle-text hover:text-black"
              }`}
            >
              Objednávky
            </button>
            <button
              onClick={() => setSection("employees")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                section === "employees"
                  ? "border-primary text-primary"
                  : "border-transparent text-subtle-text hover:text-black"
              }`}
            >
              Zaměstnanci
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-5 py-8">
        {section === "orders" ? (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === tab.value
                      ? "bg-primary text-white"
                      : "bg-white text-accent hover:bg-gray-50 border border-black/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={fetchOrders}
                className="ml-auto px-4 py-2 rounded-md text-sm font-medium bg-white border border-black/10 hover:bg-gray-50 transition-colors"
              >
                Obnovit
              </button>
            </div>

            {/* Orders */}
            {loading ? (
              <p className="text-subtle-text text-center py-12">Načítám...</p>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-12 text-center">
                <p className="text-subtle-text">Žádné objednávky</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-white rounded-xl shadow-soft p-5 border-l-4 ${
                      order.status === "pending"
                        ? "border-l-yellow-400"
                        : order.status === "accepted"
                        ? "border-l-green-400"
                        : order.status === "completed"
                        ? "border-l-blue-400"
                        : "border-l-red-400"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Order info */}
                      <div className="flex-1 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        <div>
                          <span className="text-xs text-subtle-text uppercase tracking-wide">
                            Odkud
                          </span>
                          <p className="font-medium">{order.from}</p>
                        </div>
                        <div>
                          <span className="text-xs text-subtle-text uppercase tracking-wide">
                            Kam
                          </span>
                          <p className="font-medium">{order.to}</p>
                        </div>
                        <div>
                          <span className="text-xs text-subtle-text uppercase tracking-wide">
                            Kdy
                          </span>
                          <p className="font-medium">{formatDate(order.date)}</p>
                        </div>
                        <div>
                          <span className="text-xs text-subtle-text uppercase tracking-wide">
                            Zákazník
                          </span>
                          <p className="font-medium">
                            {order.name}{" "}
                            <a
                              href={`tel:${order.phone}`}
                              className="text-primary hover:text-primary-dark"
                            >
                              {order.phone}
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* Status + actions */}
                      <div className="flex items-center gap-3 md:flex-col md:items-end">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            STATUS_COLORS[order.status]
                          }`}
                        >
                          {STATUS_LABELS[order.status]}
                        </span>
                        {order.handledBy && (
                          <span className="text-xs text-subtle-text">
                            {order.handledBy}
                          </span>
                        )}
                        <div className="flex gap-2">
                          {order.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(order.id, "accepted")
                                }
                                className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600 transition-colors"
                              >
                                Přijmout
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(order.id, "rejected")
                                }
                                className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition-colors"
                              >
                                Odmítnout
                              </button>
                            </>
                          )}
                          {order.status === "accepted" && (
                            <button
                              onClick={() =>
                                updateStatus(order.id, "completed")
                              }
                              className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Dokončit
                            </button>
                          )}
                        </div>
                        <span className="text-xs text-subtle-text">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Employees section */
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Správa zaměstnanců</h2>
              <button
                onClick={fetchEmployees}
                className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-black/10 hover:bg-gray-50 transition-colors"
              >
                Obnovit
              </button>
            </div>

            {employeesLoading ? (
              <p className="text-subtle-text text-center py-12">Načítám...</p>
            ) : employees.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-12 text-center">
                <p className="text-subtle-text">Žádní zaměstnanci</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/5">
                      <th className="text-left px-5 py-3 font-medium text-subtle-text">
                        Jméno
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-subtle-text">
                        Uživatelské jméno
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-subtle-text">
                        Role
                      </th>
                      <th className="text-left px-5 py-3 font-medium text-subtle-text">
                        Registrace
                      </th>
                      <th className="text-right px-5 py-3 font-medium text-subtle-text">
                        Akce
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="border-b border-black/5 last:border-b-0"
                      >
                        <td className="px-5 py-3 font-medium">{emp.name}</td>
                        <td className="px-5 py-3 text-subtle-text">
                          {emp.username}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                              emp.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {emp.role === "admin" ? "Admin" : "Zaměstnanec"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-subtle-text">
                          {formatDate(emp.createdAt)}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {emp.id !== user?.id && (
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() =>
                                  handleChangeRole(
                                    emp.id,
                                    emp.role === "admin"
                                      ? "employee"
                                      : "admin"
                                  )
                                }
                                className="px-3 py-1.5 bg-purple-500 text-white text-xs font-semibold rounded-md hover:bg-purple-600 transition-colors"
                              >
                                {emp.role === "admin"
                                  ? "Odebrat admin"
                                  : "Povýšit na admin"}
                              </button>
                              <button
                                onClick={() => handleDeleteEmployee(emp.id)}
                                className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition-colors"
                              >
                                Smazat
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
