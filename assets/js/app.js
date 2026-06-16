const NASA_API_KEY = "DEMO_KEY";
const APOD_URL = "https://api.nasa.gov/planetary/apod";
const LAUNCHES_URL = "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10";
const PLANETS_URL = "https://solar-system-opendata-proxy.vercel.app/api/planets";
const LAUNCH_PLACEHOLDER = "assets/images/launch-placeholder.png";
const APOD_PLACEHOLDER = "assets/images/placeholder.webp";

const fallbackLaunches = [
  {
    name: "Falcon 9 Block 5 | Starlink Group 17-54",
    net: "2026-06-15T14:38:00Z",
    status: { abbrev: "Go" },
    image: null,
    mission: { description: "A batch of satellites for the Starlink mega-constellation, SpaceX's project for space-based Internet communication." },
    launch_service_provider: { name: "SpaceX" },
    rocket: { configuration: { name: "Falcon 9" } },
    pad: { name: "Vandenberg SFB, CA, USA", country: { name: "United States of America" } },
    url: "https://thespacedevs.com/"
  },
  {
    name: "Long March 3B/E | Unknown Payload",
    net: "2026-06-16T09:45:00Z",
    status: { abbrev: "Go" },
    image: null,
    mission: { description: "Upcoming orbital launch tracked by The Space Devs Launch Library." },
    launch_service_provider: { name: "China Aerospace Science and Technology Corporation" },
    rocket: { configuration: { name: "Long March 3B/E" } },
    pad: { name: "Xichang Satellite Launch Center, China", country: { name: "China" } },
    url: "https://thespacedevs.com/"
  }
];

const planetDescriptions = {
  mercury: "Mercury is the closest planet to the Sun and the smallest planet in the Solar System. Its cratered surface experiences extreme temperature changes.",
  venus: "Venus is similar in size to Earth but wrapped in a thick, toxic atmosphere. It is the hottest planet because heat is trapped under dense clouds.",
  earth: "Earth is the only known world with liquid oceans and abundant life. Its atmosphere, magnetic field, and active geology make it uniquely habitable.",
  mars: "Mars is a cold desert world with iron-rich soil, giant volcanoes, polar ice caps, and evidence that liquid water once shaped its surface.",
  jupiter: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass greater than all the other planets combined.",
  saturn: "Saturn is a gas giant famous for its bright ring system. It has many moons and a low average density compared with the other planets.",
  uranus: "Uranus is an ice giant that rotates on its side, giving it extreme seasons. Its blue-green color comes from methane in the atmosphere.",
  neptune: "Neptune is the farthest major planet from the Sun. This ice giant has supersonic winds, dark storms, and a deep blue atmosphere."
};

const planetColors = {
  mercury: "linear-gradient(135deg, #d7dce2, #7b8490 55%, #535b66)",
  venus: "linear-gradient(135deg, #75f0dc, #2fb99f 52%, #237f76)",
  earth: "linear-gradient(135deg, #3abf61, #2a8cff 45%, #075f78)",
  mars: "linear-gradient(135deg, #ffba39, #ff5138 55%, #9e171f)",
  jupiter: "repeating-linear-gradient(170deg, #f8c66a 0 16px, #22a5ac 17px 31px, #d9973e 32px 45px, #ffe1a2 46px 58px)",
  saturn: "linear-gradient(135deg, #ffe36d, #c68f31 55%, #65441b)",
  uranus: "linear-gradient(135deg, #6cc6ff, #4075df 55%, #1e3d83)",
  neptune: "linear-gradient(135deg, #d9c2ff, #8450be 55%, #462064)"
};

const planetImages = {
  mercury: "assets/images/mercury.png",
  venus: "assets/images/venus.png",
  earth: "assets/images/earth.png",
  mars: "assets/images/mars.png",
  jupiter: "assets/images/jupiter.png",
  saturn: "assets/images/saturn.png",
  uranus: "assets/images/uranus.png",
  neptune: "assets/images/neptune.png"
};

