'use strict';

const http = require('node:http');
const os = require('node:os');

const PORT = process.env.PORT || 3000;

const page = () => `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>App Azure — Test de déploiement</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      background: radial-gradient(1200px 600px at 50% -10%, #15151b, #0a0a0c 60%);
      color: #e7e7ea;
    }
    .card {
      width: min(92vw, 540px);
      padding: 40px 36px;
      border: 1px solid #26262d;
      border-radius: 18px;
      background: rgba(20, 20, 24, 0.6);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #9aa0a6;
      border: 1px solid #2c2c34;
      padding: 6px 12px;
      border-radius: 999px;
    }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #3ddc84;
      box-shadow: 0 0 12px #3ddc84;
      animation: pulse 1.8s ease-in-out infinite;
    }
    @keyframes pulse { 50% { opacity: 0.35; } }
    h1 {
      margin: 22px 0 8px;
      font-size: 30px;
      letter-spacing: -0.02em;
    }
    p.sub { margin: 0 0 26px; color: #9aa0a6; }
    dl {
      margin: 0;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px 16px;
      text-align: left;
      font-size: 14px;
    }
    dt { color: #7c828a; }
    dd { margin: 0; font-variant-numeric: tabular-nums; color: #e7e7ea; }
    .foot { margin-top: 26px; font-size: 12px; color: #5c626a; }
  </style>
</head>
<body>
  <main class="card">
    <span class="badge"><span class="dot"></span> En ligne</span>
    <h1>Déploiement Azure réussi 🚀</h1>
    <p class="sub">App web Node.js minimaliste — thème dark.</p>
    <dl>
      <dt>Node.js</dt><dd>${process.version}</dd>
      <dt>Hôte</dt><dd>${os.hostname()}</dd>
      <dt>Plateforme</dt><dd>${process.platform} / ${process.arch}</dd>
      <dt>Heure serveur</dt><dd>${new Date().toISOString()}</dd>
    </dl>
    <p class="foot">GET <code>/health</code> pour le endpoint de santé (JSON).</p>
  </main>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime(), node: process.version }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page());
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
