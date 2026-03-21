# Projeto PWA — Roteiro Prático de Anatomia

Abaixo estão os arquivos completos do app em PWA, com os termos exatamente como você enviou, sem renomear nem acrescentar nomes anatômicos.

---

## 1) `index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0f172a" />
  <title>Roteiro Prático de Anatomia</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="topbar">
    <div>
      <p class="eyebrow">PWA educacional</p>
      <h1>Roteiro Prático de Anatomia</h1>
      <p class="subtitle">Com imagens, anotações, tabela editável, modo offline e exportação em PDF.</p>
    </div>
    <div class="top-actions">
      <button id="installBtn" class="btn secondary hidden">Instalar app</button>
      <button id="noteBtn" class="btn ghost">Tomar nota</button>
      <button id="pdfBtn" class="btn primary">Salvar em PDF</button>
    </div>
  </header>

  <main class="container">
    <section class="hero card">
      <div>
        <h2>Roteiro prático</h2>
        <p>Este aplicativo mantém os termos anatômicos exatamente como foram fornecidos. Você pode inserir imagens em cada bloco, fazer anotações e usar offline.</p>
      </div>
      <div class="hero-grid">
        <div class="mini-pill">PWA</div>
        <div class="mini-pill">Offline</div>
        <div class="mini-pill">Imagens</div>
        <div class="mini-pill">PDF</div>
      </div>
    </section>

    <section class="card">
      <h2>1.</h2>
      <div class="term-box">
        <p><strong>Defina esqueleto axial e esqueleto apendicular.</strong></p>
      </div>
      <div class="note-wrapper">
        <label class="field-label">Resposta / anotações</label>
        <textarea class="note" data-note-id="sec-1" placeholder="Digite aqui..."></textarea>
      </div>
      <div class="upload-row">
        <label class="upload-btn">
          <input type="file" accept="image/*" multiple data-image-id="sec-1" />
          Inserir imagens
        </label>
      </div>
      <div class="gallery" id="gallery-sec-1"></div>
    </section>

    <section class="card">
      <h2>2.</h2>
      <div class="term-box">
        <p><strong>Faça uma tabela (conforme modelo abaixo) com os nomes de todos os ossos do CH, classificando-os como esqueleto axial ou apendicular, e quanto à forma do osso.</strong></p>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome do osso</th>
              <th>Axial ou apendicular</th>
              <th>Forma do osso</th>
            </tr>
          </thead>
          <tbody id="ossosTable"></tbody>
        </table>
      </div>

      <div class="row-actions">
        <button class="btn secondary" id="addRowBtn">Adicionar linha</button>
        <button class="btn ghost" id="resetRowsBtn">Restaurar linhas vazias</button>
      </div>

      <div class="note-wrapper">
        <div class="note-wrapper">
        <div class="note-wrapper">
        <label class="field-label">Anotações</label>
        <textarea class="note" data-note-id="sec-4" placeholder="Digite aqui..."></textarea>
      </div>
      <div class="upload-row">
        <label class="upload-btn">
          <input type="file" accept="image/*" multiple data-image-id="sec-4" />
          Inserir imagens
        </label>
      </div>
      <div class="gallery" id="gallery-sec-4"></div>
    </section>

    <section class="card">
      <h2>ESQUELETO AXIAL</h2>
      <div id="roteiro-root"></div>
      <div class="note-wrapper">
        <label class="field-label">Anotações gerais</label>
        <textarea class="note" data-note-id="sec-geral" placeholder="Digite aqui..."></textarea>
      </div>
      <div class="upload-row">
        <label class="upload-btn">
          <input type="file" accept="image/*" multiple data-image-id="sec-geral" />
          Inserir imagens
        </label>
      </div>
      <div class="gallery" id="gallery-sec-geral"></div>
    </section>
  </main>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

---

## 2) `style.css`