const fallbackPlanets = [
  { id: "uranus", englishName: "Uranus", semimajorAxis: 2872500000, meanRadius: 25362, mass: { massValue: 8.681, massExponent: 25 }, density: 1.27, sideralOrbit: 30687, sideralRotation: -17.24, moons: Array(29), gravity: 8.69, discoveredBy: "William Herschel", discoveryDate: "13/03/1781", bodyType: "Planet", vol: { volValue: 6.833, volExponent: 13 }, perihelion: 2734998229, aphelion: 3006318143, eccentricity: .04717, inclination: .772, axialTilt: 97.77, avgTemp: 76, escape: 21.3 },
  { id: "neptune", englishName: "Neptune", semimajorAxis: 4495100000, meanRadius: 24622, mass: { massValue: 1.02413, massExponent: 26 }, density: 1.638, sideralOrbit: 60190, sideralRotation: 16.11, moons: Array(16), gravity: 11.15, discoveredBy: "Urbain Le Verrier, John Couch Adams, Johann Galle", discoveryDate: "23/09/1846", bodyType: "Planet", vol: { volValue: 6.254, volExponent: 13 }, perihelion: 4459753056, aphelion: 4537039826, eccentricity: .00859, inclination: 1.77, axialTilt: 28.32, avgTemp: 55, escape: 23.5 },
  { id: "jupiter", englishName: "Jupiter", semimajorAxis: 778340821, meanRadius: 69911, mass: { massValue: 1.89819, massExponent: 27 }, density: 1.3262, sideralOrbit: 4332.59, sideralRotation: 9.93, moons: Array(101), gravity: 24.79, discoveredBy: "", discoveryDate: "", bodyType: "Planet", vol: { volValue: 1.43128, volExponent: 15 }, perihelion: 740379835, aphelion: 816620000, eccentricity: .0489, inclination: 1.305, axialTilt: 3.12, avgTemp: 165, escape: 60.2 },
  { id: "mars", englishName: "Mars", semimajorAxis: 227943824, meanRadius: 3389.5, mass: { massValue: 6.4171, massExponent: 23 }, density: 3.9341, sideralOrbit: 686.98, sideralRotation: 24.62, moons: Array(2), gravity: 3.71, discoveredBy: "", discoveryDate: "", bodyType: "Planet", vol: { volValue: 1.6318, volExponent: 11 }, perihelion: 206700000, aphelion: 249200000, eccentricity: .0935, inclination: 1.85, axialTilt: 25.19, avgTemp: 210, escape: 5.03 },
  { id: "mercure", englishName: "Mercury", semimajorAxis: 57909227, meanRadius: 2439.4, mass: { massValue: 3.30114, massExponent: 23 }, density: 5.4291, sideralOrbit: 87.97, sideralRotation: 1407.6, moons: null, gravity: 3.7, discoveredBy: "", discoveryDate: "", bodyType: "Planet", vol: { volValue: 6.083, volExponent: 10 }, perihelion: 46001200, aphelion: 69816900, eccentricity: .2056, inclination: 7, axialTilt: .03, avgTemp: 440, escape: 4.25 },
  { id: "saturn", englishName: "Saturn", semimajorAxis: 1426666422, meanRadius: 58232, mass: { massValue: 5.6834, massExponent: 26 }, density: .6871, sideralOrbit: 10759.22, sideralRotation: 10.66, moons: Array(285), gravity: 10.44, discoveredBy: "", discoveryDate: "", bodyType: "Planet", vol: { volValue: 8.2713, volExponent: 14 }, perihelion: 1349823615, aphelion: 1503509229, eccentricity: .0565, inclination: 2.485, axialTilt: 26.73, avgTemp: 134, escape: 36.09 },
  { id: "terre", englishName: "Earth", semimajorAxis: 149598262, meanRadius: 6371, mass: { massValue: 5.97237, massExponent: 24 }, density: 5.5136, sideralOrbit: 365.26, sideralRotation: 23.93, moons: Array(1), gravity: 9.81, discoveredBy: "", discoveryDate: "", bodyType: "Planet", vol: { volValue: 1.08321, volExponent: 12 }, perihelion: 147095000, aphelion: 152100000, eccentricity: .0167, inclination: 0, axialTilt: 23.44, avgTemp: 288, escape: 11.19 },
  { id: "venus", englishName: "Venus", semimajorAxis: 108208475, meanRadius: 6051.8, mass: { massValue: 4.86747, massExponent: 24 }, density: 5.243, sideralOrbit: 224.7, sideralRotation: -5832.5, moons: null, gravity: 8.87, discoveredBy: "", discoveryDate: "", bodyType: "Planet", vol: { volValue: 9.2843, volExponent: 11 }, perihelion: 107477000, aphelion: 108939000, eccentricity: .0067, inclination: 3.39, axialTilt: 177.36, avgTemp: 737, escape: 10.36 }
];

