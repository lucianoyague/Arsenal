/* =============================================
   app.js — Arsenal FC Hinchada Argentina
   Practica: fetch(), DOM, eventos, Observer, modal
   ============================================= */

// ── DATOS DE JUGADORES (temporada 2025/26) ────
const PLAYERS = {
  // PORTEROS
  1: {
    name: 'David Raya', nat: '🇪🇸 España', age: 29, height: 183,
    pos: 'Portero', num: 1,
    photo: 'fotos/raya.png',
    bio: 'Portero titular indiscutido. Llegó cedido del Brentford en 2023 y fue fichado definitivamente. Referente bajo los tres palos con excelentes reflejos y gran dominio del juego con los pies.',
    goals: 0, assists: 0, matches: 28, minutes: 2520, yellow: 1, value: '€28M'
  },
  13: {
    name: 'Kepa Arrizabalaga', nat: '🇪🇸 España', age: 30, height: 186,
    pos: 'Portero', num: 13,
    photo: 'fotos/kepa.png',
    bio: 'Suplente de lujo. Ex portero del Chelsea y Athletic Club, llegó este verano como alternativa de calidad a Raya. Fue protagonista con grandes intervenciones en la EFL Cup.',
    goals: 0, assists: 0, matches: 8, minutes: 720, yellow: 0, value: '€8M'
  },
  // DEFENSORES
  2: {
    name: 'William Saliba', nat: '🇫🇷 Francia', age: 24, height: 192,
    pos: 'Defensor Central', num: 2,
    photo: 'fotos/saliba.png',
    bio: 'Considerado uno de los mejores defensores del mundo. Imponente en el juego aéreo, veloz y seguro en el uno contra uno. Pilar fundamental en la defensa de Arteta desde 2022.',
    goals: 2, assists: 1, matches: 30, minutes: 2700, yellow: 2, value: '€120M'
  },
  3: {
    name: 'Cristhian Mosquera', nat: '🇨🇴 Colombia', age: 21, height: 187,
    pos: 'Defensor Central', num: 3,
    photo: 'fotos/mosquera.png',
    bio: 'Joven promesa colombiana llegada del Valencia en el verano 2025. Reemplazó a Kieran Tierney con el dorsal 3. Rápido, agresivo y con gran proyección ofensiva por la banda izquierda.',
    goals: 0, assists: 2, matches: 20, minutes: 1620, yellow: 3, value: '€30M'
  },
  4: {
    name: 'Ben White', nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', age: 27, height: 183,
    pos: 'Defensor / Lateral derecho', num: 4,
    photo: 'fotos/white.png',
    bio: 'Versátil defensor inglés que puede jugar de central o lateral derecho. Excelente en la salida del juego y con gran capacidad para incorporarse al ataque por la derecha.',
    goals: 0, assists: 1, matches: 18, minutes: 1440, yellow: 1, value: '€45M'
  },
  5: {
    name: 'Piero Hincapié', nat: '🇪🇨 Ecuador', age: 23, height: 181,
    pos: 'Defensor Central / Lateral', num: 5,
    photo: 'fotos/hincapie.png',
    bio: 'Internacional ecuatoriano llegado del Bayer Leverkusen. Zurdo natural con gran capacidad de anticipación y lectura del juego. Su llegada reforzó considerablemente el lateral izquierdo.',
    goals: 0, assists: 1, matches: 22, minutes: 1800, yellow: 2, value: '€38M'
  },
  6: {
    name: 'Gabriel Magalhães', nat: '🇧🇷 Brasil', age: 27, height: 190,
    pos: 'Defensor Central', num: 6,
    photo: 'fotos/gabriel.jpg',
    bio: 'El corazón de la defensa arsenal. Combina potencia física con una técnica depurada. Goleador en situaciones de pelota parada. Renovó su contrato a largo plazo en junio de 2025.',
    goals: 3, assists: 0, matches: 29, minutes: 2520, yellow: 3, value: '€70M'
  },
  12: {
    name: 'Jurrien Timber', nat: '🇳🇱 Holanda', age: 23, height: 181,
    pos: 'Defensor / Lateral', num: 12,
    photo: 'fotos/timber.png',
    bio: 'Polivalente defensor holandés con gran capacidad técnica. Tras perderse casi toda su primera temporada por lesión, explotó definitivamente en 2025/26 siendo uno de los mejores del equipo con 3 goles.',
    goals: 3, assists: 3, matches: 30, minutes: 2610, yellow: 2, value: '€65M'
  },
  33: {
    name: 'Riccardo Calafiori', nat: '🇮🇹 Italia', age: 22, height: 187,
    pos: 'Defensor Central / Lateral', num: 33,
    photo: 'fotos/calafiori.png',
    bio: 'Lateral izquierdo con alma de centrocampista. Su capacidad para salir jugando y su visión de juego lo hacen único. Llegado del Bologna, fue una de las revelaciones de la Euro 2024 con Italia.',
    goals: 1, assists: 2, matches: 25, minutes: 1980, yellow: 4, value: '€55M'
  },
  49: {
    name: 'Myles Lewis-Skelly', nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', age: 18, height: 179,
    pos: 'Lateral Izquierdo / Mediocampista', num: 49,
    photo: 'fotos/mls.png',
    bio: 'La joya de la cantera del Arsenal. Con apenas 18 años se ganó un lugar en el equipo titular gracias a su valentía, inteligencia táctica y calidad técnica. Renovó su contrato en junio 2025.',
    goals: 1, assists: 2, matches: 28, minutes: 2100, yellow: 2, value: '€30M'
  },
  // MEDIOCAMPISTAS
  8: {
    name: 'Martin Ødegaard', nat: '🇳🇴 Noruega', age: 27, height: 178,
    pos: 'Mediocampista Central', num: 8,
    photo: 'fotos/odegard.png',
    bio: 'Capitán y cerebro del Arsenal. Ex prodigio del Real Madrid, Ødegaard es el motor creativo del equipo con una visión de juego extraordinaria. Registró 1 gol y 5 asistencias en la PL esta temporada.',
    goals: 3, assists: 7, matches: 25, minutes: 2078, yellow: 2, value: '€65M'
  },
  16: {
    name: 'Christian Nørgaard', nat: '🇩🇰 Dinamarca', age: 31, height: 187,
    pos: 'Mediocampista Defensivo', num: 16,
    photo: 'fotos/norgard.png',
    bio: 'Mediocampista defensivo llegado del Brentford en verano 2025. Conocido por su intensidad, capacidad de recuperación y liderazgo. Aporta experiencia y músculo al medio del campo.',
    goals: 0, assists: 1, matches: 22, minutes: 1620, yellow: 3, value: '€18M'
  },
  23: {
    name: 'Mikel Merino', nat: '🇪🇸 España', age: 28, height: 191,
    pos: 'Mediocampista', num: 23,
    photo: 'fotos/merino.png',
    bio: 'Llegado de la Real Sociedad en 2024, el español se asentó como pieza clave en la temporada 2025/26. Combina físico imponente con una técnica refinada y gran sentido goleador.',
    goals: 4, assists: 2, matches: 28, minutes: 2100, yellow: 3, value: '€45M'
  },
  36: {
    name: 'Martín Zubimendi', nat: '🇪🇸 España', age: 26, height: 180,
    pos: 'Mediocampista Defensivo', num: 36,
    photo: 'fotos/zubimendi.png',
    bio: 'Uno de los mejores mediocampistas defensivos del mundo. Elegó el dorsal 36 con el que debutó en la Real Sociedad. Su capacidad para interceptar, distribuir y romper líneas lo hace imprescindible.',
    goals: 5, assists: 3, matches: 31, minutes: 2610, yellow: 2, value: '€80M'
  },
  41: {
    name: 'Declan Rice', nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', age: 26, height: 185,
    pos: 'Mediocampista Central', num: 41,
    photo: 'fotos/rice.png',
    bio: 'Fichaje récord en 2023, Rice es el motor incansable del Arsenal. Lidera en recuperaciones de balón (36), conducciones progresivas (145) y lleva su forma de 2024/25 a una nueva dimensión esta temporada.',
    goals: 4, assists: 4, matches: 30, minutes: 2700, yellow: 4, value: '€120M'
  },
  29: {
    name: 'Kai Havertz', nat: '🇩🇪 Alemania', age: 26, height: 193,
    pos: 'Mediocampista / Delantero', num: 29,
    photo: 'fotos/havertz.png',
    bio: 'Versátil y elegante, el alemán puede jugar como mediapunta o falso 9. Ha encontrado su mejor versión en el Arsenal con goles importantes y una comprensión táctica superior.',
    goals: 3, assists: 2, matches: 26, minutes: 1980, yellow: 1, value: '€50M'
  },
  // DELANTEROS
  7: {
    name: 'Bukayo Saka', nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', age: 23, height: 178,
    pos: 'Extremo Derecho', num: 7,
    photo: 'fotos/saka.png',
    bio: 'El mejor jugador del Arsenal y uno de los mejores del mundo. Capitán inglés con una técnica sublime, velocidad devastadora y un remate preciso. Líder goleador con 6 tantos en la PL esta temporada.',
    goals: 11, assists: 6, matches: 27, minutes: 2340, yellow: 1, value: '€180M'
  },
  9: {
    name: 'Gabriel Jesus', nat: '🇧🇷 Brasil', age: 28, height: 175,
    pos: 'Delantero Centro', num: 9,
    photo: 'fotos/gabrielj.png',
    bio: 'Delantero brasileño con gran movilidad y trabajo defensivo. Regresó de una dura lesión para aportar sus goles y sacrificio al equipo. Su pressing alto es fundamental en el sistema de Arteta.',
    goals: 2, assists: 2, matches: 20, minutes: 1260, yellow: 1, value: '€20M'
  },
  10: {
    name: 'Eberechi Eze', nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', age: 27, height: 178,
    pos: 'Extremo / Mediapunta', num: 10,
    photo: 'fotos/eze.png',
    bio: 'Fichaje estrella del verano 2025 proveniente del Crystal Palace. Tomó la mítica camiseta número 10. Zurdo con un regate desequilibrante y un disparo potentísimo. Ya lleva 6 goles en la PL.',
    goals: 9, assists: 4, matches: 29, minutes: 2340, yellow: 2, value: '€80M'
  },
  11: {
    name: 'Gabriel Martinelli', nat: '🇧🇷 Brasil', age: 24, height: 180,
    pos: 'Extremo Izquierdo', num: 11,
    photo: 'fotos/martinelli.png',
    bio: 'Explosivo extremo brasileño con una velocidad brutal. Junto a Saka y Gyökeres forma el trío ofensivo más temido de la Premier League. Tiene una energía inagotable y un gran olfato goleador.',
    goals: 8, assists: 5, matches: 29, minutes: 2160, yellow: 2, value: '€80M'
  },
  14: {
    name: 'Viktor Gyökeres', nat: '🇸🇪 Suecia', age: 27, height: 187,
    pos: 'Delantero Centro', num: 14,
    photo: 'fotos/gyokeres.png',
    bio: 'El goleador que Arsenal necesitaba. Llegó del Sporting CP con el mítico dorsal 14 de Thierry Henry. Lleva 11 goles en la PL y es el máximo goleador del equipo. Potente, rápido y letal en el área.',
    goals: 22, assists: 5, matches: 29, minutes: 2430, yellow: 3, value: '€100M'
  },
  19: {
    name: 'Leandro Trossard', nat: '🇧🇪 Bélgica', age: 30, height: 172,
    pos: 'Extremo / Delantero', num: 19,
    photo: 'fotos/trossard.png',
    bio: 'El hombre para todo de Arteta. Puede jugar en cualquier posición ofensiva con la misma calidad. Tiene 5 goles en la PL y su experiencia y polivalencia lo hacen imprescindible para la rotación.',
    goals: 7, assists: 6, matches: 28, minutes: 1980, yellow: 1, value: '€35M'
  },
  20: {
    name: 'Noni Madueke', nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', age: 23, height: 182,
    pos: 'Extremo Derecho', num: 20,
    photo: 'fotos/madueke.png',
    bio: 'Llegado del Chelsea en el verano 2025, el joven extremo inglés aporta velocidad, regate y gol desde la derecha. Su llegada añade profundidad y competencia en la posición de Saka.',
    goals: 4, assists: 3, matches: 25, minutes: 1620, yellow: 2, value: '€50M'
  },
};

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