```css
:root {
  --bg: #08111f;
  --bg-soft: #0f172a;
  --card: rgba(15, 23, 42, 0.88);
  --card-border: rgba(148, 163, 184, 0.18);
  --text: #e5eefc;
  --muted: #a9b8d0;
  --accent: #60a5fa;
  --accent-2: #22d3ee;
  --accent-3: #8b5cf6;
  --success: #10b981;
  --danger: #fb7185;
  --shadow: 0 18px 50px rgba(2, 8, 23, 0.45);
  --radius-xl: 24px;
  --radius-lg: 18px;
  --radius-md: 14px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(34,211,238,0.14), transparent 28%),
    radial-gradient(circle at top right, rgba(139,92,246,0.16), transparent 26%),
    linear-gradient(180deg, #020617 0%, #08111f 45%, #0a1325 100%);
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  padding: 28px 20px 8px;
  max-width: 1240px;
  margin: 0 auto;
}

.eyebrow {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: .16em;
  font-size: .78rem;
  color: var(--accent-2);
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 3rem);
}

.subtitle {
  margin-top: 8px;
  color: var(--muted);
  max-width: 780px;
}

.top-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px 20px 40px;
}

.card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  padding: 22px;
  margin-bottom: 18px;
  backdrop-filter: blur(14px);
}

.hero {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 18px;
  align-items: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 10px;
}

.mini-pill {
  padding: 16px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(96,165,250,.18), rgba(34,211,238,.12));
  border: 1px solid rgba(96,165,250,.25);
  text-align: center;
  font-weight: 700;
}

.btn, .upload-btn {
  border: 0;
  border-radius: 14px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .2s ease, opacity .2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn:hover, .upload-btn:hover { transform: translateY(-1px); }
.btn.primary { background: linear-gradient(135deg, var(--accent), var(--accent-3)); color: white; }
.btn.secondary { background: rgba(96,165,250,.14); color: var(--text); border: 1px solid rgba(96,165,250,.3); }
.btn.ghost { background: rgba(255,255,255,.06); color: var(--text); border: 1px solid rgba(255,255,255,.08); }
.hidden { display: none; }

.term-box {
  padding: 16px;
  border-radius: var(--radius-lg);
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
}

.note {
  width: 100%;
  min-height: 120px;
  resize: vertical;
  margin-top: 8px;
  border-radius: 14px;
  border: 1px solid rgba(148,163,184,.24);
  background: rgba(2,6,23,.45);
  color: var(--text);
  padding: 14px;
  outline: none;
}

.field-label {
  display: block;
  margin-top: 16px;
  margin-bottom: 6px;
  color: var(--muted);
  font-size: .95rem;
}

.upload-row { margin-top: 12px; }
.upload-btn {
  background: linear-gradient(135deg, rgba(34,211,238,.16), rgba(96,165,250,.16));
  border: 1px solid rgba(34,211,238,.28);
  color: var(--text);
}
.upload-btn input { display: none; }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.thumb {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(148,163,184,.18);
  background: rgba(255,255,255,.04);
}

.thumb img {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.thumb button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(2,6,23,.8);
  color: white;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 999px;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.tree-section {
  margin-top: 16px;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.tree-section > .tree-title {
  margin: 0 0 10px;
  color: #cfe0ff;
}

.tree-list {
  list-style: none;
  padding-left: 18px;
  margin: 0;
  border-left: 1px dashed rgba(148,163,184,.24);
}

.tree-item {
  margin: 8px 0;
}

.tree-label {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(96,165,250,.14), rgba(139,92,246,.14));
  border: 1px solid rgba(96,165,250,.2);
}

.table-wrap {
  overflow-x: auto;
  margin-top: 14px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

th, td {
  border: 1px solid rgba(148,163,184,.18);
  padding: 12px;
  vertical-align: top;
}

th {
  background: rgba(96,165,250,.12);
  text-align: left;
}

td[contenteditable="true"] {
  background: rgba(2,6,23,.3);
}

.row-actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.print-note {
  color: var(--muted);
}

@media (max-width: 900px) {
  .hero, .topbar {
    grid-template-columns: 1fr;
    display: grid;
  }
}

@media print {
  body {
    background: white;
    color: black;
  }
  .top-actions,
  .upload-row,
  .thumb button,
  #installBtn {
    display: none !important;
  }
  .card {
    box-shadow: none;
    border: 1px solid #ddd;
    background: white;
    color: black;
  }
  .tree-label {
    color: black;
    border: 1px solid #bbb;
    background: #f5f5f5;
  }
  .note {
    color: black;
    background: white;
    border: 1px solid #ccc;
  }
}
```

---

## 3) `data.js`