const state = {
  launches: [],
  planets: [],
  selectedPlanet: "jupiter"
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupApodForm();
  loadApod(todayString());
  loadLaunches();
  loadPlanets();
});

function setupNavigation() {
  $$(".nav-link").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      $$(".nav-link").forEach((item) => item.classList.toggle("active", item === button));
      $$(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `${view}-view`));
      history.replaceState(null, "", `#${view}`);
    });
  });

  const initial = location.hash.replace("#", "");
  const matching = initial && $(`.nav-link[data-view="${initial}"]`);
  if (matching) matching.click();

  window.addEventListener("hashchange", () => {
    const view = location.hash.replace("#", "");
    const button = view && $(`.nav-link[data-view="${view}"]`);
    if (button) button.click();
  });
}

function setupApodForm() {
  const input = $("#apod-date");
  input.max = todayString();
  input.value = todayString();

  $("#apod-form").addEventListener("submit", (event) => {
    event.preventDefault();
    loadApod(input.value || todayString());
  });

  $("#today-button").addEventListener("click", () => {
    input.value = todayString();
    loadApod(input.value);
  });
}

async function loadApod(date) {
  const media = $("#apod-media");
  const summary = $("#apod-summary");
  media.innerHTML = `<div class="loader">Loading cosmic image...</div>`;
  summary.innerHTML = `<h3>Loading...</h3><p class="muted">Preparing today's space story.</p>`;
  $("#apod-detail-date").textContent = "Loading...";

  try {
    const apod = await fetchJson(`${APOD_URL}?api_key=${NASA_API_KEY}&date=${date}`);
    renderApod(apod);
  } catch (error) {
    renderApodFallback(date);
    notify("NASA APOD is unavailable right now, so the page is showing a friendly fallback.");
  }
}

function renderApod(apod) {
  $("#apod-detail-date").textContent = formatDate(apod.date);
  $("#apod-detail-type").textContent = titleCase(apod.media_type || "image");
  $("#apod-summary").innerHTML = `
    <h3>${escapeHtml(apod.title || "Astronomy Picture of the Day")}</h3>
    <p>${escapeHtml(apod.explanation || "No description is available for this image.")}</p>
  `;

  if (apod.media_type === "video") {
    $("#apod-media").innerHTML = `<iframe title="${escapeHtml(apod.title)}" src="${apod.url}" allowfullscreen></iframe>`;
  } else {
    $("#apod-media").innerHTML = `<img src="${apod.hdurl || apod.url}" alt="${escapeHtml(apod.title || "NASA astronomy picture")}">`;
  }
}

function renderApodFallback(date) {
  $("#apod-detail-date").textContent = formatDate(date);
  $("#apod-detail-type").textContent = "Image";
  $("#apod-summary").innerHTML = `
    <h3>Space is taking a moment</h3>
    <p>NASA APOD did not respond, but the dashboard is still ready. Try another date or reload later.</p>
  `;
  $("#apod-media").innerHTML = `
    <div class="apod-fallback">
      <img src="${APOD_PLACEHOLDER}" alt="Space placeholder">
      <p>Failed to load today's image</p>
      <small>Please try again later</small>
    </div>
  `;
}

async function loadLaunches() {
  try {
    const data = await fetchJson(LAUNCHES_URL);
    state.launches = (data.results || []).slice(0, 10);
  } catch (error) {
    state.launches = fallbackLaunches;
    notify("Launch data is using fallback samples because The Space Devs API did not respond.");
  }

  $("#launch-count").textContent = state.launches.length;
  renderLaunches();
}

