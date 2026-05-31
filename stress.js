'use strict';

// ============================================================
// TESTES DE ESTRESSE — stress.js
//
// Quatro baterias:
//   1. Volume e pressão de memória (10k → 5M logs)
//   2. Condição de corrida com Web Workers
//      (funcional sem mutex × imperativo com SAB sem Atomics)
//   3. Comparação empírica funcional × imperativo (mesma carga)
//   4. Imutabilidade forçada + transparência referencial em massa
//
// Sem framework de teste — apenas instrumentação nativa do
// navegador (performance.now, performance.memory, Workers, SAB).
// ============================================================

const $ = (id) => document.getElementById(id);

const fmt = (n) => n.toLocaleString('pt-BR');
const ms = (n) => `${n.toFixed(1)} ms`;
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1) + ' MB';

const heap = () =>
  performance.memory ? performance.memory.usedJSHeapSize : null;

const heapStr = () => {
  const h = heap();
  return h === null ? '— (não-Chromium)' : mb(h);
};

const log = (msg, cls = '') => {
  const el = document.createElement('div');
  el.className = `log-line ${cls}`;
  el.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  $('console').appendChild(el);
  $('console').scrollTop = $('console').scrollHeight;
};

const setStatus = (id, state, text) => {
  const badge = $(id);
  badge.className = `badge ${state}`;
  badge.textContent = text;
};

