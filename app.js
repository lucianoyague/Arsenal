/* =============================================
   app.js — Arsenal FC Hinchada Argentina
   Practica: fetch(), DOM, eventos, Observer
   ============================================= */

// ── 1. NAV activo al scrollear ────────────────
const nav     = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Sombra en nav
  nav.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,0.5)'
    : 'none';

  // Link activo
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });


// ── 2. Menú mobile ────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Cerrar al clickear un link
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


// ── 3. Scroll reveal ─────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.style.getPropertyValue('--delay') || '0s';
      e.target.style.transitionDelay = delay;
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ── 4. Filtro de plantilla ────────────────────
const posTabs   = document.querySelectorAll('.pos-tab');
const players   = document.querySelectorAll('.player-card');

posTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    posTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const pos = tab.dataset.pos;
    players.forEach(card => {
      if (pos === 'all' || card.dataset.pos === pos) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ── 5. Resultados con API ─────────────────────
// Usamos la API gratuita de football-data.org
// Para más resultados, registrá una API Key gratuita en football-data.org

const TEAM_ID  = 57; // Arsenal ID en football-data.org
const API_URL  = `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=FINISHED&limit=10`;
const resultsList = document.getElementById('resultsList');

// Datos de respaldo en caso de que la API no responda (CORS sin API key)
const FALLBACK_RESULTS = [
  { comp: 'PL',  home: 'Arsenal',          away: 'Tottenham',       scoreH: 4, scoreA: 1, date: '16/03/2026', result: 'win' },
  { comp: 'UCL', home: 'Arsenal',          away: 'Bayer Leverkusen', scoreH: 2, scoreA: 0, date: '11/03/2026', result: 'win' },
  { comp: 'PL',  home: 'Crystal Palace',   away: 'Arsenal',          scoreH: 0, scoreA: 2, date: '08/03/2026', result: 'win' },
  { comp: 'PL',  home: 'Arsenal',          away: 'Aston Villa',      scoreH: 1, scoreA: 1, date: '01/03/2026', result: 'draw' },
  { comp: 'UCL', home: 'Arsenal',          away: 'Bayer Leverkusen', scoreH: 1, scoreA: 1, date: '25/02/2026', result: 'draw' },
  { comp: 'PL',  home: 'Ipswich Town',     away: 'Arsenal',          scoreH: 0, scoreA: 3, date: '22/02/2026', result: 'win' },
  { comp: 'EFL', home: 'Arsenal',          away: 'Manchester City',  scoreH: 2, scoreA: 1, date: '22/03/2026', result: 'win' },
  { comp: 'PL',  home: 'Arsenal',          away: 'Liverpool',        scoreH: 1, scoreA: 2, date: '18/02/2026', result: 'loss' },
  { comp: 'UCL', home: 'Real Madrid',      away: 'Arsenal',          scoreH: 1, scoreA: 3, date: '11/02/2026', result: 'win' },
  { comp: 'PL',  home: 'Brentford',        away: 'Arsenal',          scoreH: 0, scoreA: 1, date: '14/02/2026', result: 'win' },
];

const COMP_LABELS = {
  PL:  { label: 'PL',  class: 'epl' },
  UCL: { label: 'UCL', class: 'ucl' },
  EFL: { label: 'EFL', class: 'efl' },
  FA:  { label: 'FA',  class: 'fa'  },
};

function renderResults(data) {
  resultsList.innerHTML = '';

  if (!data || data.length === 0) {
    resultsList.innerHTML = '<div class="loading-results">No hay resultados disponibles.</div>';
    return;
  }

  data.forEach(match => {
    const isArsenalHome = match.home.toLowerCase().includes('arsenal');
    const comp = COMP_LABELS[match.comp] || { label: match.comp, class: 'epl' };

    const item = document.createElement('div');
    item.classList.add('result-item');
    item.dataset.comp = match.comp;

    item.innerHTML = `
      <span class="result-comp ${comp.class}">${comp.label}</span>
      <span class="result-team ${isArsenalHome ? 'arsenal-team' : ''}">${match.home}</span>
      <span class="result-score ${match.result}">${match.scoreH} - ${match.scoreA}</span>
      <span class="result-team ${!isArsenalHome ? 'arsenal-team' : ''}">${match.away}</span>
      <span class="result-date">${match.date}</span>
    `;

    resultsList.appendChild(item);
  });
}

// Intentar cargar de la API, si falla usar fallback
async function loadResults() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API no disponible');

    const json = await res.json();
    const matches = json.matches.slice(0, 10).map(m => {
      const isHome  = m.homeTeam.id === TEAM_ID;
      const scoreH  = m.score.fullTime.home ?? '?';
      const scoreA  = m.score.fullTime.away ?? '?';
      const arsenal = isHome ? scoreH : scoreA;
      const rival   = isHome ? scoreA : scoreH;
      const result  = arsenal > rival ? 'win' : arsenal < rival ? 'loss' : 'draw';
      const date    = new Date(m.utcDate).toLocaleDateString('es-AR');
      const comp    = m.competition.code;

      return {
        comp,
        home:   m.homeTeam.shortName || m.homeTeam.name,
        away:   m.awayTeam.shortName || m.awayTeam.name,
        scoreH, scoreA,
        date,
        result,
      };
    });

    renderResults(matches);
  } catch (e) {
    // Sin API key, usamos datos de respaldo
    console.log('Usando datos de respaldo (sin API key):', e.message);
    renderResults(FALLBACK_RESULTS);
  }
}

// Filtro de resultados
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const comp = btn.dataset.comp;
    document.querySelectorAll('.result-item').forEach(item => {
      item.style.display =
        comp === 'all' || item.dataset.comp === comp ? '' : 'none';
    });
  });
});

// Cargar resultados al iniciar
loadResults();


// ── 6. Año en footer ──────────────────────────
console.log('%c⚔ Arsenal FC — Hinchada Argentina', 'color: #EF0107; font-size: 14px; font-weight: bold;');
console.log('%cHecho con HTML · CSS · JS desde Argentina', 'color: #888;');