```javascript
const roteiroData = {
  titulo: "CRÂNIO",
  itens: [
    {
      nome: "1. Frontal",
      itens: [
        { nome: "a. Escama frontal" },
        { nome: "b. Túber frontal" },
        { nome: "c. Arco superciliar" },
        { nome: "d. Glabela" },
        { nome: "e. Margem supra-orbital" },
        { nome: "f. Incisura supra-orbital (forame supra-orbital)" },
        { nome: "g. Parte orbital" },
        { nome: "h. Parte nasal" },
        { nome: "i. Sutura frontal – Sutura metópica" },
        { nome: "j. Seio frontal" }
      ]
    },
    {
      nome: "2. Occipital",
      itens: [
        { nome: "a. Protuberância occipital externa" },
        { nome: "b. Crista occipital externa" },
        { nome: "c. Linha nucal superior" },
        { nome: "d. Linha nucal inferior" },
        { nome: "e. Protuberância occipital interna" },
        { nome: "f. Crista occipital interna" },
        { nome: "g. Sulco do seio transverso" },
        { nome: "h. Sulco do seio sagital superior" },
        { nome: "i. Sulco do seio sigmoide" },
        { nome: "j. Sulco do seio petroso inferior" },
        { nome: "k. Côndilo occipital" },
        { nome: "l. Canal do nervo hipoglosso" },
        { nome: "m. Canal condilar" },
        { nome: "n. Forame magno" },
        { nome: "o. Forame jugular" },
        { nome: "p. Parte basilar" },
        { nome: "q. Clivo" },
        { nome: "r. Fossa cerebelar" },
        { nome: "s. Fossa cerebral" }
      ]
    },
    {
      nome: "3. Etmoide",
      itens: [
        { nome: "a. Lâmina perpendicular" },
        { nome: "b. Lâmina cribriforme" },
        { nome: "c. Lâmina orbital" },
        { nome: "d. Crista etmoidal" },
        { nome: "e. Concha nasal superior" },
        { nome: "f. Concha nasal média" },
        { nome: "g. Seio etmoidal" },
        { nome: "h. Células etmoidais anteriores, médias e posteriores" }
      ]
    },
    {
      nome: "4. Mandíbula",
      itens: [
        { nome: "a. Corpo da mandíbula" },
        { nome: "b. Ramo da mandíbula" },
        { nome: "c. Ângulo da mandíbula" },
        { nome: "d. Tuberosidade massetérica" },
        { nome: "e. Tuberosidade pterigoidea" },
        { nome: "f. Base da mandíbula" },
        { nome: "g. Sínfise da mandíbula" },
        { nome: "h. Protuberância mentual" },
        { nome: "i. Tubérculo mentual" },
        { nome: "j. Forame mentual" },
        { nome: "k. Parte alveolar" },
        { nome: "l. Alvéolos dentais" },
        { nome: "m. Septos interalveolares" },
        { nome: "n. Septos interradiculares" },
        { nome: "o. Trígono retromolar" },
        { nome: "p. Linha oblíqua" },
        {
          nome: "q. Processo condilar",
          itens: [
            { nome: "i. Cabeça da mandíbula" },
            { nome: "ii. Colo da mandíbula" },
            { nome: "iii. Fóvea pterigoidea" }
          ]
        },
        {
          nome: "r. Processo coronoide",
          itens: [
            { nome: "i. Crista temporal" }
          ]
        },
        { nome: "s. Incisura da mandíbula" },
        { nome: "t. Forame da mandíbula" },
        { nome: "u. Canal da mandíbula" },
        { nome: "v. Língula da mandíbula" },
        { nome: "w. Fóvea submentual" },
        { nome: "x. Espinha geniana" },
        { nome: "y. Fossa digástrica" },
        { nome: "z. Fóvea submandibular" },
        { nome: "aa. Linha milo-hioidea" },
        { nome: "bb. Toro mandibular" }
      ]
    },
    {
      nome: "5. Parietal",
      itens: [
        {
          nome: "a. Face interna",
          itens: [
            { nome: "i. Sulco do seio sagital superior" }
          ]
        },
        {
          nome: "b. Face externa",
          itens: [
            { nome: "i. Linha temporal superior" },
            { nome: "ii. Linha temporal inferior" },
            { nome: "iii. Túber parietal (eminência parietal)" },
            { nome: "iv. Vértice" }
          ]
        },
        { nome: "c. Margem frontal" },
        { nome: "d. Margem escamosa" },
        { nome: "e. Margem occipital" },
        { nome: "f. Margem sagital" },
        { nome: "g. Forame parietal" }
      ]
    },
    {
      nome: "6. Temporal",
      itens: [
        { nome: "a. Parte escamosa" },
        { nome: "b. Parte timpânica" },
        { nome: "c. Parte petrosa" },
        { nome: "d. Processo mastoide" },
        { nome: "e. Incisura mastoidea" },
        { nome: "f. Sulco da artéria occipital" },
        { nome: "g. Poro/meato acústico externo" },
        { nome: "h. Poro/meato acústico interno" },
        { nome: "i. Processo estiloide" },
        { nome: "j. Forame estilomastoideo" },
        { nome: "k. Canal carótico" },
        { nome: "l. Forame lacerado (artefato de crânio seco; in vivo é fechado por uma cartilagem atravessada por pequenas veias e ramos da artéria meníngea)" },
        { nome: "m. Fossa mandibular" },
        { nome: "n. Tubérculo articular" },
        { nome: "o. Arco zigomático" },
        { nome: "p. Fossa temporal" },
        { nome: "q. Fossa infratemporal" },
        { nome: "r. Sulco do seio sigmoide" }
      ]
    },
    {
      nome: "7. Esfenoide",
      itens: [
        { nome: "a. Corpo" },
        { nome: "b. Asa menor" },
        { nome: "c. Asa maior" },
        { nome: "d. Sela turca" },
        { nome: "e. Tubérculo da sela" },
        { nome: "f. Fossa hipofisial" },
        { nome: "g. Processo clinóide anterior" },
        { nome: "h. Processo clinóide posterior" },
        { nome: "i. Canal óptico" },
        { nome: "j. Fissura orbital superior" },
        { nome: "k. Fissura orbital inferior" },
        { nome: "l. Forame redondo" },
        { nome: "m. Forame oval" },
        { nome: "n. Forame espinhoso" },
        { nome: "o. Processo pterigoide" },
        { nome: "p. Lâmina lateral do processo pterigoide" },
        { nome: "q. Lâmina medial do processo pterigoide" },
        { nome: "r. Fossa pterigoidea" },
        { nome: "s. Hâmulo pterigoideo" },
        { nome: "t. Crista infratemporal" },
        { nome: "u. Fossa pterigopalatina" },
        { nome: "v. Seio esfenoidal" },
        { nome: "w. Cóanos" }
      ]
    },
    {
      nome: "8. Vômer",
      itens: [
        { nome: "a. Crista coanal do vômer" }
      ]
    },
    {
      nome: "9. Palatino",
      itens: [
        { nome: "a. Lâmina perpendicular" },
        { nome: "b. Lâmina horizontal" },
        { nome: "c. Forame palatino maior" },
        { nome: "d. Forames palatinos menores" },
        { nome: "e. Espinha nasal posterior" },
        { nome: "f. Processo orbital" }
      ]
    },
    {
      nome: "10. Maxila",
      itens: [
        { nome: "a. Corpo da maxila" },
        { nome: "b. Seio maxilar" },
        {
          nome: "c. Face orbital",
          itens: [
            { nome: "i. Sulco infra-orbital" },
            { nome: "ii. Canal infra-orbital" }
          ]
        },
        { nome: "d. Margem infra-orbital" },
        { nome: "e. Forame infra-orbital" },
        { nome: "f. Fossa canina" },
        { nome: "g. Espinha nasal anterior" },
        { nome: "h. Túber da maxila" },
        { nome: "i. Processo frontal" },
        { nome: "j. Processo zigomático" },
        {
          nome: "k. Processo alveolar",
          itens: [
            { nome: "i. Alvéolos dentais" },
            { nome: "ii. Septo interalveolar" },
            { nome: "iii. Septo interadicular" },
            { nome: "iv. Forame incisivo" }
          ]
        },
        {
          nome: "l. Processo palatino",
          itens: [
            { nome: "i. Toro palatino" }
          ]
        },
        { nome: "m. Abertura piriforme" }
      ]
    },
    { nome: "11. Nasal" },
    {
      nome: "12. Lacrimal",
      itens: [
        { nome: "a. Sulco lacrimal" }
      ]
    },
    { nome: "13. Concha nasal inferior" },
    {
      nome: "14. Zigomático",
      itens: [
        { nome: "a. Processo frontal" },
        { nome: "b. Processo temporal" },
        { nome: "c. Forame zigomaticofrontal" }
      ]
    },
    { nome: "15. Fontículo anterior" },
    { nome: "16. Fontículo posterior" },
    { nome: "17. Fontículo ântero-lateral" },
    { nome: "18. Fontículo póstero-lateral" },
    { nome: "19. Sutura sagital" },
    { nome: "20. Sutura coronal" },
    { nome: "21. Sutura lambdoidea" },
    { nome: "22. Sutura occipitomastóidea" },
    { nome: "23. Sutura parietomastóidea" },
    { nome: "24. Sutura escamosa" },
    { nome: "25. Sutura esfenoparietal" },
    { nome: "26. Fissura petrotimpânica" },
    { nome: "27. Sutura frontonasal" },
    { nome: "28. Sutura internasal" },
    { nome: "29. Sutura nasomaxilar" },
    { nome: "30. Sutura intermaxilar" },
    { nome: "31. Sutura zigomaticamaxilar" },
    { nome: "32. Sutura palatina mediana" },
    { nome: "33. Sutura palatina transversa" },
    { nome: "34. Ossos suturais" },
    {
      nome: "35. Calvária",
      itens: [
        { nome: "a. Sulcos arteriovenosos" },
        { nome: "b. Impressões dos giros" },
        { nome: "c. Fovéolas granulares" }
      ]
    },
    { nome: "36. Base externa do crânio" },
    {
      nome: "37. Base interna do crânio",
      itens: [
        { nome: "a. Fossa anterior do crânio" },
        { nome: "b. Fossa média do crânio" },
        { nome: "c. Fossa posterior do crânio" },
        { nome: "d. Fossa cerebelar" }
      ]
    },
    {
      nome: "38. Ossículos da audição",
      itens: [
        { nome: "a. Martelo" },
        { nome: "b. Bigorna" },
        { nome: "c. Estribo" }
      ]
    }
  ]
};

const arquiteturaLongos = [
  "Observe a arquitetura óssea dos ossos longos e identifique:",
  "Diáfise",
  "Epífise proximal",
  "Epífise distal",
  "Metáfise",
  "Cartilagem epifisial",
  "Lâmina epifisial",
  "Linha epifisial",
  "Substância óssea compacta",
  "Substância óssea esponjosa",
  "Cavidade medular"
];

const arquiteturaPlanos = [
  "Observe a arquitetura óssea dos ossos planos do crânio e identifique:",
  "Díploe",
  "Lâmina externa da calvária",
  "Lâmina interna da calvária"
];
```

