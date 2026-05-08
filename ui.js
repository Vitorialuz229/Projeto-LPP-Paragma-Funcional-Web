
// ============================================================
// CAMADA DE UI — renderização (impura mas isolada)
// Toda lógica de negócio permanece acima.
// ============================================================

// Estado mínimo e localizado 
let _logs = [];
let _filtered = [];

// ── Helpers de apresentação (puros) ─────────────────────────
const statusClass = (s) =>
    s >= 500 ? 's5xx' : s >= 400 ? 's4xx' : s >= 300 ? 's3xx' : 's2xx';

const methodColor = (m) => ({
    GET: '#60a5fa', POST: '#4ade80', DELETE: '#f87171', PUT: '#fbbf24'
})[m] || '#a78bfa';

const barColor = (i) =>
    ['#60a5fa', '#4ade80', '#fbbf24', '#f87171', '#a78bfa'][i % 5];

const pct = (v, max) => `${Math.round((v / (max || 1)) * 100)}%`;

// ── Renderizadores ───────────────────────────────────────────
function renderMetrics(stats) {
    const cards = [
        { label: 'total de logs', value: stats.total, fn: 'logs.length', cls: 'c-text' },
        { label: 'erros (≥ 400)', value: stats.errors, fn: '.filter(isError).length', cls: 'c-red' },
        { label: 'IPs únicos', value: stats.uniqueIPs, fn: 'map(ip) → new Set', cls: 'c-blue' },
        { label: 'tempo médio (ms)', value: stats.avgTime, fn: '.reduce(sum) / n', cls: 'c-yellow' },
        { label: 'taxa de erro', value: stats.errorRate + '%', fn: 'errors / total', cls: stats.errorRate > 30 ? 'c-red' : 'c-green' },
        { label: 'sucessos (< 400)', value: stats.successes, fn: '.filter(isSuccess).length', cls: 'c-green' },
    ];

    document.getElementById('metrics').innerHTML = cards
        .map(({ label, value, fn, cls }) => `
      <div class="metric">
        <p class="metric-label">${label}</p>
        <p class="metric-value ${cls}">${value}</p>
        <p class="metric-fn">${fn}</p>
      </div>`)
        .join('');
}

function renderTable(logs) {
    document.getElementById('tbody').innerHTML = logs.slice(0, 50)
        .map((l) => `
      <tr>
        <td>${l.ip}</td>
        <td style="color:${methodColor(l.method)}">${l.method}</td>
        <td title="${l.route}">${l.route}</td>
        <td><span class="badge ${statusClass(l.status)}">${l.status}</span></td>
        <td>${l.time}</td>
        <td>${l.hour}</td>
      </tr>`)
        .join('');

    document.getElementById('countMsg').textContent =
        `${Math.min(50, logs.length)} de ${logs.length} exibidos`;
}

function renderBars(containerId, items, colorFn) {
    const max = items[0]?.count || 1;
    document.getElementById(containerId).innerHTML = items
        .map(({ label, count }, i) => `
      <div class="bar-row">
        <span class="bar-lbl" title="${label}">${label}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${pct(count, max)};background:${colorFn(i)}"></div>
        </div>
        <span class="bar-val">${count}</span>
      </div>`)
        .join('');
}

// ── Orquestração ─────────────────────────────────────────────
function applyAndRender() {
    const sp = document.getElementById('selStatus').value;
    const m = document.getElementById('selMethod').value;

    _filtered = applyFilters(_logs, sp, m);

    const stats = analyze(_filtered);

    renderMetrics(stats);
    renderTable(_filtered);
    renderBars('routeBars', stats.topRoutes, (i) => barColor(i + 2));
    renderBars('ipBars', stats.topIPs, barColor);
}

function regenerate() {
    _logs = generateLogs(120);
    _filtered = _logs;
    document.getElementById('selStatus').value = '';
    document.getElementById('selMethod').value = '';
    applyAndRender();
}

regenerate();