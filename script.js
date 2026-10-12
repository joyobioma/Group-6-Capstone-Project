// JavaScript functionality will be added in the next phase.
/* =========================================
   GROUP 6 — PLANET API
   Responsibilities: API Fetching and Errors
   ========================================= */
const searchBox = document.querySelector(".search");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const errorEl = document.querySelector("#search-error");
const searchStatus = document.querySelector("#search-status");
const card = document.querySelector(".planet-card");

const PLANET_API_URL =
  "https://planets-api.vercel.app/api/v1/planets";

let planetsData = [];

// Fetch planet data from the API
async function fetchPlanets() {
  try {
    const response = await fetch(PLANET_API_URL);

    // Handle unsuccessful HTTP responses
    if (!response.ok) {
      throw new Error(
        "Request failed: " +
        response.status + ""+
        response.statusText
      );
    }

    // Convert the response into usable JSON
    const data = await response.json();

    // Validate the returned data
    if (!Array.isArray(data)) {
      throw new Error("The API did not return a valid planet array.");
    }

    // Store the retrieved planet data
    planetsData = data;

    console.log("Planet data fetched successfully:", planetsData);

    // Make the data available to Tayo's display code
    document.dispatchEvent(
      new CustomEvent("planetsLoaded", {
        detail: planetsData
      })
    );

    return planetsData;

  } catch (error) {
    console.error("Planet API error:", error);

    // Notify other code that the request failed
    document.dispatchEvent(
      new CustomEvent("planetsLoadError", {
        detail: error.message
      })
    );

    return [];
  }
}

// Start fetching after the HTML has loaded
document.addEventListener("DOMContentLoaded", fetchPlanets);









let planets = [];
let dataLoaded = false;

async function loadPlanets() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch planet data");
    }
    planets = await response.json();
    dataLoaded = true;
    renderPlanet(
  planets.find(planet => planet.name.toLowerCase() === "earth")
  || planets[0]
);
  } catch (error) {
    showError("Unable to load planet data. Please try again later.");
  }
}

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

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    showError(`<p>Please enter a planet name.</p>`);
    return;
  }

  if (!dataLoaded) {
    showError(`<p>Planet data is not available. Please try again later.</p>`);
    return;
  }

  const match = planets.find(
    planet => planet.name.toLowerCase() === query
  );

  if (!match) {
    showError(`
  <h2>No results found!</h2>
  <p>We couldn&#39;t find any planet matching your search. Please double-check the name and try again.</p>
`);
    return;
  }
  clearError();
  renderPlanet(match);
  searchInput.value = "";
  searchStatus.hidden = true;
}


function renderPlanet(planet) {
  // Planet image
  const image = card.querySelector(".planet-image");
  image.src = planet.image;
  image.alt = planet.name;

  // Planet title and information
  card.querySelector(".planet-title h1").textContent = planet.name;
  card.querySelector(".planet-type").textContent = planet.type;
  card.querySelector(".planet-description").textContent =
    planet.description;

  // Planet details: Gravity, Mass, Period
  const details = card.querySelectorAll(".planet-details span");

  details[0].textContent = planet.gravity;
  details[1].textContent = planet.mass;
  details[2].textContent = planet.period;

  // Planet statistics: Temperature, Moons, Diameter, Distance from Sun
  const stats = card.querySelectorAll(".planet-weather .planet-stats span");

  stats[0].textContent = planet.temperature;
  stats[1].textContent = planet.moons;
  stats[2].textContent = planet.diameter;
  stats[3].textContent = planet.distanceFromSun;
}


// Clear the error as the user edits the input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  searchStatus.hidden = true;
  clearError();


  if (!query || !dataLoaded) return;
  const hasMatch = planets.some(planet =>
    planet.name.toLowerCase().includes(query)
  );

  if (!hasMatch) {
    searchStatus.textContent = "No result";
    searchStatus.hidden = false;
    handleSearch()
  }
   }
  );

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
loadPlanets();