---

## 4) `app.js`

```javascript
const emptyRowsCount = 12;
const state = {
  deferredPrompt: null,
  images: JSON.parse(localStorage.getItem("roteiro-images") || "{}")
};

function saveNote(id, value) {
  localStorage.setItem(`note-${id}`, value);
}

function loadNotes() {
  document.querySelectorAll(".note").forEach(textarea => {
    const id = textarea.dataset.noteId;
    textarea.value = localStorage.getItem(`note-${id}`) || "";
    textarea.addEventListener("input", () => saveNote(id, textarea.value));
  });
}

function createEmptyRow() {
  const tr = document.createElement("tr");
  ["", "", ""].forEach(text => {
    const td = document.createElement("td");
    td.contentEditable = "true";
    td.spellcheck = false;
    td.textContent = text;
    tr.appendChild(td);
  });
  return tr;
}

function renderEmptyRows() {
  const tbody = document.getElementById("ossosTable");
  tbody.innerHTML = "";
  for (let i = 0; i < emptyRowsCount; i += 1) {
    tbody.appendChild(createEmptyRow());
  }
}

function renderSimpleList(targetId, items) {
  const target = document.getElementById(targetId);
  const wrapper = document.createElement("div");
  const first = document.createElement("p");
  first.className = "tree-title";
  first.textContent = items[0];
  wrapper.appendChild(first);

  const ul = document.createElement("ul");
  ul.className = "tree-list";

  items.slice(1).forEach(item => {
    const li = document.createElement("li");
    li.className = "tree-item";
    const span = document.createElement("span");
    span.className = "tree-label";
    span.textContent = item;
    li.appendChild(span);
    ul.appendChild(li);
  });

  wrapper.appendChild(ul);
  target.appendChild(wrapper);
}

function renderTreeNode(node) {
  const li = document.createElement("li");
  li.className = "tree-item";

  const label = document.createElement("span");
  label.className = "tree-label";
  label.textContent = node.nome;
  li.appendChild(label);

  if (node.itens && node.itens.length) {
    const ul = document.createElement("ul");
    ul.className = "tree-list";
    node.itens.forEach(child => ul.appendChild(renderTreeNode(child)));
    li.appendChild(ul);
  }

  return li;
}

function renderRoteiro() {
  const root = document.getElementById("roteiro-root");

  const section = document.createElement("section");
  section.className = "tree-section";

  const title = document.createElement("h3");
  title.className = "tree-title";
  title.textContent = roteiroData.titulo;
  section.appendChild(title);

  const ul = document.createElement("ul");
  ul.className = "tree-list";
  roteiroData.itens.forEach(item => ul.appendChild(renderTreeNode(item)));
  section.appendChild(ul);
  root.appendChild(section);
}

function persistImages() {
  localStorage.setItem("roteiro-images", JSON.stringify(state.images));
}

function renderGallery(sectionId) {
  const gallery = document.getElementById(`gallery-${sectionId}`);
  if (!gallery) return;
  gallery.innerHTML = "";

  const images = state.images[sectionId] || [];
  images.forEach((src, index) => {
    const box = document.createElement("div");
    box.className = "thumb";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Imagem ${index + 1}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = "×";
    btn.title = "Remover imagem";
    btn.addEventListener("click", () => {
      state.images[sectionId].splice(index, 1);
      persistImages();
      renderGallery(sectionId);
    });

    box.appendChild(img);
    box.appendChild(btn);
    gallery.appendChild(box);
  });
}

function handleImageInputs() {
  document.querySelectorAll("input[type='file'][data-image-id]").forEach(input => {
    const sectionId = input.dataset.imageId;
    renderGallery(sectionId);

    input.addEventListener("change", event => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      if (!state.images[sectionId]) state.images[sectionId] = [];

      let processed = 0;
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          state.images[sectionId].push(e.target.result);
          processed += 1;
          if (processed === files.length) {
            persistImages();
            renderGallery(sectionId);
            input.value = "";
          }
        };
        reader.readAsDataURL(file);
      });
    });
  });
}

function toggleAllNotes() {
  const notes = document.querySelectorAll(".note-wrapper");
  const hidden = Array.from(notes).every(note => note.hasAttribute("hidden"));
  notes.forEach(note => {
    if (hidden) {
      note.removeAttribute("hidden");
    } else {
      note.setAttribute("hidden", "hidden");
    }
  });
}

function setupButtons() {
  document.getElementById("pdfBtn").addEventListener("click", () => window.print());
  document.getElementById("addRowBtn").addEventListener("click", () => {
    document.getElementById("ossosTable").appendChild(createEmptyRow());
  });
  document.getElementById("resetRowsBtn").addEventListener("click", renderEmptyRows);

  const noteBtn = document.getElementById("noteBtn");
  if (noteBtn) {
    noteBtn.addEventListener("click", toggleAllNotes);
  }
}

function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
}

function setupInstallPrompt() {
  const installBtn = document.getElementById("installBtn");

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    state.deferredPrompt = e;
    installBtn.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    if (!state.deferredPrompt) return;
    state.deferredPrompt.prompt();
    await state.deferredPrompt.userChoice;
    state.deferredPrompt = null;
    installBtn.classList.add("hidden");
  });
}

function init() {
  renderEmptyRows();
  renderSimpleList("section-3", arquiteturaLongos);
  renderSimpleList("section-4", arquiteturaPlanos);
  renderRoteiro();
  loadNotes();
  handleImageInputs();
  setupButtons();
  registerSW();
  setupInstallPrompt();
}

document.addEventListener("DOMContentLoaded", init);
```

---

## 5) `manifest.json`

```json
{
  "name": "Roteiro Prático de Anatomia",
  "short_name": "Anatomia",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#08111f",
  "theme_color": "#0f172a",
  "description": "PWA com roteiro prático de anatomia, imagens, anotações, PDF e modo offline.",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 6) `service-worker.js`

```javascript
const CACHE_NAME = "roteiro-anatomia-pwa-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./data.js",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
```

---

## 7) Estrutura do repositório

```text
/roteiro-anatomia-pwa
  ├── index.html
  ├── style.css
  ├── data.js
  ├── app.js
  ├── manifest.json
  ├── service-worker.js
  └── /icons
      ├── icon-192.png
      └── icon-512.png
```

---

## 8) Como publicar no GitHub Pages

1. Crie o repositório.
2. Envie esses arquivos.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione **main** e a pasta **root**.
6. Salve.
7. O GitHub gerará o link do app.

---

## 9) Observação técnica importante

Os termos anatômicos incluídos aqui foram mantidos exatamente como você enviou nesta conversa, até o item **38. Ossículos da audição > c. Estribo**. Se houver continuação do roteiro depois de Estribo, basta acrescentar no `data.js` no mesmo padrão, sem alterar a estrutura do app.

```
```
