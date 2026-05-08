// ============================================================
// PIPELINE FUNCIONAL PURO — logs.js (inline)
//
// REGRAS:
//   ✗ Nenhum loop for ou while
//   ✗ Nenhuma variável global mutável
//   ✓ Apenas funções puras e de alta ordem
//   ✓ Transparência referencial garantida
// ============================================================

// --- Dados imutáveis (Object.freeze) ---
const IPS = Object.freeze([
  '192.168.1.10', '10.0.0.5', '172.16.0.3',
  '203.0.113.7', '198.51.100.2', '10.10.5.22', '192.168.2.99',
]);
const ROUTES = Object.freeze([
  '/api/users', '/api/products', '/api/orders',
  '/login', '/dashboard', '/api/health',
  '/api/auth', '/static/main.js',
]);
const METHODS = Object.freeze(['GET', 'GET', 'GET', 'POST', 'POST', 'DELETE', 'PUT']);
const STATUSES = Object.freeze([200, 200, 200, 200, 201, 301, 404, 404, 500, 500, 503]);

// ── Utilitários puros ────────────────────────────────────────
const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pad = (n) => String(n).padStart(2, '0');
const randHour = () => `${pad(Math.floor(Math.random() * 24))}:${pad(Math.floor(Math.random() * 60))}:${pad(Math.floor(Math.random() * 60))}`;

// ── Gerador de log imutável ──────────────────────────────────
const generateLog = () => Object.freeze({
  ip: rnd(IPS),
  method: rnd(METHODS),
  route: rnd(ROUTES),
  status: rnd(STATUSES),
  time: Math.floor(Math.random() * 900) + 20,
  hour: randHour(),
});

// Array.from substitui o loop for — sem mutação
const generateLogs = (n = 120) =>
  Object.freeze(Array.from({ length: n }, generateLog));

// ── Predicados (funções de primeira classe) ──────────────────
const isError = (l) => l.status >= 400;
const isSuccess = (l) => l.status < 400;

// Alta ordem: recebe valor, retorna função (currying)
const byStatusGroup = (prefix) => (l) => String(l.status).startsWith(prefix);
const byMethod = (m) => (l) => l.method === m;

// ── Transformações — map ─────────────────────────────────────
const toIP = (l) => l.ip;

// ── Agregações — reduce ──────────────────────────────────────
// Acumulador nunca mutado: spread cria objeto novo a cada iteração
const countByKey = (key) => (logs) =>
  logs.reduce(
    (acc, log) => ({ ...acc, [log[key]]: (acc[log[key]] || 0) + 1 }),
    {}
  );

const sumTime = (logs) =>
  logs.reduce((acc, l) => acc + l.time, 0);

// Transparência referencial: avgTime(logs) === avgTime(logs) sempre
const avgTime = (logs) =>
  logs.length === 0 ? 0 : +(sumTime(logs) / logs.length).toFixed(1);

// map + Set: IPs únicos sem loop
const uniqueIPs = (logs) =>
  new Set(logs.map(toIP)).size;

// Composição: filter → countByKey → entries → sort → slice → map
const topByKey = (key, n = 5) => (logs) =>
  Object.entries(countByKey(key)(logs))
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([label, count]) => Object.freeze({ label, count }));

// ── Pipeline principal — função pura ─────────────────────────
// analyze(logs) === analyze(logs) para qualquer `logs` (transparência referencial)
const analyze = (logs) => Object.freeze({
  total: logs.length,
  errors: logs.filter(isError).length,
  successes: logs.filter(isSuccess).length,
  uniqueIPs: uniqueIPs(logs),
  avgTime: avgTime(logs),
  errorRate: logs.length ? +((logs.filter(isError).length / logs.length) * 100).toFixed(1) : 0,
  topRoutes: topByKey('route')(logs.filter(isError)),
  topIPs: topByKey('ip')(logs),
  byStatus: countByKey('status')(logs),
  byMethod: countByKey('method')(logs),
});

// Filtros encadeados — sem for, sem mutação
const applyFilters = (logs, statusPrefix, method) =>
  logs
    .filter((l) => !statusPrefix || String(l.status).startsWith(statusPrefix))
    .filter((l) => !method || l.method === method);