function renderLaunches() {
  const [featured, ...rest] = state.launches;
  renderFeaturedLaunch(featured || fallbackLaunches[0]);
  const cards = (rest.length ? rest : fallbackLaunches).slice(0, 9).map(renderLaunchCard).join("");
  $("#launch-grid").innerHTML = cards;
}

function renderFeaturedLaunch(launch) {
  $("#featured-launch").innerHTML = `
    <div>
      <span class="badge">★ Featured Launch</span>
      <h2 class="launch-title">${escapeHtml(launch.name)}</h2>
      <div class="meta-line">
        <span>🏢 ${escapeHtml(providerName(launch))}</span>
        <span>🚀 ${escapeHtml(rocketName(launch))}</span>
      </div>
      <div class="feature-facts">
        <div class="fact"><small>📅 Launch Date</small><strong>${formatDate(launch.net)}</strong></div>
        <div class="fact"><small>🕓 Launch Time</small><strong>${formatTime(launch.net)}</strong></div>
        <div class="fact"><small>📍 Location</small><strong>${escapeHtml(padName(launch))}</strong></div>
        <div class="fact"><small>🌐 Country</small><strong>${escapeHtml(countryName(launch))}</strong></div>
      </div>
      <p class="launch-summary">${escapeHtml(missionDescription(launch))}</p>
      <div class="feature-actions">
        <a class="primary" href="${launch.url || "https://thespacedevs.com/"}" target="_blank" rel="noreferrer">ℹ️ View Full Details</a>
        <button class="icon-btn" type="button" aria-label="Favorite launch">♡</button>
        <button class="icon-btn" type="button" aria-label="Set launch reminder">🔔</button>
      </div>
    </div>
    <div class="launch-image">${launchImage(launch)}</div>
  `;
}

function renderLaunchCard(launch) {
  return `
    <article class="launch-card">
      <div class="launch-thumb">
        ${launchImage(launch)}
        <span class="status-chip">${escapeHtml(launch.status?.abbrev || "TBC")}</span>
      </div>
      <div class="launch-card-body">
        <h3>${escapeHtml(launch.name)}</h3>
        <ul>
          <li>🏢 ${escapeHtml(providerName(launch))}</li>
          <li>📅 ${formatDate(launch.net)}</li>
          <li>🕓 ${formatTime(launch.net)}</li>
          <li>🚀 ${escapeHtml(rocketName(launch))}</li>
          <li>📍 ${escapeHtml(padName(launch))}</li>
        </ul>
        <div class="card-actions">
          <button class="secondary" type="button" onclick="window.open('${launch.url || "https://thespacedevs.com/"}', '_blank')">Details</button>
          <button class="icon-btn" type="button" aria-label="Favorite launch">♡</button>
        </div>
      </div>
    </article>
  `;
}

async function loadPlanets() {
  try {
    const data = await fetchJson(PLANETS_URL);
    state.planets = normalizePlanets(data.bodies || []);
  } catch (error) {
    state.planets = normalizePlanets(fallbackPlanets);
    notify("Planet data is using built-in fallback values because the Solar System API did not respond.");
  }

  $("#planet-count").textContent = state.planets.length;
  renderPlanetTabs();
  renderPlanetTable();
  selectPlanet(state.selectedPlanet);
}

function normalizePlanets(planets) {
  const order = ["uranus", "neptune", "jupiter", "mars", "mercury", "saturn", "earth", "venus"];
  return planets
    .map((planet) => ({
      ...planet,
      key: planetKey(planet),
      moonsCount: Array.isArray(planet.moons) ? planet.moons.length : 0
    }))
    .filter((planet) => order.includes(planet.key))
    .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
}

