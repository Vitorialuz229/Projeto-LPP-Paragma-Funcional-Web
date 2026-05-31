// ============================================================
// VERSÃO IMPERATIVA — imperative.js
//
// Reimplementação das mesmas métricas usando:
//   ✓ Loops for clássicos
//   ✓ Variáveis mutáveis (let)
//   ✓ Mutação direta de acumuladores (acc[k]++)
//
// Usado APENAS por stress.js para comparação empírica.
// Não é referenciado por index.html (a demo principal
// permanece 100% funcional).
// ============================================================

function imperativeCountByKey(logs, key) {
  const acc = {};
  for (let i = 0; i < logs.length; i++) {
    const k = logs[i][key];
    if (acc[k] === undefined) {
      acc[k] = 1;
    } else {
      acc[k] = acc[k] + 1;
    }
  }
  return acc;
}

function imperativeSumTime(logs) {
  let total = 0;
  for (let i = 0; i < logs.length; i++) {
    total = total + logs[i].time;
  }
  return total;
}

function imperativeAvgTime(logs) {
  if (logs.length === 0) return 0;
  return +(imperativeSumTime(logs) / logs.length).toFixed(1);
}

function imperativeUniqueIPs(logs) {
  const seen = {};
  let count = 0;
  for (let i = 0; i < logs.length; i++) {
    const ip = logs[i].ip;
    if (seen[ip] === undefined) {
      seen[ip] = true;
      count = count + 1;
    }
  }
  return count;
}

function imperativeCountErrors(logs) {
  let total = 0;
  for (let i = 0; i < logs.length; i++) {
    if (logs[i].status >= 400) {
      total = total + 1;
    }
  }
  return total;
}

function imperativeCountSuccesses(logs) {
  let total = 0;
  for (let i = 0; i < logs.length; i++) {
    if (logs[i].status < 400) {
      total = total + 1;
    }
  }
  return total;
}

function imperativeTopByKey(logs, key, n) {
  const counts = imperativeCountByKey(logs, key);
  const entries = [];
  for (const k in counts) {
    entries.push({ label: k, count: counts[k] });
  }
  entries.sort((a, b) => b.count - a.count);
  return entries.slice(0, n);
}

function imperativeTopErrorRoutes(logs, n) {
  const errorsOnly = [];
  for (let i = 0; i < logs.length; i++) {
    if (logs[i].status >= 400) {
      errorsOnly.push(logs[i]);
    }
  }
  return imperativeTopByKey(errorsOnly, 'route', n);
}

function imperativeAnalyze(logs) {
  const errors = imperativeCountErrors(logs);
  const total = logs.length;
  return {
    total,
    errors,
    successes: imperativeCountSuccesses(logs),
    uniqueIPs: imperativeUniqueIPs(logs),
    avgTime: imperativeAvgTime(logs),
    errorRate: total ? +((errors / total) * 100).toFixed(1) : 0,
    topRoutes: imperativeTopErrorRoutes(logs, 5),
    topIPs: imperativeTopByKey(logs, 'ip', 5),
    byStatus: imperativeCountByKey(logs, 'status'),
    byMethod: imperativeCountByKey(logs, 'method'),
  };
}
