// Gera assets/projetos.svg — grid 2x3 com os cartoes dos projetos em destaque
// Uso: node scripts/projects.js
const fs = require("fs");

const projetos = [
  {
    nome: "talentbridge",
    linhas: ["Plataforma de recrutamento com IA: análise", "de currículos e execução de código isolada"],
    tags: ["TypeScript", "Prisma", "Docker"],
  },
  {
    nome: "TrueHate",
    linhas: ["Canal de denúncias internas com painel", "administrativo e controle de usuários"],
    tags: ["Flask", "MySQL", "HTML5"],
  },
  {
    nome: "umidade-esp32",
    linhas: ["Monitor de umidade do solo com ESP32", "e dashboard web em tempo real"],
    tags: ["C/C++", "Node.js", "PostgreSQL"],
  },
  {
    nome: "Portfolio",
    linhas: ["Portfólio pessoal publicado no GitHub Pages", "com projetos e contato"],
    tags: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    nome: "Crud-PHP",
    linhas: ["Sistema de cadastro com CRUD completo", "integrado ao banco de dados MySQL"],
    tags: ["PHP", "MySQL", "Bootstrap"],
  },
  {
    nome: "Celso_ramos",
    linhas: ["Trabalhos e exercícios desenvolvidos", "durante o ensino médio"],
    tags: ["HTML5", "CSS3"],
  },
];

const F = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
const CW = 420, CH = 132, GAP = 24, COLS = 2;
const ROWS = Math.ceil(projetos.length / COLS);
const W = CW * COLS + GAP * (COLS - 1);
const H = CH * ROWS + GAP * (ROWS - 1);

const cards = projetos
  .map((p, i) => {
    const ox = (i % COLS) * (CW + GAP);
    const oy = Math.floor(i / COLS) * (CH + GAP);

    let tx = ox + 18;
    const tags = p.tags
      .map((t) => {
        const w = Math.round(t.length * 6.2 + 22);
        const el = `<g>
    <rect x="${tx}" y="${oy + 92}" width="${w}" height="20" rx="10" fill="#1b0b2e" stroke="#3b0764"/>
    <text x="${tx + w / 2}" y="${oy + 106}" text-anchor="middle" font-family="${F}" font-size="10" fill="#d8b4fe">${t}</text>
  </g>`;
        tx += w + 8;
        return el;
      })
      .join("\n  ");

    return `<g>
  <rect x="${ox + 0.5}" y="${oy + 0.5}" width="${CW - 1}" height="${CH - 1}" rx="12" fill="url(#bg)" stroke="#2a1240"/>
  <rect x="${ox + 0.5}" y="${oy + 0.5}" width="${CW - 1}" height="${CH - 1}" rx="12" fill="url(#halo${i})"/>

  <text x="${ox + 18}" y="${oy + 31}" font-family="${F}" font-size="15" font-weight="700" fill="#f3e8ff">${p.nome}</text>
  <text x="${ox + CW - 18}" y="${oy + 30}" text-anchor="end" font-family="${F}" font-size="10" fill="#8b5cf6">repo &#8599;</text>

  <text x="${ox + 18}" y="${oy + 57}" font-family="${F}" font-size="11.5" fill="#b79ecf">${p.linhas[0]}</text>
  <text x="${ox + 18}" y="${oy + 76}" font-family="${F}" font-size="11.5" fill="#b79ecf">${p.linhas[1]}</text>

  ${tags}
</g>`;
  })
  .join("\n\n");

const halos = projetos
  .map(
    (_, i) => `<radialGradient id="halo${i}" cx="0.85" cy="0" r="0.9">
    <stop offset="0" stop-color="#a855f7" stop-opacity="0.18"/>
    <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
  </radialGradient>`
  )
  .join("\n  ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Projetos em destaque de Carlos Duhring">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0b0413"/>
    <stop offset="1" stop-color="#170a2b"/>
  </linearGradient>
  ${halos}
</defs>

${cards}
</svg>
`;

fs.writeFileSync("assets/projetos.svg", svg, "utf8");
console.log(`projetos.svg ok — ${W}x${H}, ${projetos.length} cards em ${COLS} colunas`);