// ── MODAL DE JUGADOR ──────────────────────────
const playerModal      = document.getElementById('playerModal');
const playerModalClose = document.getElementById('playerModalClose');

const POS_COLORS = {
  'Portero':                    'gk',
  'Defensor Central':           'def',
  'Defensor / Lateral derecho': 'def',
  'Defensor / Lateral':         'def',
  'Lateral Izquierdo / Mediocampista': 'def',
  'Mediocampista Central':      'mid',
  'Mediocampista Defensivo':    'mid',
  'Mediocampista':              'mid',
  'Mediocampista / Delantero':  'mid',
  'Extremo Derecho':            'fwd',
  'Extremo Izquierdo':          'fwd',
  'Extremo / Mediapunta':       'fwd',
  'Extremo / Delantero':        'fwd',
  'Delantero Centro':           'fwd',
};

function openPlayerModal(num) {
  const p = PLAYERS[num];
  if (!p) return;

  document.getElementById('pmName').textContent    = p.name;
  document.getElementById('pmNat').textContent     = p.nat;
  document.getElementById('pmAge').textContent     = p.age;
  document.getElementById('pmHeight').textContent  = p.height;
  document.getElementById('pmBio').textContent     = p.bio;
  document.getElementById('pmNumBg').textContent   = p.num;
  document.getElementById('pmGoals').textContent   = p.goals;
  document.getElementById('pmAssists').textContent = p.assists;
  document.getElementById('pmMatches').textContent = p.matches;
  document.getElementById('pmMinutes').textContent = p.minutes.toLocaleString('es-AR');
  document.getElementById('pmYellow').textContent  = p.yellow;
  document.getElementById('pmValue').textContent   = p.value;

  const posEl = document.getElementById('pmPos');
  posEl.textContent = p.pos;
  posEl.className   = `pm-pos-badge player-pos ${POS_COLORS[p.pos] || 'mid'}`;

  const photo = document.getElementById('pmPhoto');
  photo.src = p.photo;
  photo.alt = p.name;
  photo.onerror = () => {
    // Fallback si la foto no carga
    photo.style.display = 'none';
    document.querySelector('.pm-photo-wrap').style.background = 'var(--surface2)';
  };

  playerModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePlayerModal() {
  playerModal.classList.remove('show');
  document.body.style.overflow = '';
}

// Click en tarjeta de jugador
document.querySelectorAll('.player-card').forEach(card => {
  card.addEventListener('click', () => {
    const num = parseInt(card.querySelector('.player-num').textContent);
    openPlayerModal(num);
  });
});

// Cerrar modal
playerModalClose.addEventListener('click', closePlayerModal);
playerModal.addEventListener('click', e => {
  if (e.target === playerModal) closePlayerModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePlayerModal();
});
// ── PRÓXIMOS PARTIDOS ─────────────────────────
const FIXTURES = [
  // ABRIL
  { date: '25 Abr', time: '15:00', comp: 'PL',  home: 'Arsenal',         away: 'Newcastle United', local: true  },
  { date: '29 Abr', time: '21:00', comp: 'UCL', home: 'Atlético Madrid', away: 'Arsenal',          local: false, note: 'SF - Ida' },
  // MAYO
  { date: '02 May', time: '15:00', comp: 'PL',  home: 'Arsenal',         away: 'Fulham',           local: true  },
  { date: '05 May', time: '21:00', comp: 'UCL', home: 'Arsenal',         away: 'Atlético Madrid',  local: true,  note: 'SF - Vuelta' },
  { date: '09 May', time: '15:00', comp: 'PL',  home: 'West Ham United', away: 'Arsenal',          local: false },
  { date: '17 May', time: '16:00', comp: 'PL',  home: 'Arsenal',         away: 'Burnley',          local: true,  note: 'Último partido en Emirates' },
  { date: '24 May', time: '16:00', comp: 'PL',  home: 'Crystal Palace',  away: 'Arsenal',          local: false, note: 'Último partido de liga' },
  { date: '30 May', time: '18:00', comp: 'UCL', home: '—',               away: '—',                note: 'Final UCL — Budapest 🏆', final: true },
];

const fixturesList = document.getElementById('fixturesList');

function renderFixtures(data) {
  fixturesList.innerHTML = '';
  let firstShown = false;

  data.forEach(f => {
    const isArsenal = f.home === 'Arsenal' || f.away === 'Arsenal';
    const comp = COMP_LABELS[f.comp] || { label: f.comp, class: 'epl' };

    const item = document.createElement('div');
    item.classList.add('fixture-item');
    item.dataset.comp = f.comp;

    // Marcar el próximo partido
    if (!firstShown && !f.final) {
      item.classList.add('next');
      firstShown = true;
    }

    const homeClass = f.home === 'Arsenal' ? 'fixture-team arsenal-team' : 'fixture-team';
    const awayClass = f.away === 'Arsenal' ? 'fixture-team right arsenal-team' : 'fixture-team right';

    const [day, month] = f.date.split(' ');

    item.innerHTML = `
      <div class="fixture-date">
        <span class="fixture-date-day">${day}</span>
        <span class="fixture-date-month">${month}</span>
        <span class="fixture-date-time">${f.time}</span>
      </div>
      <span class="result-comp ${comp.class}">${comp.label}</span>
      <span class="${homeClass}">${f.home}</span>
      <span class="fixture-vs">VS</span>
      <span class="${awayClass}">${f.away}</span>
      <div class="fixture-meta">
        ${item.classList.contains('next') ? '<span class="fixture-next-tag">⚡ Próximo</span>' : ''}
        ${f.note ? `<span class="result-date">${f.note}</span>` : ''}
        ${f.local !== undefined ? `<span class="result-date">${f.local ? '🏠 Local' : '✈️ Visita'}</span>` : ''}
      </div>
    `;

    fixturesList.appendChild(item);
  });
}

renderFixtures(FIXTURES);

// Filtros para próximos partidos
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.results-controls');
    parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const comp = btn.dataset.comp;
    const isFixtureSection = fixturesList && parent.nextElementSibling?.id === 'fixturesList';

    if (isFixtureSection) {
      const filtered = comp === 'all' ? FIXTURES : FIXTURES.filter(f => f.comp === comp);
      renderFixtures(filtered);
    } else {
      document.querySelectorAll('.result-item').forEach(item => {
        item.style.display = comp === 'all' || item.dataset.comp === comp ? '' : 'none';
      });
    }
  });
});