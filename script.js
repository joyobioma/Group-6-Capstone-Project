const PLANET_API_URL =
  "https://anurella.github.io/json/planet.json";

let planetsData = [];

// ========================================
// API FETCHING
// ========================================

async function fetchPlanets() {
  try {
    const response = await fetch(PLANET_API_URL);

    if (!response.ok) {
      throw new Error(
        "Request failed: " +
        response.status + " " +
        response.statusText
      );
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(
        "The API did not return a valid planet array."
      );
    }

    planetsData = data;

    console.log(
      "Planet data fetched successfully:",
      planetsData
    );

    document.dispatchEvent(
      new CustomEvent("planetsLoaded", {
        detail: planetsData
      })
    );

    return planetsData;

  } catch (error) {
    console.error("Planet API error:", error);

    document.dispatchEvent(
      new CustomEvent("planetsLoadError", {
        detail: error.message
      })
    );

    return [];
  }
}

function withDecimal(value) {
  if (value === null || value === undefined) return "Not available";
  return Number.isInteger(value) ? value.toFixed(1) : String(value);
}

// Display a planet's information on the page
function displayPlanet(planet) {
  // Update planet name
  const planetName = document.querySelector(".planet-card h1");

  if (planetName) {
    planetName.textContent = planet.name || "Unknown planet";
  }

  // Update planet image
  const planetImage = document.querySelector(".planet-image");

  if (planetImage) {
    planetImage.src = planet.image || "";
    planetImage.alt = planet.name || "Planet";
  }

  // Update planet type
  const planetType = document.querySelector(".planet-type");

  if (planetType) {
    planetType.textContent = planet.type || "Not available";
  }

  // Update planet description
  const planetDescription = document.querySelector(".planet-description");

  if (planetDescription) {
    planetDescription.textContent =
      planet.description || "Description not available.";
  }

  // Update gravity, mass, and orbital period
  const detailValues = document.querySelectorAll(".planet-details div span");

  const details = [
    withDecimal(planet.gravity),
    withDecimal(planet.mass),
    planet.period
  ];

  detailValues.forEach((element, index) => {
    element.textContent = details[index] ?? "Not available";
  });

  // Update temperature, moons, diameter, and distance from the Sun
  const weatherValues = document.querySelectorAll(".planet-weather .planet-stats span");

  const weather = [
    planet.temperature,
    planet.moons,
    planet.diameter,
    planet.distanceFromSun
  ];

  weatherValues.forEach((element, index) => {
    element.textContent = weather[index] ?? "Not available";
  });
}


document.addEventListener("planetsLoaded", (event) => {
  const planets = event.detail;
  const earth = planets.find(p => p.name?.toLowerCase() === "earth");
  displayPlanet(earth || planets[0]);
});

// ========================================
// SEARCH ELEMENTS
// ========================================

const searchBox = document.querySelector(".search");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const errorEl = document.querySelector("#search-error");
const searchStatus = document.querySelector("#search-status");
const card = document.querySelector(".planet-card");

let planets = [];
let dataLoaded = false;

// ========================================
// RECEIVE API EVENTS
// ========================================

document.addEventListener("planetsLoaded", (event) => {
  planets = event.detail;
  dataLoaded = true;

  clearError();
  searchStatus.hidden = true;

  console.log("Search data is ready:", planets);
});

document.addEventListener("planetsLoadError", (event) => {
  planets = [];
  dataLoaded = false;

  searchStatus.hidden = true;
  clearError(); 

  console.error("Unable to load planets:", event.detail);
});

// ========================================
// ERROR HANDLING
// ========================================

function showError(message) {
  errorEl.innerHTML = message;
  errorEl.hidden = false;

  searchBox.classList.add("search--error");
  card.classList.add("planet-card--error");
}

function clearError() {
  errorEl.textContent = "";
  errorEl.hidden = true;

  searchBox.classList.remove("search--error");
  card.classList.remove("planet-card--error");
}

function showDefaultPage() {
  clearError();
  searchStatus.hidden = true;
}

// ========================================
// SEARCH FUNCTION
// ========================================

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchStatus.hidden = true;

    showError("<p>Please enter a planet name.</p>");
    return;
  }

  if (!dataLoaded) {
    searchStatus.hidden = true;

    showError(
      "<p>Planet data is not available. Please try again later.</p>"
    );
    return;
  }

  const match = planets.find(
    (planet) =>
      typeof planet.name === "string" &&
      planet.name.toLowerCase() === query
  );

  if (!match) {
    searchStatus.hidden = true;

    showError(`
      <h2>No results found!</h2>
      <p>We couldn't find any planet matching your search.
      Please double-check the name and try again.</p>
    `);
     // Keep the search status visible

    searchStatus.textContent = "No result";
    searchStatus.hidden = false;

    return;
  }

  // A matching planet was found
  clearError();
  searchStatus.hidden = true;

  console.log("Planet found:", match);

 displayPlanet(match);
}

// ========================================
// LIVE SEARCH FEEDBACK
// ========================================


searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  // Reset when the input is empty
  if (!query) {
    showDefaultPage();
    return;
  }

  // Wait until planet data has loaded
  if (!dataLoaded) return;

  const hasMatch = planets.some(
    (planet) =>
      typeof planet.name === "string" &&
      planet.name.toLowerCase().includes(query)
  );

  if (!hasMatch) {
    // Show the status dynamically
    searchStatus.textContent = "No result";
    searchStatus.hidden = false;

    // Show the full error message dynamically
    showError(`
      <h2>No results found!</h2>
      <p>We couldn't find any planet matching your search.
      Please double-check the name and try again.</p>
    `);
  } else {
    // Clear both messages when the input matches a planet
    searchStatus.hidden = true;
    clearError();
  }
});

// ========================================
// SEARCH BUTTON AND ENTER KEY
// ========================================

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});

// ========================================
// START API REQUEST ONCE
// ========================================

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    fetchPlanets,
    { once: true }
  );
} else {
  fetchPlanets();
}

// Dark Theme Functionality
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeIcon = document.querySelector("#theme-icon");
const themeLogo = document.querySelector("#theme-logo");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeLabel.textContent = "LIGHT";
  themeIcon.src = "svg/Theme Icon.svg";
  themeLogo.src = "svg/logo.svg";
}
themeToggle.addEventListener("click", function(){
document.body.classList.toggle("dark-mode");

if (document.body.classList.contains("dark-mode")){
  themeLabel.textContent = "LIGHT";
  themeIcon.src = "svg/Theme Icon.svg";
  themeLogo.src = "svg/logo.svg";
  localStorage.setItem("theme", "dark");
} else{
  themeLabel.textContent = "DARK";
  themeIcon.src = "svg/Theme Icon (1).svg";
  themeLogo.src = "svg/logo_black.svg";
  localStorage.setItem("theme", "light");
}
});
