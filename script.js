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

  

// Planent Search Functionality
const PLANET_API_URL = "https://anurella.github.io/json/planet.json";

const searchBox = document.querySelector(".search");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const errorEl = document.querySelector("#search-error");
const searchStatus = document.querySelector("#search-status");
const card = document.querySelector(".planet-card");

let planets = [];
let dataLoaded = false;

// Oluwaferenami'S CODE: Fetch planet data
async function fetchPlanets() {
  try {
    const response = await fetch(PLANET_API_URL);

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The API did not return a valid planet array.");
    }

    planets = data;
    dataLoaded = true;

    console.log("Planet data fetched successfully:", planets);

    // Preserve the shared event for other project scripts
    document.dispatchEvent(
      new CustomEvent("planetsLoaded", {
        detail: planets
      })
    );

    return planets;
  } catch (error) {
    console.error("Planet API error:", error);

    planets = [];
    dataLoaded = false;

    document.dispatchEvent(
      new CustomEvent("planetsLoadError", {
        detail: error.message
      })
    );

    return [];
  }
}

// Isaiah's: Display errors
function showError(message) {
  errorEl.innerHTML = message;
  errorEl.hidden = false;

  searchBox.classList.add("search--error");
  card.classList.add("planet-card--error");
}

// Clear errors
function clearError() {
  errorEl.textContent = "";
  errorEl.hidden = true;

  searchBox.classList.remove("search--error");
  card.classList.remove("planet-card--error");
}

// Reset to the default page
function showDefaultPage() {
  clearError();
  card.classList.remove("planet-card--error");
  searchStatus.hidden = true;
}

// Preserve Oluwafernami's shared success event
document.addEventListener("planetsLoaded", (event) => {
  planets = event.detail;
  dataLoaded = true;
});

// Preserve Oluwafernami's shared error event
document.addEventListener("planetsLoadError", () => {
  planets = [];
  dataLoaded = false;

  showError(
    "Unable to load planet data. Please try again later."
  );
});

// Search for a planet
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    showError("<p>Please enter a planet name.</p>");
    return;
  }

  if (!dataLoaded) {
    showError(
      "<p>Planet data is not available. Please try again later.</p>"
    );
    return;
  }

  const match = planets.find(
    (planet) => planet.name.toLowerCase() === query
  );

  if (!match) {
    showError(`
      <h2>No results found!</h2>
      <p>We couldn't find any planet matching your search.
      Please double-check the name and try again.</p>
    `);
    return;
  }

  clearError();
}

//  Clear errors and show feedback while typing
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  searchStatus.hidden = true;
  clearError();

  // Restore the default page when the input is empty
  if (!query) {
    showDefaultPage();
    return;
  }

  if (!dataLoaded) return;

  // Check for a partial match as the user types
  const hasMatch = planets.some((planet) =>
    planet.name.toLowerCase().includes(query)
  );

  if (!hasMatch) {
    searchStatus.textContent = "No result";
    searchStatus.hidden = false;

    // Preserve your original behavior
    handleSearch();
  }
});

// Search button
searchBtn.addEventListener("click", handleSearch);

// Search using Enter
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Start the API request once
fetchPlanets();
