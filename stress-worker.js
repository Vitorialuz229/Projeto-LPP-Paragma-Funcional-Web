// ============================================================
// WEB WORKER — stress-worker.js
//
// Executa o pipeline (funcional ou imperativo) em uma thread
// separada para os testes de:
//   - Paralelização segura com dados imutáveis (funcional)
//   - Condição de corrida real com SharedArrayBuffer (imperativo)
// ============================================================

importScripts('logs.js', 'imperative.js');

self.onmessage = function (e) {
  const { mode, logs, sab, workerId, iterations } = e.data;

  if (mode === 'functional') {
    // Pipeline funcional puro: cada worker recebe o mesmo array
    // (frozen) e produz seu próprio resultado, sem qualquer
    // estado compartilhado. Por construção, não há corrida.
    const result = analyze(logs);
    self.postMessage({ workerId, result });
    return;
  }

  if (mode === 'imperative-race') {
    // Demonstra condição de corrida REAL: todos os workers
    // compartilham um contador 32-bit em SharedArrayBuffer e
    // fazem read-modify-write SEM Atomics. Resultado fica
    // corrompido sob concorrência.
    const counter = new Int32Array(sab);
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].status >= 400) {
        // Race condition deliberada: leitura + soma + escrita
        // não atômicas. Outro worker pode escrever entre o
        // load e o store, sobrescrevendo a soma.
        const current = counter[0];
        // Pequena pausa para amplificar a janela de corrida
        for (let k = 0; k < 5; k++) { /* busy wait */ }
        counter[0] = current + 1;
      }
    }
    self.postMessage({ workerId, done: true });
    return;
  }

  if (mode === 'imperative-atomic') {
    // Versão correta com Atomics — produz resultado certo,
    // mas exige primitivas explícitas de sincronização.
    const counter = new Int32Array(sab);
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].status >= 400) {
        Atomics.add(counter, 0, 1);
      }
    }
    self.postMessage({ workerId, done: true });
    return;
  }

  if (mode === 'functional-repeat') {
    // Roda analyze N vezes e confirma que todos os outputs
    // são byte-a-byte idênticos — transparência referencial
    // sob estresse.
    const first = JSON.stringify(analyze(logs));
    let allEqual = true;
    for (let i = 0; i < iterations - 1; i++) {
      if (JSON.stringify(analyze(logs)) !== first) {
        allEqual = false;
        break;
      }
    }
    self.postMessage({ workerId, allEqual, iterations });
    return;
  }
};
