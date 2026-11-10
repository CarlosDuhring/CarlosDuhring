// Gera os cartoes dos projetos em destaque (assets/proj-<slug>.svg)
// Uso: node scripts/projects.js
const fs = require("fs");

const projetos = [
  {
    slug: "talentbridge",
    nome: "talentbridge",
    linhas: ["Plataforma de recrutamento com IA: análise", "de currículos e execução de código isolada"],
    tags: ["TypeScript", "Prisma", "Docker"],
  },
  {
    slug: "TrueHate",
    nome: "TrueHate",
    linhas: ["Canal de denúncias internas com painel", "administrativo e controle de usuários"],
    tags: ["Flask", "MySQL", "HTML5"],
  },
  {
    slug: "umidade-esp32",
    nome: "umidade-esp32",
    linhas: ["Monitor de umidade do solo com ESP32", "e dashboard web em tempo real"],
    tags: ["C/C++", "Node.js", "PostgreSQL"],
  },
  {
    slug: "Portfolio",
    nome: "Portfolio",
    linhas: ["Portfólio pessoal publicado no GitHub Pages", "com projetos e contato"],
    tags: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "Crud-PHP",
    nome: "Crud-PHP",
    linhas: ["Sistema de cadastro com CRUD completo", "integrado ao banco de dados MySQL"],
    tags: ["PHP", "MySQL", "Bootstrap"],
  },
  {
    slug: "Celso_ramos",
    nome: "Celso_ramos",
    linhas: ["Trabalhos e exercícios desenvolvidos", "durante o ensino médio"],
    tags: ["HTML5", "CSS3"],
  },
];

const F = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
const W = 430, H = 132;

for (const p of projetos) {
  let tx = 18;
  const tags = p.tags
    .map((t) => {
      const w = Math.round(t.length * 6.2 + 22);
      const el = `<g>
    <rect x="${tx}" y="92" width="${w}" height="20" rx="10" fill="#1b0b2e" stroke="#3b0764"/>
    <text x="${tx + w / 2}" y="106" text-anchor="middle" font-family="${F}" font-size="10" fill="#d8b4fe">${t}</text>
  </g>`;
      tx += w + 8;
      return el;
    })
    .join("\n  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Projeto ${p.nome}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0b0413"/>
    <stop offset="1" stop-color="#170a2b"/>
  </linearGradient>
  <radialGradient id="halo" cx="0.85" cy="0" r="0.9">
    <stop offset="0" stop-color="#a855f7" stop-opacity="0.18"/>
    <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
  </radialGradient>
</defs>

<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="url(#bg)" stroke="#2a1240"/>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="url(#halo)"/>

<text x="18" y="31" font-family="${F}" font-size="15" font-weight="700" fill="#f3e8ff">${p.nome}</text>
<text x="${W - 18}" y="30" text-anchor="end" font-family="${F}" font-size="10" fill="#7c3aed">repo &#8599;</text>

<text x="18" y="57" font-family="${F}" font-size="11.5" fill="#b79ecf">${p.linhas[0]}</text>
<text x="18" y="76" font-family="${F}" font-size="11.5" fill="#b79ecf">${p.linhas[1]}</text>

${tags}
</svg>
`;
  fs.writeFileSync(`assets/proj-${p.slug}.svg`, svg, "utf8");
}

console.log("cartoes gerados:", projetos.length);
