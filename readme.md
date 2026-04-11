# ⚔ Arsenal FC — Hinchada Argentina

Página de fan dedicada al Arsenal FC, hecha para hinchas argentinos. Construida con **HTML · CSS · JavaScript** vanilla.


## 📁 Estructura

```
arsenal-arg/
├── index.html   ← Estructura completa
├── styles.css   ← Diseño Arsenal (rojo y blanco)
├── app.js       ← Lógica, API, filtros, scroll
└── README.md
```

##  Secciones

- **Hero** — Presentación con estadísticas de la temporada
- **Temporada 2025/26** — Estado en PL, Champions, EFL Cup y FA Cup
- **Plantilla** — Todos los jugadores con filtro por posición
- **Historia** — Timeline desde 1886 hasta la era Arteta
- **Resultados** — Últimos partidos cargados desde API externa

## Qué practiqué

- **`fetch()`** para consumir la API de football-data.org
- Manejo de errores con **`try/catch`** y datos de respaldo
- **Filtros dinámicos** de plantilla y resultados con el DOM
- **Intersection Observer** para animaciones al hacer scroll
- **Menú mobile** con hamburger y animación CSS
- Nav activo según la sección visible con scroll listener

## 🔑 API de resultados

Los resultados se obtienen de [football-data.org](https://www.football-data.org/).
Sin API key funciona con datos de respaldo. Para resultados en tiempo real:

1. Registrate gratis en football-data.org
2. Obtené tu API key
3. En `app.js` agregá el header:
```javascript
headers: { 'X-Auth-Token': 'TU_API_KEY' }
```

---

> Proyecto de práctica — 2026 · No afiliado al Arsenal FC oficial