const renderTable = (containerId, headers, rows) => {
  const head = headers.map((h) => `<th>${h}</th>`).join('');
  const body = rows
    .map(
      (r) =>
        `<tr>${r
          .map((c) => `<td>${c}</td>`)
          .join('')}</tr>`
    )
    .join('');
  $(containerId).innerHTML = `
    <table class="result-table">
      <thead><tr>${head}</tr></thead>
      <tbody>${body}</tbody>
    </table>`;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── 1. Volume e pressão de memória ──────────────────────────
async function runVolumeTest() {
  setStatus('statusVolume', 'running', 'rodando...');
  $('resultVolume').innerHTML = '';
  log('iniciando teste de volume e pressão de memória');

  const sizes = [10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000];
  const rows = [];

  for (const n of sizes) {
    await sleep(50); // libera o event loop para a UI respirar
    log(`gerando ${fmt(n)} logs...`);
    const heapBefore = heap();

    let logs, result, elapsed, status;
    try {
      const t0 = performance.now();
      logs = generateLogs(n);
      const tGen = performance.now() - t0;

      const t1 = performance.now();
      result = analyze(logs);
      elapsed = performance.now() - t1;
      status = '<span class="ok">✓ OK</span>';

      log(
        `N=${fmt(n)} | gerou em ${tGen.toFixed(0)}ms | analyze em ${elapsed.toFixed(0)}ms | erros=${result.errors}`
      );
    } catch (err) {
      elapsed = NaN;
      status = `<span class="err">✗ ${err.name}</span>`;
      log(`N=${fmt(n)} FALHOU: ${err.name} — ${err.message}`, 'err');
    }

    const heapAfter = heap();
    rows.push([
      fmt(n),
      isNaN(elapsed) ? '—' : ms(elapsed),
      heapBefore === null ? '—' : mb(heapBefore),
      heapAfter === null ? '—' : mb(heapAfter),
      heapBefore === null ? '—' : mb(heapAfter - heapBefore),
      status,
    ]);

    renderTable(
      'resultVolume',
      ['N', 'tempo analyze', 'heap antes', 'heap depois', 'Δ heap', 'resultado'],
      rows
    );

    // libera referência para permitir GC entre rodadas
    logs = null;
    result = null;
  }

  setStatus('statusVolume', 'ok', 'concluído');
  log('teste de volume concluído', 'ok');
}

// ── 2. Condição de corrida ──────────────────────────────────
async function runRaceConditionTest() {
  setStatus('statusRace', 'running', 'rodando...');
  $('resultRace').innerHTML = '';
  log('iniciando teste de condição de corrida com Web Workers');

  const N = 100_000;
  const WORKERS = Math.min(8, navigator.hardwareConcurrency || 4);
  log(`gerando ${fmt(N)} logs e disparando ${WORKERS} workers...`);

  const logs = generateLogs(N);
  const expectedErrors = logs.filter((l) => l.status >= 400).length;
  log(`erros esperados (contagem sequencial): ${fmt(expectedErrors)}`);

  // ── Cenário A: Funcional sem mutex ───────────────────────
  log('cenário A — pipeline funcional puro em paralelo');
  const funcResults = await Promise.all(
    Array.from({ length: WORKERS }, (_, i) => runWorker({
      mode: 'functional',
      logs,
      workerId: i,
    }))
  );

  const firstJson = JSON.stringify(funcResults[0].result);
  const allIdentical = funcResults.every(
    (r) => JSON.stringify(r.result) === firstJson
  );

  log(
    `funcional: ${WORKERS} workers retornaram ${allIdentical ? 'resultados IDÊNTICOS' : 'resultados DIVERGENTES'}`,
    allIdentical ? 'ok' : 'err'
  );

  // ── Cenário B: Imperativo com SAB sem Atomics ────────────
  let sabSupported = true;
  let raceRows = [];
  try {
    log('cenário B — contador imperativo em SharedArrayBuffer (SEM Atomics)');
    const RUNS = 5;
    for (let run = 0; run < RUNS; run++) {
      const sab = new SharedArrayBuffer(4);
      const counter = new Int32Array(sab);
      counter[0] = 0;

      await Promise.all(
        Array.from({ length: WORKERS }, (_, i) =>
          runWorker({ mode: 'imperative-race', logs, sab, workerId: i })
        )
      );

      const got = counter[0];
      const expectedAcrossWorkers = expectedErrors * WORKERS;
      const loss = expectedAcrossWorkers - got;
      const pct = ((loss / expectedAcrossWorkers) * 100).toFixed(1);

      raceRows.push([
        `run ${run + 1}`,
        fmt(expectedAcrossWorkers),
        fmt(got),
        `${fmt(loss)} (${pct}%)`,
      ]);

      log(
        `  run ${run + 1}: esperado=${fmt(expectedAcrossWorkers)} obtido=${fmt(got)} perdidos=${fmt(loss)} (${pct}%)`,
        loss > 0 ? 'err' : ''
      );
    }
  } catch (err) {
    sabSupported = false;
    log(`SharedArrayBuffer indisponível: ${err.message}`, 'err');
    log('dica: rode via servidor com headers COOP/COEP para habilitar SAB.', 'err');
  }

  // ── Cenário C: Imperativo COM Atomics (controle) ─────────
  let atomicRows = [];
  if (sabSupported) {
    log('cenário C — mesmo contador, agora com Atomics.add (controle)');
    const sab = new SharedArrayBuffer(4);
    const counter = new Int32Array(sab);
    counter[0] = 0;

    await Promise.all(
      Array.from({ length: WORKERS }, (_, i) =>
        runWorker({ mode: 'imperative-atomic', logs, sab, workerId: i })
      )
    );

    const got = counter[0];
    const expectedAcrossWorkers = expectedErrors * WORKERS;
    atomicRows.push([
      'com Atomics',
      fmt(expectedAcrossWorkers),
      fmt(got),
      got === expectedAcrossWorkers ? '<span class="ok">✓ correto</span>' : '<span class="err">✗ incorreto</span>',
    ]);
    log(
      `  com Atomics: esperado=${fmt(expectedAcrossWorkers)} obtido=${fmt(got)} ${got === expectedAcrossWorkers ? 'OK' : 'FALHOU'}`,
      got === expectedAcrossWorkers ? 'ok' : 'err'
    );
  }

  // Render
  const html = `
    <h3>Cenário A — Funcional (sem mutex, sem corrida possível)</h3>
    <p>${WORKERS} workers processaram o mesmo array imutável de ${fmt(N)} logs.
       Todos retornaram <strong>${allIdentical ? 'resultados idênticos' : 'resultados divergentes'}</strong>.
       Erros detectados por worker: <strong>${fmt(funcResults[0].result.errors)}</strong>.</p>

    <h3>Cenário B — Imperativo (SAB sem Atomics, corrida real)</h3>
    ${sabSupported ? `<table class="result-table">
      <thead><tr><th>execução</th><th>esperado</th><th>obtido</th><th>perdidos por corrida</th></tr></thead>
      <tbody>${raceRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>` : '<p class="err">SharedArrayBuffer não disponível neste contexto. Sirva via http://localhost com headers COOP/COEP.</p>'}

    ${atomicRows.length ? `<h3>Cenário C — Imperativo com Atomics (controle)</h3>
    <table class="result-table">
      <thead><tr><th>variante</th><th>esperado</th><th>obtido</th><th>resultado</th></tr></thead>
      <tbody>${atomicRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>` : ''}
  `;
  $('resultRace').innerHTML = html;

  setStatus('statusRace', 'ok', 'concluído');
  log('teste de condição de corrida concluído', 'ok');
}

function runWorker(msg) {
  return new Promise((resolve, reject) => {
    const w = new Worker('stress-worker.js');
    w.onmessage = (e) => {
      resolve(e.data);
      w.terminate();
    };
    w.onerror = (e) => {
      reject(new Error(e.message));
      w.terminate();
    };
    w.postMessage(msg);
  });
}

// ── 3. Comparação empírica funcional × imperativo ───────────
async function runComparisonTest() {
  setStatus('statusComp', 'running', 'rodando...');
  $('resultComp').innerHTML = '';
  log('iniciando comparação empírica funcional × imperativo');

  const N = 500_000;
  const RUNS = 10;
  log(`dataset: ${fmt(N)} logs, ${RUNS} execuções por variante (trimmed mean)`);
  const logs = generateLogs(N);

  await sleep(20);

  // Funcional
  const funcTimes = [];
  let funcResult;
  for (let i = 0; i < RUNS; i++) {
    const t0 = performance.now();
    funcResult = analyze(logs);
    funcTimes.push(performance.now() - t0);
    await sleep(5);
  }

  // Imperativo
  const impTimes = [];
  let impResult;
  for (let i = 0; i < RUNS; i++) {
    const t0 = performance.now();
    impResult = imperativeAnalyze(logs);
    impTimes.push(performance.now() - t0);
    await sleep(5);
  }

  const trimmedMean = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const trimmed = sorted.slice(1, -1);
    return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
  };

  const funcAvg = trimmedMean(funcTimes);
  const impAvg = trimmedMean(impTimes);

  // Correção: resultados devem ser idênticos nas métricas centrais
  const correct =
    funcResult.total === impResult.total &&
    funcResult.errors === impResult.errors &&
    funcResult.successes === impResult.successes &&
    funcResult.uniqueIPs === impResult.uniqueIPs &&
    funcResult.avgTime === impResult.avgTime;

  log(`funcional: ${ms(funcAvg)} (média truncada de ${RUNS - 2})`);
  log(`imperativo: ${ms(impAvg)}`);
  log(
    `resultados ${correct ? 'IDÊNTICOS' : 'DIVERGENTES'}`,
    correct ? 'ok' : 'err'
  );

  const overhead = ((funcAvg / impAvg - 1) * 100).toFixed(1);

  renderTable(
    'resultComp',
    ['variante', 'tempo médio', 'min', 'max', 'correção'],
    [
      [
        'funcional (map/filter/reduce + spread)',
        ms(funcAvg),
        ms(Math.min(...funcTimes)),
        ms(Math.max(...funcTimes)),
        correct
          ? '<span class="ok">✓ resultado idêntico ao imperativo</span>'
          : '<span class="err">✗ divergência</span>',
      ],
      [
        'imperativo (for + mutação)',
        ms(impAvg),
        ms(Math.min(...impTimes)),
        ms(Math.max(...impTimes)),
        '— (referência)',
      ],
      [
        'overhead funcional',
        `${overhead}%`,
        '',
        '',
        `dataset: ${fmt(N)} logs`,
      ],
    ]
  );

  setStatus('statusComp', 'ok', 'concluído');
  log('comparação concluída', 'ok');
}

// ── 4. Imutabilidade forçada + transparência em massa ──────
async function runImmutabilityTest() {
  setStatus('statusImmut', 'running', 'rodando...');
  $('resultImmut').innerHTML = '';
  log('iniciando teste de imutabilidade forçada');

  const logs = generateLogs(1000);
  const fields = ['status', 'ip', 'method', 'route', 'time', 'hour'];
  const mutationRows = [];

  // Mutação forçada em strict mode → TypeError esperado
  for (const f of fields) {
    let blocked = false;
    let detail = '';
    try {
      logs[0][f] = '___MUTATED___';
      // Em strict, atribuição em objeto congelado lança TypeError.
      // Se chegou aqui, ou não está em strict, ou o freeze falhou.
      detail = `valor após tentativa: ${logs[0][f]}`;
      blocked = logs[0][f] !== '___MUTATED___';
    } catch (err) {
      blocked = true;
      detail = `${err.name}: ${err.message}`;
    }
    mutationRows.push([
      f,
      blocked
        ? '<span class="ok">✓ bloqueado</span>'
        : '<span class="err">✗ permitiu</span>',
      detail,
    ]);
    log(`mutação de ${f}: ${blocked ? 'bloqueada' : 'PERMITIDA'} — ${detail}`,
        blocked ? 'ok' : 'err');
  }

  // Transparência referencial em massa
  log('executando analyze(logs) 10.000 vezes para conferir determinismo...');
  const ITER = 10_000;
  const reference = JSON.stringify(analyze(logs));
  let allEqual = true;
  let firstDivergence = -1;

  const t0 = performance.now();
  for (let i = 0; i < ITER; i++) {
    if (JSON.stringify(analyze(logs)) !== reference) {
      allEqual = false;
      firstDivergence = i;
      break;
    }
  }
  const tTransp = performance.now() - t0;

  log(
    `${ITER} execuções em ${tTransp.toFixed(0)}ms — ${allEqual ? 'todas idênticas' : `divergiu na iteração ${firstDivergence}`}`,
    allEqual ? 'ok' : 'err'
  );

  // Render
  $('resultImmut').innerHTML = `
    <h3>Mutação forçada em <code>Object.freeze</code> (strict mode)</h3>
    <table class="result-table">
      <thead><tr><th>campo</th><th>resultado</th><th>detalhe</th></tr></thead>
      <tbody>${mutationRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>

    <h3>Transparência referencial em massa</h3>
    <table class="result-table">
      <thead><tr><th>iterações</th><th>tempo total</th><th>todas idênticas?</th></tr></thead>
      <tbody>
        <tr>
          <td>${fmt(ITER)}</td>
          <td>${tTransp.toFixed(0)} ms</td>
          <td>${allEqual ? '<span class="ok">✓ sim</span>' : `<span class="err">✗ divergiu em #${firstDivergence}</span>`}</td>
        </tr>
      </tbody>
    </table>
  `;

  setStatus('statusImmut', 'ok', 'concluído');
  log('teste de imutabilidade concluído', 'ok');
}

// ── Diagnóstico inicial ──────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const info = [
    `navegador: ${navigator.userAgent.split(') ').pop() || navigator.userAgent}`,
    `hardwareConcurrency: ${navigator.hardwareConcurrency}`,
    `performance.memory: ${performance.memory ? 'disponível' : 'INDISPONÍVEL (não-Chromium)'}`,
    `SharedArrayBuffer: ${typeof SharedArrayBuffer !== 'undefined' ? 'disponível' : 'INDISPONÍVEL (rode via http://localhost com COOP/COEP)'}`,
    `crossOriginIsolated: ${self.crossOriginIsolated}`,
  ];
  info.forEach((l) => log(l));
});