function renderPlanetTabs() {
  $("#planet-tabs").innerHTML = state.planets.map((planet) => `
    <button class="planet-tab" type="button" data-planet="${planet.key}">
      <img class="planet-art" src="${planetImage(planet)}" alt="${planet.englishName}">
      <strong>${planet.englishName}</strong>
      <small>${toAu(planet.semimajorAxis)} AU</small>
    </button>
  `).join("");

  $$(".planet-tab").forEach((button) => {
    button.addEventListener("click", () => selectPlanet(button.dataset.planet));
  });
}

function selectPlanet(key) {
  const planet = state.planets.find((item) => item.key === key) || state.planets[0];
  if (!planet) return;
  state.selectedPlanet = planet.key;
  $$(".planet-tab").forEach((button) => button.classList.toggle("active", button.dataset.planet === planet.key));
  renderPlanetDetails(planet);
}

function renderPlanetDetails(planet) {
  const type = planetType(planet);
  $("#planet-main").innerHTML = `
    <div class="planet-hero">
      <img class="planet-art" src="${planetImage(planet)}" alt="${planet.englishName}">
      <div>
        <h2>${planet.englishName}</h2>
        <p>${planetDescriptions[planet.key]}</p>
      </div>
    </div>
    <div class="stat-grid">
      ${stat("🪐 Semimajor Axis", `${formatCompactKm(planet.semimajorAxis)} km`)}
      ${stat("⚪ Mean Radius", `${number(planet.meanRadius)} km`)}
      ${stat("⚖️ Mass", formatMass(planet.mass))}
      ${stat("↔ Density", `${number(planet.density)} g/cm³`)}
      ${stat("↻ Orbital Period", `${number(planet.sideralOrbit)} days`)}
      ${stat("⟳ Rotation Period", `${number(Math.abs(planet.sideralRotation))} hours`)}
      ${stat("☾ Moons", planet.moonsCount)}
      ${stat("↕ Gravity", `${number(planet.gravity)} m/s²`)}
    </div>
  `;

  $("#discovery-card").innerHTML = `
    <h3>🔭 Discovery Info</h3>
    <dl>
      <div><dt>Discovered By</dt><dd>${escapeHtml(planet.discoveredBy || "Known since antiquity")}</dd></div>
      <div><dt>Discovery Date</dt><dd>${escapeHtml(planet.discoveryDate || "Ancient times")}</dd></div>
      <div><dt>Body Type</dt><dd>${escapeHtml(planet.bodyType || "Planet")}</dd></div>
      <div><dt>Volume</dt><dd>${formatVolume(planet.vol)}</dd></div>
    </dl>
  `;

  $("#quick-facts").innerHTML = `
    <h3>💡 Quick Facts</h3>
    <ul class="quick-list">
      <li>Mass: ${formatMass(planet.mass)}</li>
      <li>Surface gravity: ${number(planet.gravity)} m/s²</li>
      <li>Density: ${number(planet.density)} g/cm³</li>
      <li>Axial tilt: ${number(planet.axialTilt)}°</li>
    </ul>
  `;

  $("#orbit-card").innerHTML = `
    <h3>🛰️ Orbital Characteristics</h3>
    <dl>
      <div><dt>Perihelion</dt><dd>${formatCompactKm(planet.perihelion)} km</dd></div>
      <div><dt>Aphelion</dt><dd>${formatCompactKm(planet.aphelion)} km</dd></div>
      <div><dt>Eccentricity</dt><dd>${number(planet.eccentricity, 5)}</dd></div>
      <div><dt>Inclination</dt><dd>${number(planet.inclination)}°</dd></div>
      <div><dt>Axial Tilt</dt><dd>${number(planet.axialTilt)}°</dd></div>
      <div><dt>Avg Temperature</dt><dd>${kelvinToCelsius(planet.avgTemp)}°C</dd></div>
      <div><dt>Escape Velocity</dt><dd>${number(planet.escape)} km/s</dd></div>
    </dl>
  `;

  $("#learn-link").href = `https://solarsystem.nasa.gov/planets/${planet.key}/overview/`;
  $("#learn-link").setAttribute("aria-label", `Learn more about ${planet.englishName}`);
}

