# Analisador Funcional de Logs

Projeto Final — Disciplina de Linguagens e Paradigmas de Programação  
**Tema 4: O Paradigma Funcional na Web**

---

## Sobre o projeto

Aplicação web que analisa logs de requisições HTTP utilizando **exclusivamente o paradigma funcional** em JavaScript (ES6+). O sistema gera um volume de logs simulados e permite filtrá-los e visualizar métricas em tempo real.

O objetivo é demonstrar na prática os conceitos do Capítulo 15 de Sebesta (2018): transparência referencial, funções como cidadãs de primeira classe e imutabilidade de dados.

---

## Regras do paradigma funcional aplicadas

- Proibido o uso de `for` e `while` — toda iteração é feita via funções de alta ordem
- Proibida a alteração de variáveis globais — os dados originais nunca são mutados
- Todas as transformações retornam novos arrays/objetos (sem efeitos colaterais)
- As funções são puras: mesmo input sempre produz o mesmo output

---

## Funcionalidades

- Geração aleatória de logs de servidor HTTP
- Filtro por status code (2xx, 3xx, 4xx, 5xx)
- Filtro por método HTTP (GET, POST, PUT, DELETE)
- Tabela de logs com IP, método, rota, status, tempo e hora
- Gráfico de barras: erros por rota (`filter + reduce + sort`)
- Gráfico de barras: top IPs (`reduce + sort + slice`)
- Métricas gerais: total de requisições, média de tempo, IPs únicos

---

## Funções de alta ordem utilizadas

| Função | Uso no projeto |
|--------|---------------|
| `filter` | Selecionar logs por status e método |
| `map` | Formatar entradas para exibição |
| `reduce` | Agregar erros por rota e contagem por IP |
| `sort` | Ordenar resultados dos gráficos |
| `slice` | Limitar top N resultados |

---

## Como executar

Não requer instalação de dependências. Basta abrir o arquivo `index.html` diretamente no navegador.

```bash
# Clone o repositório
git clone https://github.com/Vitorialuz229/Projeto-LPP-Paragma-Funcional-Web.git

# Abra o arquivo no navegador
cd Projeto-LPP-Paragma-Funcional-Web
open index.html  # macOS
# ou clique duas vezes no arquivo no Windows/Linux
```

---

## Estrutura do projeto

```
├── index.html   # estrutura da interface
├── logs.js      # geração e processamento dos logs (lógica funcional)
├── ui.js        # renderização da interface
└── style.css    # estilização
```

---

## Referências

- SEBESTA, Robert W. *Concepts of Programming Languages*. 12. ed. Pearson, 2018. Cap. 15.
- Mozilla Developer Network. [Array methods: map, filter, reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- MOSELEY, Ben; MARKS, Peter. *Out of the Tar Pit*. 2006.
- LIPOVACA, Miran. *Learn You a Haskell for Great Good!* No Starch Press, 2011.

---

## Integrantes

| Nome | Responsabilidade |
|------|-----------------|
| Bruno Milioli Ferreira | 
| Cristina dos Santos Gomes | 
| Gabriel Borges Garcia | 
| Raquel Dias da Silva | 
| Vitória Luz Alves D'Abadia | 
