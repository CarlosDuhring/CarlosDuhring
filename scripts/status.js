// Gera assets/status.svg — cartao de estatisticas estatico (sem depender de servico externo)
// Uso: node scripts/status.js
const fs = require("fs");

const USER = "CarlosDuhring";
const OUT = "assets/status.svg";

const API = "https://api.github.com";
const H = { headers: { "User-Agent": USER, Accept: "application/vnd.github+json" } };

async function get(url) {
  const r = await fetch(url, H);
  if (!r.ok) throw new Error(url + " -> " + r.status);
  return r.json();
}

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : String(n));

(async () => {
  const user = await get(`${API}/users/${USER}`);
  const repos = await get(`${API}/users/${USER}/repos?per_page=100&sort=updated`);

  const stars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const own = repos.filter((r) => !r.fork);

  const langs = {};
  for (const r of own) {
    try {
      const l = await get(`${API}/repos/${USER}/${r.name}/languages`);
      for (const [k, v] of Object.entries(l)) langs[k] = (langs[k] || 0) + v;
    } catch (e) {}
  }
  const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
  const top = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k, v]) => [k, Math.round((v / total) * 100)]);

  const W = 1000, H2 = 210;
  const F = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

  const stats = [
    ["REPOSITÓRIOS", fmt(own.length)],
    ["ESTRELAS", fmt(stars)],
    ["SEGUIDORES", fmt(user.followers)],
    ["LINGUAGENS", fmt(Object.keys(langs).length)],
  ];

  const statEls = stats
    .map(([label, val], i) => {
      const x = 42 + i * 118;
      return `<text x="${x}" y="80" font-family="${F}" font-size="30" font-weight="700" fill="#f3e8ff">${val}</text>
  <text x="${x}" y="103" font-family="${F}" font-size="10.5" letter-spacing="1.6" fill="#a855f7">${label}</text>`;
    })
    .join("\n  ");

  const barEls = top
    .map(([name, pct], i) => {
      const y = 62 + i * 26;
      const w = Math.max(3, Math.round((pct / 100) * 300));
      return `<text x="560" y="${y + 9}" font-family="${F}" font-size="12" fill="#d8b4fe">${name}</text>
  <rect x="680" y="${y - 2}" width="300" height="9" rx="4.5" fill="#1b0b2e"/>
  <rect x="680" y="${y - 2}" width="${w}" height="9" rx="4.5" fill="url(#bar)"/>
  <text x="${990}" y="${y + 9}" text-anchor="end" font-family="${F}" font-size="11" fill="#9d7bb8">${pct}%</text>`;
    })
    .join("\n  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H2}" viewBox="0 0 ${W} ${H2}" role="img" aria-label="Estatísticas do GitHub de Carlos Duhring">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0b0413"/>
    <stop offset="1" stop-color="#150827"/>
  </linearGradient>
  <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#7c3aed"/>
    <stop offset="1" stop-color="#e9d5ff"/>
  </linearGradient>
  <radialGradient id="halo" cx="0.15" cy="0.1" r="0.7">
    <stop offset="0" stop-color="#a855f7" stop-opacity="0.22"/>
    <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
  </radialGradient>
</defs>

<rect x="0.5" y="0.5" width="${W - 1}" height="${H2 - 1}" rx="14" fill="url(#bg)" stroke="#3b0764"/>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H2 - 1}" rx="14" fill="url(#halo)"/>

<text x="42" y="40" font-family="${F}" font-size="12" fill="#9d7bb8">carlos@duhring:~$</text>
<text x="160" y="40" font-family="${F}" font-size="12" fill="#e9d5ff">status --all</text>
<line x1="42" y1="52" x2="958" y2="52" stroke="#2a1240"/>

${statEls}

<line x1="530" y1="62" x2="530" y2="196" stroke="#2a1240"/>

<text x="560" y="44" font-family="${F}" font-size="10.5" letter-spacing="1.6" fill="#a855f7">LINGUAGENS POR VOLUME DE CÓDIGO</text>
${barEls}
</svg>
`;

  fs.writeFileSync(OUT, svg, "utf8");
  console.log("status.svg ok —", top.map((t) => t.join(":")).join(" "));
})();
