// Gera os cartoes clicaveis dos projetos (assets/proj-<slug>.svg + .png)
// Uso: node scripts/projects.js
const fs = require("fs");

const projetos = [
  {
    slug: "talentbridge",
    nome: "talentbridge",
    linhas: ["AI recruiting platform: resume analysis", "and isolated code execution"],
    tags: ["TypeScript", "Prisma", "Docker"],
  },
  {
    slug: "TrueHate",
    nome: "TrueHate",
    linhas: ["Internal whistleblowing channel with", "admin panel and user management"],
    tags: ["Python", "MySQL", "HTML5"],
  },
  {
    slug: "umidade-esp32",
    nome: "umidade-esp32",
    linhas: ["Soil moisture monitor with ESP32", "and a real-time web dashboard"],
    tags: ["C/C++", "Node.js", "PostgreSQL"],
  },
  {
    slug: "Portfolio",
    nome: "Portfolio",
    linhas: ["Personal portfolio on GitHub Pages", "with projects and contact info"],
    tags: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    slug: "Crud-PHP",
    nome: "Crud-PHP",
    linhas: ["Full CRUD registration system", "integrated with a MySQL database"],
    tags: ["PHP", "MySQL", "Bootstrap"],
  },
  {
    slug: "Celso_ramos",
    nome: "Celso_ramos",
    linhas: ["School assignments and exercises", "built during high school"],
    tags: ["HTML5", "CSS3"],
  },
];

const F = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
const W = 360, H = 126;

for (const p of projetos) {
  let tx = 16;
  const tags = p.tags
    .map((t) => {
      const w = Math.round(t.length * 5.9 + 20);
      const el = `<g>
    <rect x="${tx}" y="86" width="${w}" height="19" rx="9.5" fill="#1b0b2e" stroke="#3b0764"/>
    <text x="${tx + w / 2}" y="99" text-anchor="middle" font-family="${F}" font-size="9.5" fill="#d8b4fe">${t}</text>
  </g>`;
      tx += w + 7;
      return el;
    })
    .join("\n  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Project ${p.nome}">
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

<text x="16" y="30" font-family="${F}" font-size="13.5" font-weight="700" fill="#f3e8ff">${p.nome}</text>
<text x="${W - 16}" y="29" text-anchor="end" font-family="${F}" font-size="9" fill="#8b5cf6">repo &#8599;</text>

<text x="16" y="55" font-family="${F}" font-size="10.5" fill="#b79ecf">${p.linhas[0]}</text>
<text x="16" y="73" font-family="${F}" font-size="10.5" fill="#b79ecf">${p.linhas[1]}</text>

${tags}
</svg>
`;
  fs.writeFileSync(`assets/proj-${p.slug}.svg`, svg, "utf8");
}

console.log(`ok — ${projetos.length} cartoes de ${W}x${H}`);
