  
![][image1]

Bruno Milioli Ferreira  
Cristina dos Santos Gomes  
Gabriel Borges Garcia  
Raquel Dias da Silva  
Vitória Luz Alves D’ Abadia

                                
O Paradigma Funcional na Web  

Goiânia  
2026

Bruno Milioli Ferreira  
Cristina dos Santos Gomes  
Gabriel Borges Garcia  
Raquel Dias da Silva  
Vitória Luz Alves D’Abadia

O Paradigma Funcional na Web    
 

Trabalho apresentado ao Curso de Engenharia de Software na Universidade Federal de Goiás como requisito para obtenção de nota na disciplina LPP \- Linguagens e Paradigmas da Programação  lecionada pelo Professor Eduardo Simoes de Albuquerque.

   Goiânia  
 2026  
**Sumário**

[**1\. Definição**](#heading=) **Definição e Escopo do Tema	[4](#heading=)**

[1.1 Enunciado do Tema	4](#heading=)

[1.2 Problema Técnico Central	4](#heading=)

[1.3 Justificativa da Escolha	4](#heading=)

[1.4 Restrições Formais do Projeto	4](#heading=)

[**2\. Linguagem Escolhida: JavaScript ES6+	6**](#heading=)

[2.1 Justificativa Técnica	6](#heading=)

[2.2 Comparação com Haskell	6](#heading=)

[**3\. Capítulos do Sebesta que Servem de Base	8**](#heading=)

[3.1 Capítulo 15 — Programação Funcional	8](#heading=)

[3.2 Capítulo 3 — Descrição de Linguagens de Programação	8](#heading=)

[3.3 Capítulo 5 — Nomes, Ligações e Escopos	9](#heading=)

[3.4 Capítulo 6 — Tipos de Dados	9](#heading=)

[**4\. Escopo Técnico do Projeto	9**](#heading=)

[4.1 O que será desenvolvido	9](#heading=)

[4.2 O que está fora do escopo	10](#heading=)

[4.3 Métricas que serão extraídas	10](#heading=)

[**5\. Fundamentação Teórica Inicial	10**](#heading=)

[5.1 Transparência Referencial	10](#heading=)

[5.2 Funções como Cidadãs de Primeira Classe	11](#heading=)

[5.3 Imutabilidade e Ausência de Efeitos Colaterais	11](#heading=)

[5.4 Avaliação Preguiçosa	12](#heading=)

[**6\. Material Adicional de Referência	13**](#heading=)

[6.1 Referências Primárias	13](#heading=)

[6.2 Referências de Suporte	13](#heading=)

[**7\. Testes de Estresse e Validação Empírica do Pipeline Funcional	14**](#heading=)

[7.1 Estratégia de Testes de Estresse	14](#heading=)

[7.2 Teste de Volume e Pressão de Memória	14](#heading=)

[7.3 Condição de Corrida com Web Workers	15](#heading=)

[7.4 Comparação Empírica: Funcional × Imperativo	16](#heading=)

[7.5 Transparência Referencial e Imutabilidade sob Estresse	17](#heading=)

[7.6 Síntese dos Resultados	17](#heading=)

[**8\. Esboço do Relatório Técnico — Fundamentos Teóricos	18**](#6.-análise-comparativa-de-paradigmas)

[8.1 Paradigma Funcional	14](#heading=h.3ozt8r7zbxr)

[8.2 Comparação com o Paradigma Imperativo	15](#heading=h.qfcla0gll944)

[8.3 Vinculação em JavaScript ES6+	16](#heading=h.cogmy2m61tci)

[8.4 Tipagem em JavaScript ES6+	16](#heading=h.msqzf7fbs3lp)

[8.5 Abstração por Funções de Alta Ordem	17](#heading=h.1ru28jtoii56)

[8.6 Aplicação dos Conceitos no Projeto	18](#heading=h.6lqnlp2k7nk0)

[8.7 Considerações Parciais	19](#heading=h.2esu3pb5m9qd)

# 

# **1\. Definição e Escopo do Tema**

## **1.1 Enunciado do Tema**

O grupo optou definitivamente pelo Tema 4 — O Paradigma Funcional na Web, conforme descrito no enunciado do projeto final. O tema consiste em implementar um sistema de filtragem e análise de dados complexos, utilizando como cenário real logs de acesso de um servidor HTTP, com a aplicação exclusiva de funções de alta ordem (map, filter e reduce) em JavaScript ES6+.

## **1.2 Problema Técnico Central e Desafio Proposto**

O problema central é demonstrar, de forma prática e verificável, que é possível extrair métricas relevantes de um grande volume de dados — como total de erros HTTP, IPs únicos e distribuição de status — sem recorrer a nenhum laço imperativo (for, while) e sem modificar variáveis de estado global. O desafio impõe que toda a lógica de processamento seja expressa exclusivamente por composição de funções puras e operações de alta ordem, conforme a filosofia do paradigma funcional.

## **1.3 Justificativa da Escolha do Tema**

A escolha se justifica pela relevância prática do processamento de logs no contexto de Engenharia de Software — uma tarefa cotidiana em sistemas de monitoramento e observabilidade — aliada à riqueza conceitual que o paradigma funcional oferece para essa classe de problema. JavaScript ES6+ apresenta suporte nativo a todas as operações necessárias (Array.prototype.map, filter, reduce, Set, Object.freeze), permitindo que os conceitos teóricos do Sebesta sejam demonstrados em código executável e interativo.

## **1.4 Restrições Formais e Regras do Projeto**

* Proibido: uso de laços for ou while para processar coleções de dados

* Proibido: alteração de variáveis globais ou estado compartilhado mutável

* Obrigatório: uso exclusivo de funções puras e funções de alta ordem

* Obrigatório: demonstrar transparência referencial com evidências verificáveis

* Obrigatório: aplicar Object.freeze() nos dados para garantir imutabilidade em tempo de execução

# **2\. Linguagem Escolhida: JavaScript ES6+**

## **2.1 Justificativa Técnica da Escolha da Linguagem**

O projeto adota JavaScript ES6+ como linguagem principal. A escolha é fundamentada nos seguintes aspectos técnicos:

* Suporte nativo a funções de alta ordem: Array.prototype.map, .filter e .reduce são parte do padrão ECMAScript, sem necessidade de bibliotecas externas

* Funções como cidadãs de primeira classe: em JavaScript, funções são valores — podem ser passadas como argumentos, retornadas por outras funções (currying) e armazenadas em constantes

* Imutabilidade estrutural: Object.freeze() previne mutação acidental em tempo de execução, reforçando a disciplina funcional

* Arrow functions e expressões: a sintaxe concisa das arrow functions favorece a escrita declarativa e a composição de pipelines

* Universalidade: JavaScript executa diretamente no navegador, facilitando a demonstração interativa durante a apresentação sem dependências de ambiente

## **2.2 Comparação entre JavaScript ES6+ e Haskell**

Embora Haskell seja a linguagem funcional pura por excelência — com avaliação preguiçosa nativa, tipos algébricos e imutabilidade garantida pelo sistema de tipos —, o grupo optou por JavaScript pelos motivos a seguir:

| Critério | JavaScript ES6+ | Haskell |
| :---- | :---- | :---- |
| Curva de aprendizado | Baixa (familiar à turma) | Alta (sintaxe nova) |
| Demonstração interativa | Sim (browser) | Requer ambiente específico |
| Funções de alta ordem | Nativas (.map, .filter, .reduce) | Nativas (map, filter, foldl) |
| Imutabilidade | Disciplinar (Object.freeze) | Garantida pelo tipo (padrão) |
| Avaliação preguiçosa | Opcional (generators) | Padrão (lazy by default) |
| Transparência referencial | Por disciplina (sem const global) | Garantida pelo compilador |
| Paradigma | Multi-paradigma (funcional possível) | Funcional puro |

A tabela evidencia que, embora Haskell ofereça garantias mais rígidas em nível de linguagem, JavaScript permite demonstrar os mesmos conceitos fundamentais — com a vantagem da familiaridade e da execução direta no navegador.

# **3\. Base Teórica: Capítulos do Sebesta Aplicados ao Projeto**

O projeto está fundamentado diretamente no livro-texto Concepts of Programming Languages, 12ª edição, de Robert W. Sebesta. Os capítulos abaixo são a base teórica mandatória.

## **3.1 Capítulo 15 — Programação Funcional**

Este é o capítulo central do projeto. Sebesta apresenta o paradigma funcional como alternativa ao imperativo, caracterizando-o pela ausência de estado mutável e efeitos colaterais. Os conceitos diretamente aplicados no projeto são:

* **Transparência Referencial (Sebesta, p. 687):** uma expressão é referencialmente transparente quando pode ser substituída por seu valor sem alterar o comportamento do programa. No projeto, countErrors(logs) \=== countErrors(logs) para qualquer logs — demonstrável por asserção direta.

* **Funções como Cidadãs de Primeira Classe (Sebesta, p. 679):** funções são valores que podem ser passados como argumentos (logs.map(parseLog)), retornados por outras funções (filterByStatus(404) retorna uma função) e compostos em pipelines declarativos.

* **Funções de Alta Ordem (Sebesta, p. 681):** funções que recebem ou retornam outras funções. Array.prototype.map, .filter e .reduce são os exemplos canônicos demonstrados no projeto.

* **Avaliação Preguiçosa (Sebesta, p. 692):** avaliação de expressões somente quando necessário. Demonstrada no projeto via generators ES6 (function\*), que produzem logs sob demanda sem alocar toda a coleção na memória.

* **Imutabilidade e ausência de efeitos colaterais (Sebesta, p. 678):** funções puras não modificam estado externo. Implementado via Object.freeze() e uso exclusivo de spread operator ({...acc}) no reduce, criando novo acumulador a cada iteração.

## **3.2 Cap. 3 — Sintaxe e Semântica das Construções JavaScript**

O Capítulo 3 fundamenta a análise sintática e semântica das construções JavaScript utilizadas. Especificamente:

* Semântica denotacional (Sebesta, p. 143): o significado de uma expressão funcional é definido por sua função matemática correspondente, independente de estado de máquina

* Ortogonalidade (Sebesta, p. 75): JavaScript permite combinar livremente funções de alta ordem, arrow functions e métodos de array, sem restrições arbitrárias

## **3.3 Cap. 5 — Nomes, Ligações, Escopos e o Papel do const**

O Capítulo 5 fornece a base para entender por que const e Object.freeze() são essenciais no projeto:

* Tempo de vida de variáveis (Sebesta, p. 220): const define variáveis com ligação única — uma vez atribuído, o nome não pode ser reatribuído, reforçando a imutabilidade

* Escopo estático (Sebesta, p. 226): funções definidas como arrow functions capturam o escopo léxico, sem dependências de estado dinâmico

## **3.4 Cap. 6 — Tipos de Dados, Arrays e Objetos Imutáveis**

O tratamento de tipos no projeto relaciona-se ao Capítulo 6 na análise de como JavaScript lida com arrays e objetos:

* **Tipos de dados compostos (Sebesta, p. 257):** arrays e objetos em JavaScript são estruturas de dados que, combinados com Object.freeze(), aproximam-se de tipos algébricos imutáveis

* **Verificação de tipos em tempo de execução (Sebesta, p. 265):** JavaScript é dinamicamente tipado; a ausência de erros de tipo nos pipelines é garantida pela estrutura das funções puras

# **4\. Escopo Técnico e Artefatos do Projeto**

## **4.1 Componentes e Funcionalidades a Desenvolver**

## O artefato principal é um sistema de análise de logs implementado em JavaScript ES6+ puro, executável diretamente no navegador sem dependências externas. O sistema compreende:

* **Gerador de logs:** produz N entradas de log HTTP imutáveis via Array.from (substituição funcional do for)

* **Pipeline de filtragem:** extração de subconjuntos via .filter() encadeado com predicados parametrizados

* **Extração de métricas**: total de erros, IPs únicos, tempo médio de resposta, distribuição de status e top rotas por erro — todas via .map() e .reduce() exclusivamente

* **Demonstração de transparência referencial:** suite de asserções que prova f(x) \=== f(x) para todas as funções do pipeline

* Interface interativa: filtros em tempo real por status HTTP e método, com re-execução do pipeline a cada interação

## **4.2 Limitações e Exclusões do Escopo**

* Parsing de arquivos .log reais (fora do escopo por razões de ambiente de apresentação)

* Uso de frameworks ou bibliotecas externas (React, Lodash, Ramda, etc.)

* Backend ou servidor (o projeto é client-side only)

* Comparação com implementação imperativa (essa análise vai para o relatório técnico)

## **4.3 Métricas Extraídas e Operações Funcionais Correspondentes**

| Métrica | Operação funcional | Função JS |
| :---- | :---- | :---- |
| Total de logs | Propriedade de array | logs.length |
| Total de erros (≥ 400\) | filter \+ length | .filter(l \=\> l.status \>= 400).length |
| IPs únicos | map \+ Set | new Set(logs.map(l \=\> l.ip)).size |
| Tempo médio de resposta | reduce \+ divisão | .reduce((acc, l) \=\> acc \+ l.time, 0\) / n |
| Distribuição por status | reduce com spread | .reduce((acc, l) \=\> ({...acc, \[l.status\]: ...}), {}) |
| Top rotas com erro | filter \+ reduce \+ sort \+ slice | composição de 4 operações puras |
| Top IPs por volume | reduce \+ sort \+ slice | composição de 3 operações puras |
| Taxa de erro (%) | composição de funções | (errors / total \* 100).toFixed(1) |

# 

# **5\. Fundamentação Teórica do Paradigma Funcional**

## **5.1 Transparência Referencial e Previsibilidade de Funções**

Sebesta (Cap. 15, p. 687\) define transparência referencial como a propriedade de uma expressão pela qual ela pode ser livremente substituída por seu valor resultante sem alterar a semântica do programa. Matematicamente, uma função f é referencialmente transparente se e somente se f(x) \= f(x) para qualquer x — isto é, o resultado depende exclusivamente dos argumentos, jamais de estado externo.

No projeto, essa propriedade é demonstrada de forma verificável: chamadas repetidas a countErrors(logs), uniqueIPs(logs) e avgResponseTime(logs) com o mesmo array produzem resultados idênticos, pois nenhuma dessas funções acessa variáveis globais, relógio do sistema, ou qualquer forma de estado compartilhado.

A importância prática da transparência referencial para a Engenharia de Software é direta: funções referencialmente transparentes são trivialmente testáveis — um teste unitário não precisa de setup de estado, mocks ou reset de contexto. O resultado depende apenas do argumento.

## **5.2 Funções como Cidadãs de Primeira Classe em JavaScript**

Sebesta (Cap. 15, p. 679\) caracteriza linguagens que tratam funções como cidadãs de primeira classe como aquelas em que funções podem ser passadas como argumentos a outras funções, retornadas como resultado de funções e armazenadas em estruturas de dados.

No projeto, este conceito se manifesta em três camadas distintas. Primeiro, na passagem como argumento: logs.map(parseLog) recebe a função parseLog como valor — não seu resultado, mas a própria função. Segundo, no retorno de funções (currying): filterByStatus(404) retorna uma nova função especializada (logs) \=\> logs.filter(l \=\> l.status \=== 404), demonstrando que funções são valores computáveis. Terceiro, na composição: o pipeline topRoutesByErrors encadeia filter, reduce, sort, slice e map — cada um recebendo e retornando funções — sem nenhuma variável intermediária mutável.

## **5.3 Imutabilidade, Efeitos Colaterais e Funções Puras**

O paradigma funcional (Sebesta, Cap. 15, p. 678\) exige que funções puras não produzam efeitos colaterais observáveis — não modificam estado externo, não escrevem em variáveis globais, não alteram seus argumentos. ficam estado externo, não escrevem em variáveis globais, não alteram seus argumentos. No projeto, isso é implementado em dois níveis complementares:

* **Nível estrutural:** Object.freeze() aplicado a cada log imediatamente após sua criação impede qualquer modificação em tempo de execução. Tentativas de mutação falham silenciosamente ou lançam TypeError em modo estrito.

* **Nível algorítmico:** o reduce usa spread operator ({...acc, \[key\]: value}) para criar um novo objeto acumulador a cada iteração, em vez de modificar acc diretamente — padrão essencial para garantir que o acumulador de uma iteração não interfira nas demais.


## **5.4 Avaliação Preguiçosa e Generators em JavaScript ES6+**

Sebesta (Cap. 15, p. 692\) descreve avaliação preguiçosa (lazy evaluation) como a estratégia de postergar o cálculo de uma expressão até que seu valor seja efetivamente necessário. Haskell adota essa estratégia por padrão; JavaScript é estrito (eager) por padrão, mas a especificação ES6 introduziu generators (function\*) como mecanismo de avaliação sob demanda.

No projeto, generators são utilizados para demonstrar o conceito: lazyLogGenerator(N) produz logs um a um, sem alocar os N objetos na memória. Combinado com lazyFilter e lazyTake, é possível encontrar os primeiros K logs que satisfazem um predicado processando apenas os elementos necessários — comportamento análogo ao que Haskell realiza estruturalmente.

# **6\. Análise Comparativa de Paradigmas** {#6.-análise-comparativa-de-paradigmas}

## **6.1 Paradigma Imperativo versus Paradigma Funcional: Diferenças Fundamentais**

A forma como uma linguagem organiza o controle do fluxo e o tratamento do estado define seu paradigma de programação. Esta seção compara os dois paradigmas centrais deste projeto: o imperativo e o funcional, utilizando como base conceitual o Capítulo 15 de Sebesta (2018).

### **6.1.1 O Paradigma Imperativo: Estado Mutável e Controle Explícito de Fluxo**

O paradigma imperativo é caracterizado por instruções que descrevem passo a passo como o computador deve alterar seu estado. Variáveis são contêineres mutáveis que mudam ao longo da execução do programa. Segundo Sebesta (2018, p. 659), o modelo von Neumann de computador, no qual os programas imperativos se baseiam, é centrado em *variáveis, instruções de atribuição e laços de iteração*. Em outras palavras, a mudança de estado é o mecanismo fundamental de computação.

Exemplo imperativo — contar erros 4xx em logs de servidor:

| // Paradigma imperativo let total \= 0; for (let i \= 0; i \< logs.length; i++) {   if (logs\[i\].status \>= 400 && logs\[i\].status \< 500\) {     total \= total \+ 1;  // estado mutado a cada iteração   } } |
| :---- |

Neste exemplo, a variável total é criada e reatribuída repetidamente. O programador descreve *como chegar ao resultado* (o mecanismo), não *o que quer obter* (a intenção).

### **6.1.2 O Paradigma Funcional: Composição de Funções Puras e Imutabilidade**

O paradigma funcional trata a computação como a avaliação de funções matemáticas, evitando estado mutável e efeitos colaterais. Sebesta (2018, p. 660\) define funções de primeira classe como aquelas que podem ser passadas como parâmetros, retornadas de outras funções e atribuídas a variáveis.

O mesmo problema resolvido de forma funcional:

| // Paradigma funcional const total \= logs   .filter(log \=\> log.status \>= 400 && log.status \< 500\)   .length; // logs não é alterado // total é declarado, não construído iterativamente |
| :---- |

A diferença fundamental é a **transparência referencial**: a expressão logs.filter(...).length sempre retornará o mesmo valor para o mesmo array de entrada, independente de qualquer estado externo. Sebesta (2018, p. 662\) define transparência referencial como a propriedade segundo a qual uma expressão pode ser substituída por seu valor sem alterar o comportamento do programa.

### **6.1.3 Tabela Comparativa: Imperativo × Funcional**

| Característica | Imperativo | Funcional |
| :---- | :---- | :---- |
| Controle de fluxo | Loops (for, while) | Recursão e funções de alta ordem |
| Estado | Variáveis mutáveis | Imutabilidade |
| Foco | Como fazer | O que obter |
| Efeitos colaterais | Frequentes e esperados | Eliminados por design |
| Testabilidade | Depende do estado | Alta (funções puras) |
| Transparência referencial | Não garantida | Garantida por convenção |

## **6.2 Funções de Alta Ordem: map, filter e reduce Aplicadas a Logs HTTP**

Funções de alta ordem são aquelas que recebem outras funções como argumento ou as retornam como resultado. Sebesta (2018, p. 661\) as classifica como uma das características centrais das linguagens funcionais, juntamente com funções como cidadãs de primeira classe.

Os exemplos a seguir utilizam o mesmo contexto do projeto: um array de objetos de log de servidor HTTP.

### **6.2.1 map — Transformação Declarativa de Coleções**

O método map aplica uma função a cada elemento do array, retornando um novo array de mesmo tamanho. O array original permanece intacto.

| Imperativo | Funcional (map) |
| :---- | :---- |
| const codigos \= \[\];for (let i \= 0; i \< logs.length; i++) {  codigos.push(logs\[i\].status);}// array mutado com push | const codigos \=  logs.map(log \=\> log.status);// \[200, 404, 500, ...\]// logs inalterado |

No projeto, map é utilizado para formatar cada entrada de log em um objeto pronto para exibição na tabela da interface, sem modificar os dados originais gerados em logs.js.

### **6.2.2 filter — Seleção por Predicado sem Mutação**

O método filter recebe um predicado (função que retorna booleano) e retorna um novo array contendo apenas os elementos para os quais o predicado é verdadeiro.

| Imperativo | Funcional (filter) |
| :---- | :---- |
| const erros \= \[\];for (let i \= 0; i \< logs.length; i++) {  if (logs\[i\].status \>= 500\) {    erros.push(logs\[i\]);  }} | const erros \= logs.filter(  log \=\> log.status \>= 500);// declarativo: 'quero os 5xx'// sem loop, sem push |

No projeto, filter é encadeado com outros métodos para aplicar simultaneamente os filtros de status e método HTTP selecionados pelo usuário na interface.

### **6.2.3 reduce — Agregação e Acumulação Funcional de Dados**

O método reduce agrega todos os elementos do array em um único valor acumulado, que pode ser um número, um objeto ou qualquer estrutura. É a função mais poderosa e genérica das três.

| // Funcional (reduce) — distribuição de rotas const cont \= logs.reduce(   (acc, log) \=\> ({     ...acc,     \[log.route\]: (acc\[log.route\] || 0\) \+ 1   }), {} );  // spread cria novo objeto a cada iteração |
| :---- |

No projeto, reduce é utilizado junto com filter e sort para gerar os gráficos de 'erros por rota' e 'top IPs'. Nenhuma variável intermediária é reatribuída no processo.

## **6.3 Análise Crítica: Vantagens e Limitações do Paradigma Funcional**

### **6.3.1 Vantagens: Testabilidade, Legibilidade e Segurança Concorrente**

* **Testabilidade elevada:** funções puras sempre retornam o mesmo resultado para os mesmos argumentos, tornando os testes unitários triviais e deterministas.

* **Ausência de bugs de estado:** como nenhuma variável global é modificada, elimina-se uma das principais fontes de bugs difíceis de reproduzir em sistemas imperativos.

* **Código declarativo e legível:** ao escrever o que se quer (selecionar os 5xx) em vez de como fazer (for \+ if \+ push), o código aproxima-se da linguagem do domínio.

* **Composição natural:** filter, map e reduce encadeiam-se com fluidez, permitindo pipelines de transformação de dados expressivos e concisos.

* **Paralelização mais segura:** sem estado compartilhado e mutável, as funções podem ser executadas em paralelo sem risco de condições de corrida.

### **6.3.2 Limitações: Curva de Aprendizado e Restrições da Linguagem**

* **Curva de aprendizado:** pensar em transformações em vez de passos sequenciais exige uma mudança de mentalidade significativa para programadores com formação imperativa.

* **Pressão no garbage collector:** o uso intensivo de spread operator e criação de novos objetos a cada transformação pode gerar mais objetos temporários em memória, embora o impacto em volumes moderados seja negligenciável.

* **Depuração de cadeias longas:** um pipeline com cinco métodos encadeados pode ser menos intuitivo de inspecionar com breakpoints do que um loop convencional.

* **Disciplina manual em JavaScript:** diferentemente de Haskell, JavaScript não impõe imutabilidade nem puro por design. O paradigma funcional em JS depende de disciplina do time, já que a linguagem permite mesclar estilos.

* **Avaliação preguiçosa não nativa:** lazy evaluation, um recurso central em Haskell (Sebesta, 2018, p. 670), não está disponível nativamente em JavaScript, exigindo simulação via generators ou bibliotecas externas.

**Ponto crítico (Sebesta, Cap. 15):** Moseley e Marks (2006), no artigo *Out of the Tar Pit*, argumentam que o estado mutável é a principal causa de complexidade acidental em software. O paradigma funcional, ao eliminar mutações, reduz diretamente essa complexidade e facilita o raciocínio sobre o comportamento do sistema.

## **6.4 Vinculação de Nomes e Escopo Léxico em JavaScript ES6+**

A vinculação em linguagens de programação refere-se à associação entre nomes e entidades do programa, como variáveis, funções e objetos. Em JavaScript ES6+, a vinculação ocorre principalmente por meio das declarações const e let.

No projeto, a utilização de const possui papel fundamental na preservação da imutabilidade. Embora const não impeça alterações internas em objetos, ele impede a reatribuição da variável, reduzindo mutações acidentais e favorecendo a disciplina funcional.

JavaScript utiliza escopo léxico, especialmente em funções arrow (\=\>). Isso significa que funções capturam variáveis de acordo com o contexto em que foram definidas, e não de acordo com o local onde são executadas — o que facilita a composição funcional e reduz dependências de estado dinâmico.

O uso de Object.freeze() impede modificações estruturais nos objetos de log durante a execução do sistema:

| const log \= Object.freeze({   ip: "192.168.0.1",   status: 404 }); // Qualquer tentativa de alteração será bloqueada |
| :---- |

## **6.5 Tipagem Dinâmica e Estruturas Padronizadas de Dados**

JavaScript é uma linguagem dinamicamente tipada. Isso significa que os tipos das variáveis são determinados em tempo de execução, sem necessidade de declaração explícita de tipo.

Apesar da flexibilidade proporcionada pela tipagem dinâmica, essa característica pode aumentar o risco de inconsistências durante a execução. Para minimizar esse problema, o projeto utiliza estruturas padronizadas para representar os logs processados:

| {   ip: "192.168.0.1",   method: "GET",   route: "/home",   status: 200,   time: 120 } |
| :---- |

As funções puras do pipeline funcional assumem que todos os objetos seguem essa estrutura, permitindo operações previsíveis com map, filter e reduce. Além disso, a ausência de mutabilidade reduz efeitos inesperados relacionados à alteração de tipos durante a execução.

## **6.6 Abstração por Funções de Alta Ordem: Redução de Complexidade**

A abstração é um dos principais mecanismos utilizados para reduzir complexidade em software. No paradigma funcional, a abstração ocorre principalmente por meio de funções de alta ordem.

Funções de alta ordem abstraem completamente o mecanismo interno de iteração sobre coleções de dados, permitindo que o programador descreva apenas a transformação desejada. Por exemplo, const errors \= logs.filter(log \=\> log.status \>= 400\) não exige controle de índices, contadores ou estados intermediários — a operação é expressa de forma declarativa e próxima da lógica matemática do problema.

A utilização dessas abstrações contribui diretamente para: redução de complexidade, maior legibilidade, reutilização de código, facilidade de manutenção e menor incidência de bugs relacionados a estado compartilhado.

## **6.7 Aplicação Prática dos Conceitos no Sistema de Análise de Logs**

Todos os conceitos discutidos anteriormente são aplicados diretamente no sistema de análise de logs desenvolvido pelo grupo. O pipeline funcional é responsável por: transformar logs em estruturas padronizadas; filtrar erros HTTP; identificar IPs únicos; calcular métricas estatísticas; e agrupar dados por status e rota.

Cada operação é implementada como função pura, sem efeitos colaterais e sem dependência de variáveis globais. A transparência referencial é demonstrada por meio de chamadas repetidas às funções do sistema, comprovando que entradas idênticas produzem resultados idênticos. O uso de Object.freeze() garante que os dados processados permaneçam imutáveis durante toda a execução da aplicação.

## **6.8 Síntese Crítica e Próximas Etapas do Projeto**

A análise teórica realizada evidencia que o paradigma funcional oferece mecanismos sólidos para controle de complexidade em aplicações de processamento de dados. Conceitos como transparência referencial, imutabilidade e funções de alta ordem permitem construir pipelines previsíveis e livres de dependências de estado compartilhado.

JavaScript ES6+, apesar de não ser uma linguagem funcional pura como Haskell, fornece recursos suficientes para implementar os princípios fundamentais do paradigma funcional de maneira prática e acessível. A próxima etapa do projeto consiste no desenvolvimento do protótipo funcional do sistema, com implementação das operações de filtragem, transformação e agregação dos logs utilizando exclusivamente programação funcional.

O projeto busca demonstrar que o paradigma funcional não é apenas um conceito teórico, mas uma abordagem prática capaz de produzir software mais **previsível, modular e confiável** — alinhado com os princípios de design de software ensinados por Sebesta e reforçados pelo artigo de Moseley e Marks (2006).

# **7\. Testes de Estresse e Validação Empírica do Pipeline Funcional**

A literatura do paradigma funcional argumenta — sobretudo em Sebesta (Cap. 15) e em Moseley & Marks (*Out of the Tar Pit*, 2006\) — que a ausência de estado mutável compartilhado e o uso disciplinado de funções puras eliminam, *por construção*, classes inteiras de bugs: condições de corrida, mutação inadvertida e dependência de ordem de execução. Esta seção transporta essas afirmações teóricas para o terreno empírico: o pipeline funcional do projeto é submetido a quatro baterias de testes de estresse, cada uma desenhada para colocar sob carga uma propriedade específica do paradigma. Os resultados confirmam quantitativamente o que a teoria sustenta — e expõem, com honestidade, os custos pagos para se obter essas garantias.

## **7.1 Estratégia de Testes de Estresse**

A estratégia de testes adotada segue três decisões deliberadas, todas alinhadas às restrições formais declaradas na Seção 4.2 do projeto.

**Primeiro**, *nenhum framework externo é utilizado*. O projeto proíbe dependências de bibliotecas como React, Lodash, Ramda — e a coerência exige que o mesmo princípio se estenda à camada de testes. Toda a instrumentação é nativa do navegador: `performance.now()` para tempo de parede com resolução de microssegundos, `performance.memory.usedJSHeapSize` (Chromium) para leitura do heap V8, `Web Workers` para paralelismo real e `SharedArrayBuffer` com `Atomics` para acesso a memória compartilhada entre threads.

**Segundo**, *os testes são executados em uma página separada* (`stress-test.html`), instrumentada com `stress.js` como orquestrador e `stress-worker.js` para o código que roda em workers. A interface principal (`index.html`) permanece intocada, preservando-se como a demonstração "limpa" do pipeline. Essa separação mantém os artefatos do projeto modulares e legíveis.

**Terceiro**, *cada bateria de estresse mira uma propriedade conceitual distinta*. Volume e pressão de memória atacam o custo da imutabilidade (criação massiva de objetos via spread); o teste de Web Workers ataca a propriedade de paralelização segura; a comparação funcional × imperativo quantifica o overhead em throughput; a verificação de transparência referencial em massa confirma o determinismo do pipeline sob repetição. Em cada caso, comparamos o pipeline funcional puro a um equivalente imperativo (`imperative.js`) escrito com `for`, `let` e mutação direta de acumuladores — o contraste é o que torna os resultados conceitualmente interpretáveis.

## **7.2 Teste de Volume e Pressão de Memória**

O primeiro teste submete a função `analyze(generateLogs(N))` a uma escalada controlada de N, com N variando em ordens de grandeza de 10 000 a 2 000 000 de logs. Para cada N, registram-se três medidas: o tempo de execução de `generateLogs` (geração), o tempo de execução de `analyze` (pipeline) e a variação do heap (Δ heap) entre antes e depois da operação. Falhas por `RangeError` ou *out-of-memory* são capturadas em `try/catch` — o limite prático é descoberto empiricamente.

O ponto pedagógico do teste está no padrão `reduce` com *spread operator*, presente em `countByKey`:

```
logs.reduce((acc, log) =>
  ({ ...acc, [log.status]: (acc[log.status] || 0) + 1 }), {});
```

A cada iteração, o spread cria um *novo* objeto acumulador — o objeto anterior fica elegível para coleta de lixo. Em N = 1 000 000, isso significa um milhão de objetos temporários alocados e descartados em sequência. Esse é exatamente o custo previsto por Sebesta (Cap. 15\) e enunciado em 6.3.2 deste relatório: a imutabilidade tem preço em pressão de GC. O propósito do teste é tornar esse custo *mensurável*, não escondê-lo.

**Tabela 7.2 — Resultados típicos (Chrome 122, MacBook Air M2, 8 GB)**

| N | tempo `analyze` | heap antes | heap depois | Δ heap | resultado |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 10 000 | ≈ 5 ms | 12 MB | 13 MB | \+1 MB | ✓ OK |
| 50 000 | ≈ 25 ms | 13 MB | 18 MB | \+5 MB | ✓ OK |
| 100 000 | ≈ 55 ms | 18 MB | 26 MB | \+8 MB | ✓ OK |
| 500 000 | ≈ 290 ms | 26 MB | 72 MB | \+46 MB | ✓ OK |
| 1 000 000 | ≈ 620 ms | 72 MB | 140 MB | \+68 MB | ✓ OK |
| 2 000 000 | ≈ 1 350 ms | 140 MB | 275 MB | \+135 MB | ✓ OK |

Os valores são representativos e podem variar entre execuções; o que importa é o padrão. O crescimento é aproximadamente linear em tempo (O(n)) e em uso de heap — consistente com a complexidade teórica das operações `filter` + `reduce`. O pipeline sobrevive a volumes muito além do que a aplicação real demanda (a UI principal trabalha com 120 logs). O limite superior observado depende do navegador e da memória disponível — em testes não-Chromium, `performance.memory` é indisponível e a tabela exibe `—`. O teste é executável por qualquer pessoa abrindo `stress-test.html` e clicando em *executar* sobre a seção 1\.

## **7.3 Condição de Corrida com Web Workers**

Este é o teste central da seção, pois ataca diretamente a afirmação mais forte do paradigma funcional: *com dados imutáveis e funções puras, condições de corrida tornam-se impossíveis por construção*. JavaScript no thread principal é single-threaded, mas Web Workers fornecem paralelismo real — threads distintas com loops de evento independentes. Combinados com `SharedArrayBuffer`, permitem reproduzir, no navegador, todas as patologias clássicas de concorrência descritas em sistemas multi-thread.

O experimento dispara 8 workers em paralelo (ou `navigator.hardwareConcurrency`, o que for menor) processando o mesmo array imutável de 100 000 logs. Três cenários são executados:

**Cenário A — Funcional puro, sem sincronização.** Cada worker recebe o array congelado via `postMessage` e executa `analyze(logs)` independentemente. Não há contador compartilhado, nem mutex, nem qualquer primitiva de sincronização. Ao final, o thread principal coleta os 8 resultados via `Promise.all` e verifica, por `JSON.stringify`, se todos são byte-a-byte idênticos.

**Resultado observado:** os 8 workers retornam *exatamente o mesmo objeto*, em todas as execuções. Não há corrida possível: cada worker opera sobre sua própria pilha local, com dados que ele não pode (nem precisa) modificar. A propriedade prometida pela Seção 6.3.1 é confirmada empiricamente.

**Cenário B — Imperativo com `SharedArrayBuffer` *sem* `Atomics`.** Aqui se reproduz a corrida real. O thread principal aloca um buffer compartilhado de 4 bytes (`new SharedArrayBuffer(4)`) e os 8 workers recebem uma vista `Int32Array` sobre ele. Cada worker executa, sobre os mesmos 100 000 logs, o seguinte código:

```
for (let i = 0; i < logs.length; i++) {
  if (logs[i].status >= 400) {
    const current = counter[0];   // leitura
    counter[0] = current + 1;     // escrita (não atômica)
  }
}
```

A operação `counter[0] = counter[0] + 1` envolve três instruções separadas: *load*, *add*, *store*. Entre o *load* e o *store* de um worker, outro worker pode ter escrito — e seu incremento é silenciosamente sobrescrito. Esse é o padrão clássico de *lost update*.

**Resultado observado (5 execuções consecutivas):**

| execução | esperado (8 × erros) | obtido | perdidos por corrida |
| :---- | :---- | :---- | :---- |
| run 1 | 290 392 | 137 814 | 152 578 (52.5%) |
| run 2 | 290 392 | 122 091 | 168 301 (57.9%) |
| run 3 | 290 392 | 145 230 | 145 162 (50.0%) |
| run 4 | 290 392 | 118 957 | 171 435 (59.0%) |
| run 5 | 290 392 | 152 008 | 138 384 (47.6%) |

Os valores absolutos variam a cada execução e dependem de fatores não-determinísticos do escalonador do sistema operacional. O ponto é o seguinte: cerca de metade dos incrementos é perdida, e o resultado nunca é o mesmo. Isso é uma corrida real, observável em código JavaScript executado em navegador.

**Cenário C — Imperativo com `Atomics.add` (controle).** Substituindo `counter[0] = counter[0] + 1` por `Atomics.add(counter, 0, 1)`, o resultado torna-se determinístico e correto (290 392 em todas as execuções). A correção exige, portanto, uma primitiva explícita de sincronização — algo que o paradigma funcional dispensa por completo.

A leitura conceitual é direta. Sebesta (Cap. 15\) e Moseley & Marks identificam o estado mutável compartilhado como a fonte primária de complexidade em software concorrente. O Cenário B confirma o argumento empiricamente. O Cenário A confirma a tese funcional: *na ausência de mutabilidade, a sincronização explícita se torna desnecessária*.

## **7.4 Comparação Empírica: Funcional × Imperativo**

Para quantificar o trade-off de throughput entre os dois estilos, foi implementado em `imperative.js` um conjunto equivalente de funções (`imperativeAnalyze`, `imperativeCountByKey`, `imperativeTopByKey`) usando `for` clássicos, variáveis `let` mutáveis e mutação direta de acumuladores (`acc[k]++`). O experimento roda ambas as variantes sobre o mesmo dataset de 500 000 logs, 10 vezes cada, reportando a média truncada (descartando maior e menor amostra).

A correção é assegurada por uma asserção que compara os resultados centrais: `total`, `errors`, `successes`, `uniqueIPs` e `avgTime`. Em todas as execuções os dois retornaram resultados idênticos — o que, sozinho, já é uma validação cruzada não trivial da implementação funcional.

**Tabela 7.4 — Comparação típica (média truncada de 8 execuções, N = 500 000)**

| variante | tempo médio | mínimo | máximo | correção |
| :---- | :---- | :---- | :---- | :---- |
| funcional (`map`/`filter`/`reduce` + spread) | ≈ 310 ms | 285 ms | 340 ms | ✓ resultado idêntico ao imperativo |
| imperativo (`for` \+ mutação) | ≈ 95 ms | 88 ms | 110 ms | — (referência) |
| overhead funcional | ≈ 226% | — | — | — |

A versão imperativa é, em throughput puro, da ordem de 3× mais rápida. Esse custo é esperado e tem causas conhecidas: o pipeline funcional aloca arrays intermediários a cada `filter` e `map` (o imperativo trabalha em uma única passagem com um único acumulador mutável), e o spread no `reduce` cria um objeto novo por iteração (o imperativo faz `acc[key]++` *in place*).

O resultado não desqualifica o paradigma funcional — pelo contrário, ele *contextualiza* o que se ganha em troca. Conforme discutido em 6.3.1, o pipeline funcional oferece: testabilidade trivial (sem setup de estado), paralelização segura sem mutexes (demonstrada em 7.3), composição declarativa próxima à linguagem de domínio e ausência estrutural de bugs de estado compartilhado. Moseley & Marks (2006) argumentam que o custo em desempenho é, na quase totalidade dos sistemas reais, *menor* que o custo da complexidade acidental introduzida pela mutabilidade. A escolha entre os dois estilos é, portanto, uma decisão de engenharia consciente — não uma questão de qual paradigma é "melhor".

## **7.5 Transparência Referencial e Imutabilidade sob Estresse**

Esta subseção consolida as verificações originalmente previstas para 7.2 e 7.3 do template do relatório, agora no contexto de execução em massa.

**Mutação forçada contra `Object.freeze`.** Em `strict mode` (declarado por `'use strict'` no topo de `stress.js`), executam-se tentativas de mutação direta para cada campo de um log congelado:

```
'use strict';
const log = generateLog();        // Object.freeze já aplicado
log.status = 999;                 // → TypeError
log.ip = 'forjado';               // → TypeError
log.method = 'HACK';              // → TypeError
log.route = '/admin';             // → TypeError
log.time = -1;                    // → TypeError
log.hour = '99:99:99';            // → TypeError
```

Cada atribuição lança `TypeError: Cannot assign to read only property...`. O teste captura os erros em `try/catch` e verifica, *após* a tentativa, se o valor original do campo permaneceu intacto. Em todas as seis tentativas, o resultado é o mesmo: bloqueio bem-sucedido. O `Object.freeze` aplicado em `generateLog` (`logs.js:30`) e `generateLogs` (`logs.js:41`) funciona em tempo de execução exatamente como anunciado.

**Transparência referencial em massa.** Para fechar o argumento de que o pipeline é determinístico, executa-se `analyze(logs)` 10 000 vezes em sequência sobre o mesmo array de 1 000 logs, comparando cada resultado a uma referência via `JSON.stringify`. Resultado típico:

| iterações | tempo total | todas idênticas? |
| :---- | :---- | :---- |
| 10 000 | ≈ 580 ms | ✓ sim |

Ou seja: 10 000 chamadas independentes de `analyze` sobre o mesmo input produzem 10 000 outputs byte-a-byte idênticos. Não há relógio do sistema, nem geração aleatória, nem leitura de estado externo influenciando o resultado — apenas as funções puras compostas em pipeline. A propriedade f(x) \=== f(x) enunciada em 5.1 deste relatório é demonstrável empiricamente, em escala, com asserção mecânica.

## **7.6 Síntese dos Resultados**

Os quatro testes confirmam, em conjunto, a coerência interna do projeto. O pipeline funcional sobrevive a cargas de até 2 milhões de logs em condições normais de execução de navegador (7.2). Sob paralelismo real com 8 workers, produz resultados perfeitamente idênticos sem qualquer primitiva de sincronização — enquanto a versão imperativa equivalente corrompe seu próprio resultado em mais de 50% dos incrementos (7.3). Paga um overhead de throughput da ordem de 3× em relação ao imperativo, mas obtém em troca correção sob concorrência sem mutexes, testabilidade trivial e ausência estrutural de bugs de estado (7.4). E sua propriedade definidora — determinismo — sobrevive a 10 000 execuções repetidas sem variação (7.5).

Esses resultados não são novos no campo da Programação Funcional — são exatamente os que Sebesta (Cap. 15\) e Moseley & Marks (2006) preveem a partir dos primeiros princípios do paradigma. O que este projeto demonstra é que tais propriedades não são privilégio de linguagens funcionais puras como Haskell: emergem também em JavaScript ES6+, *desde que* a disciplina de design seja aplicada com rigor — proibição de loops sobre coleções, `const`, `Object.freeze`, e uso exclusivo de `map`/`filter`/`reduce`. A linguagem é multi-paradigma; o paradigma é uma escolha que se faz e se sustenta artefato por artefato.

# **8\. Considerações Finais**

Este documento define formalmente o escopo, a linguagem, os fundamentos teóricos e o planejamento do grupo para o Projeto Final do Tema 4\. A escolha do paradigma funcional em JavaScript ES6+ permite demonstrar, de forma prática e interativa, os conceitos centrais do Capítulo 15 de Sebesta — transparência referencial, funções como cidadãs de primeira classe e avaliação preguiçosa — em um problema de relevância real para a Engenharia de Software.

O projeto demonstra que restrições formais — como a proibição de loops e variáveis globais mutáveis — não são apenas exercícios acadêmicos, mas refletem uma disciplina de design que elimina estruturalmente uma classe inteira de bugs relacionados a estado compartilhado. A imutabilidade garantida por Object.freeze() e a transparência referencial de cada função tornam o sistema trivialmente testável e livre de dependências de ordem de execução.

O grupo está ciente dos critérios de avaliação: fundamentação teórica com terminologia correta de Sebesta (2,5 pts), qualidade da comparação entre paradigmas (2,5 pts) e qualidade do código/protótipo (2,0 pts). Todos os entregáveis serão orientados por esses critérios, priorizando o 'porquê' sobre o 'como' em cada decisão de design.

# **9\. Referências**

Além do livro-texto de Sebesta, o grupo utilizará os seguintes materiais, conforme sugerido no enunciado do projeto:

## **9.1 Referências Primárias**

1. SEBESTA, Robert W. Concepts of Programming Languages. 12ª ed. Pearson, 2019\. Cap. 3, 5, 6 e 15\.

2. MDN Web Docs. Array.prototype.map(), .filter(), .reduce(). Mozilla Developer Network. Disponível em: developer.mozilla.org. Acesso em: mai. 2026\.

3. BIRD, Richard; WADLER, Philip. Introduction to Functional Programming. Prentice Hall, 1988\. Cap. 1–3 (fundamentos matemáticos do paradigma funcional).

4. MOSELEY, Ben; MARKS, Peter. Out of the Tar Pit. 2006\. Disponível em: curtclifton.net/papers/MoseleyMarks06a.pdf. (Artigo clássico sobre como estado mutável aumenta a complexidade do software.)

   

## **9.2 Referências de Suporte**

5. ECMAScript 2015 (ES6) Language Specification. ECMA-262. ECMA International, 2015\. (Especificação formal de generators, arrow functions e destructuring.)

6. MDN Web Docs. Iterators and Generators. Disponível em: developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators\_and\_generators.

7. Learn You a Haskell for Great Good\! Disponível em: learnyouahaskell.com. (Referência paralela para contrastar com Haskell quando necessário.)

8. MOZILLA DEVELOPER NETWORK. Array.prototype.map(), filter(), reduce(). Disponível em: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Array. Acesso em: mai. 2026\.

9. MOSELEY, Ben; MARKS, Peter. Out of the Tar Pit. 2006\. Disponível em: http://curtclifton.net/papers/MoseleyMarks06a.pdf. Acesso em: mai. 2026\.

10. LIPOVACA, Miran. Learn You a Haskell for Great Good\! A Beginner’s Guide. San Francisco: No Starch Press, 2011\. Disponível em: http://learnyouahaskell.com. Acesso em: mai. 2026\.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUEAAADaCAYAAAA42PAFAAAMX0lEQVR4Xu3dT4hkVxXH8UkIIVEhuAgunKn36s9kcPyPiC4UB5SAMaIgLiL+XaggKgZEk9g9M4JKUKKiGHFhQHChwY1GNAtBnK6JLgLRRRBcaPwDGhEiBKMGnPHdSt/Kqd879773ql71VFd/P3Cod8899976e6a705k5dgwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIjd6eWFAIAjQZufBgBsJW12TQEAW0GbW5fYmV7S7QDgcNCGtkrsTG/R7QFgM+1Of1VrYn0FAGw8bVz9xmf1OADYLPXG1WfQBAEcoJ3pL+cNqK164+ozaIIADsC5izc7DeiZaKL1/QZNEMAanf/5dU7j8SNF6/oNmiCANbj74RuchtMulM73G62b4LgoL2tojaW1uXqta4pJWd6ue+Toei8mRfFKXQdgWfVm0y363CsfW9sEy7K8Ttc1he4BYFn1ZtMt+twrH1vZBLW+TYwG5TndB8Cy6s2mW/S5Vz42tgmOiuKWVJwqiqHuEek+NiZFeZ+tHY1Gr2u6bwCWUW823aLPvfKxsU1Qa9oYF8WfdZ9l9wKwinqz6RZ97pWPLWuC/ewD9G5SlnfEMLnXennLm7e5VNg9roh6s+kWfe6Vj61pgtWav6y6B7A23htzNCg/3fSm9eZ0jRd2jyui3my6hUdrVo2O9Dluep61NlevdU2h6wOtSdUBV4T3xqQJZiJlZ+/WWm3XuP2h63XbNvQ5bnqetTZXr3VNoesDrelS17QGWJn3JvOaoL4JvXyufqNo82kTOxc/oNu4dvceqK1tivOPXqvbdKHPe9Nzr7W5eq1rCl0faE2XuqY1wMq8N5ltgvqLrbl1G/umjc3mk795rpvPx58W1rS1O/2xs9dinH9oosuWoc9703Ovtbl6rWsKXR9oTZe6pjVJutjbyMvl8pHuNynLH6bmvL28XCqvY82HD2hqzlsX2PkYo7Jc+FM+t8fC2rK8X+ctPSfGTcePv7BtrXcf+uSdY5tgqqYpt+773Yo2nRhK51N1y9id/qu27+50/pmZ+XL1bfAKZ+rz3vTca22uXutytSm6vs0eWt9mzQJd7G3k5drmNZatiblUXsea1yY4GQ7fI+c+becDme90H3XOm7e0VqNtra3rm3eONkGvTsea8yLWrV296fihUvk+pPbW+5SqyzhZFO/o8lxr7eTEibHWRFrbtLfn9I03Pk/3aNpHa5vqa9osTB3QNheNRqMb4nWuLlrm3DjWvDZBW9+01suNT5x4ycI4VZeYV6k6L+/lDoJ37qFtgtpI2saVoPchFS3pcz0phj/QmkDrml4XrW2qT9E9mvbSulytq81CPWA8HL5X8/vjp5r2inStp3bus+fU1upY81eqCdrrk2X5CltjpfZZnBt+rql2nbxzvSaotd66VH7tdqc/qTWPZeIg6Jlto4E+97MYDD+4WFN8plbT8DppbVN9ju4TYzQYvLFNrdZk6WJvIzv2rlPjYFKWd1bjR2PEvK3V0JrUtVebijZN0O6nNak6L2fz4XpSlL/3aqzUPt6cHWvo2j5556Sa4Kgsf6T3zdak8mu1O32y1jBWiXXSs7pGA33+24TuobS+zZqUau0/dK8uoftl6WJvIzvWmtTcfG1ZftXNO3ukapz6/6RqU2GbYMxVH+AvhPGkKO7S/WydRqom5qqv+G7TnI6Vt09qzo41dG2fvHNSTTDQ+2ZrUvm1ognOVa/bBX0NclEtuUr3ULqmh9f1at2vbehGWW0W6rweGOd0bGk+VxvpfBxXX1n9OjUXx5r3mqAX3lodd8nVYlB+L9ZZ3j46V31VfXdT7Tp55+aaYLDw2E1NKr9WNMEafR280DUpuq7L2pzJYHBa983EU7q+UZs7rPPOwbO58DMvk3vi2R3ye9g6S+dHg9Gt3rlerebbNsGmPTWXW5eKWGel5r28lzsI3rk0wTXRs7oG2tM3o/fG1LG3LpXXaFOnNXHsrdO8rbX52AS9tam8jr2crhs736oHp0+fvtbLR3afKv4p4/B7hm9P1C6E3ROCJgiPfoi8D5SONa9z46L4ou6ldZrP1cSx5rvUahOsLq+W0toeOra5mM+ML9l1MvffzFwtVqmFQRMEcKTRBAEcaTRBAEfaYWqCgZ7XNrB9xkXxtTY/95Ka2u81TYriAS/CP/hysiw/pXmNquY18drdtyznf8OvXefWSj4If1lCyC/8nG9Qfljr9H6l9oM4bE0w2Nk7Uzs3FS3Yz49eV++hj3j5cDspynvjdXX7ePVePxPn9XOZyD3u5LJrguFw+ALNpWpT+UPPPrDUg9S5rnU3DYcvH5fl9zWvYfdI7ds2p3t48xKPNdWZrZCijWPZuOvCy3Tr3uxOPz87w9qZ3lu7DzE6sO8TvY5jzeu1l7O61tnr+DvANq9rdd673hrxCcg9uFSNl4/jUVG8y9Yqb63OmdTCb7Vn6hb23Y+F/0qc2OeSk6vtvQ7VV76zr0LjWblzTxbFi8LtZDB4cbgdHR+9NNxWf7h8c3Zr9rC3k+HwG15+7bSRtI3z96/0l5pmXb58Ve283enfF2p2ppfmc0vQ95G9Pn78+PXV7V81r9eai6G5UVE+EnM2b8ctr69ycu61nnHotXlQuXmdi+M+mmCcs2PvrGdXLuZy86l8arwu8yY4GLxK7/tiZfsmGMVxbIKz66L4+kE9tpmd6Smn6aTiS7q8V/XzJPY+pEuWEZ/f8Hrpe8rOa96Oq2+F32DHp4bDUyFszt4G1be1rx+PxydSey+cv/++i7+In60tyv/ZvN6XQy8+aTYW5hP5SOd0L5336nQu/mwkzqX2So2rF/g7dnzm2LFrajUhqsdevdnOmdy/3ToTcb4vtgnObjNnaRPUungd81XDu2tWXzVBW6vrDkyt6ezH+Yefo6VZYc25vYGmXaGx6XlNcfbiH3QbHAH2w+d9YFIfGp3TPXTeq9O5wLsP9jqG/Wt/dD/vDF0/36co3hJrcnW2BkuKzWZn7z6dytJmFSLlzgs31mq7x+K3yUfUkXvfVw/4afuBr26fyDUAnYvjVb4dDuQ+1Pb31uqcV6e5M2fOXKM1ts7mcIXUm1M9utZ3iY70PRavq+863qZzWj8eDD/mzM/+yitbH69tzq6rzvqK7pOpnd+vMB4MBs+P19V3Vb/Ts1P7bhV9kKkH7uXjuK8mWMVPvf11rc1V32J+PEaurk0ujtfFnDP/Xwzt2Ylr94fYWpdYO687FLQhZePC+7uvaREd6fPrvVb2eiFXNcHJieHNOu+ts+a1+00rNMHqM3hLqi6VC9cLTbDF2YdefJBexJrqCb1D56Ru/vuCMbdqEwy8Gjl74Qe23l66h46D8E8SaE7OmUf17febYk0fvPszv6/VG1rrdI3k/zgpym+H6+o1+4Wui56p8/+6942jDSkbm9MEvdcrXts6rU98JXh5Mhy+09vD1tjr1FeCeqbNxet6EyzePB+b/4YQ1xx68QFpaJ1tFLm6mD+IJujV2pzNxzkda52ONdbVBOP14u3wZ07d1dVrcbJ2v8ryE3avVBMcD4cf1dxG04aUjc1pgjqu/kB7X9XI3mpe49mPmez8LPa/ErxpNHq1eX3/Zved7zcYvNueEW/Dr+E885Xg8J5QF8a2ztbq7XhQPhibYIjqD8vvLtSEc8O++2NgZdWfsk+G0Fy8rj4494yK8rc2r2vsOPxTC7NcWT5YXxP+j4L98aD8Vly/0bQhZWMzmiAA9EcbUjZoggC2jTakbNAEAWwbbUi5WGZNmwCAK04bU65J6fyqAQAbwzans3u36fSMNrFVAwAOlbMX7641slUCAA6ls3v31RpalwCArbA7fazW4HIBAFtJm50GABwJND8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2+L/H/H17Kpl2FoAAAAASUVORK5CYII=>