function renderPlanetTable() {
  $("#planet-table").innerHTML = state.planets.map((planet) => {
    const type = planetType(planet);
    return `
      <tr>
        <td><img class="dot" src="${planetImage(planet)}" alt="">${planet.englishName}</td>
        <td>${toAu(planet.semimajorAxis)}</td>
        <td>${number(planet.meanRadius * 2, 0)}</td>
        <td>${earthMass(planet.mass)}</td>
        <td>${orbitText(planet.sideralOrbit)}</td>
        <td>${planet.moonsCount}</td>
        <td><span class="type-pill ${type.css}">${type.label}</span></td>
      </tr>
    `;
  }).join("");
}

function stat(label, value) {
  return `<div class="fact"><small>${label}</small><strong>${value}</strong></div>`;
}

function fetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateLike) {
  if (!dateLike) return "TBC";
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date(dateLike));
}

function formatTime(dateLike) {
  if (!dateLike) return "TBC";
  return `${new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC" }).format(new Date(dateLike))} UTC`;
}

function providerName(launch) {
  return launch.launch_service_provider?.name || "Unknown provider";
}

function rocketName(launch) {
  return launch.rocket?.configuration?.full_name || launch.rocket?.configuration?.name || "Unknown rocket";
}

function padName(launch) {
  return launch.pad?.name || "Unknown pad";
}

function countryName(launch) {
  return launch.pad?.country?.name || launch.pad?.location?.country_code || "Unknown country";
}

function missionDescription(launch) {
  return launch.mission?.description || "Mission description is not available yet.";
}

function rocketArt() {
  return `<img class="rocket-art" src="${LAUNCH_PLACEHOLDER}" alt="Rocket launch placeholder">`;
}

function launchImage(launch) {
  const src = launch.image || LAUNCH_PLACEHOLDER;
  return `<img class="rocket-art" src="${src}" alt="${escapeHtml(launch.name || "Rocket launch")}" onerror="imageFallback(this)">`;
}

function imageFallback(image) {
  const holder = image.closest(".launch-image, .launch-thumb");
  if (!holder) return;
  const chip = holder.querySelector(".status-chip")?.outerHTML || "";
  holder.innerHTML = `${rocketArt()}${chip}`;
}

function planetImage(planet) {
  return planetImages[planet.key] || planetImages.earth;
}

function planetKey(planet) {
  const key = (planet.englishName || planet.id || "").toLowerCase();
  if (key === "mercure") return "mercury";
  if (key === "terre") return "earth";
  return key;
}

function toAu(km) {
  return number((Number(km) || 0) / 149597870.7, 2);
}

function number(value, digits = 2) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "N/A";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(numeric);
}

function formatCompactKm(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "N/A";
  if (numeric >= 1_000_000) return `${number(numeric / 1_000_000, 1)}M`;
  if (numeric >= 1_000) return `${number(numeric / 1_000, 1)}K`;
  return number(numeric, 0);
}

function formatMass(mass) {
  if (!mass) return "N/A";
  return `${number(mass.massValue, 5)} × 10^${mass.massExponent} kg`;
}

function formatVolume(volume) {
  if (!volume) return "N/A";
  return `${number(volume.volValue, 5)} × 10^${volume.volExponent} km³`;
}

function earthMass(mass) {
  if (!mass) return "N/A";
  const value = Number(mass.massValue) * Math.pow(10, Number(mass.massExponent));
  const earth = 5.97237 * Math.pow(10, 24);
  return number(value / earth, 3);
}

function orbitText(days) {
  const numeric = Number(days);
  if (!Number.isFinite(numeric)) return "N/A";
  if (numeric < 365) return `${number(numeric, 0)} days`;
  return `${number(numeric / 365.25, 1)} years`;
}

function planetType(planet) {
  if (["jupiter", "saturn"].includes(planet.key)) return { label: "Gas Giant", css: "gas" };
  if (["uranus", "neptune"].includes(planet.key)) return { label: "Ice Giant", css: "ice" };
  return { label: "Terrestrial", css: "terrestrial" };
}

function kelvinToCelsius(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "N/A";
  return number(numeric - 273.15, 0);
}

function titleCase(value) {
  return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => toast.classList.remove("show"), 4200);
}
