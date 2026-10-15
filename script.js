

const PLANET_API_URL =
  "https://anurella.github.io/json/planet.json";

let planetsData = [];


async function fetchPlanets() {
  try {
    const response = await fetch(PLANET_API_URL);

    
    if (!response.ok) {
      throw new Error(
        "Request failed: " +
        response.status + ""+
        response.statusText
      );
    }

    
    const data = await response.json();

    
    if (!Array.isArray(data)) {
      throw new Error("The API did not return a valid planet array.");
    }

    
    planetsData = data;

    console.log("Planet data fetched successfully:", planetsData);

    
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

  
/* =========================================
   PLANET SEARCH — Tolulope
   Branch: feature/planet-search
   ========================================= */

// Use the existing search elements declared earlier in script.js:
// searchInput, searchBtn, errorEl, searchStatus
// Reuse planetsData and displayPlanet() from the shared code.

function handlePlanetSearch(event) {
  event.preventDefault();

  const searchName = searchInput.value.trim().toLowerCase();

  // Clear previous search errors
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  if (searchStatus) {
    searchStatus.textContent = "";
    searchStatus.hidden = true;
  }

  // Validate the search input
  if (!searchName) {
    showSearchError("Please enter a planet name.");
    return;
  }

  // Search the data already retrieved from the API
  const selectedPlanet = planetsData.find(
    planet =>
      typeof planet.name === "string" &&
      planet.name.trim().toLowerCase() === searchName
  );

  if (selectedPlanet) {
    // Use the existing display functionality
    displayPlanet(selectedPlanet);
  } else {
    showSearchError(
      "Planet not found. Please enter a valid planet name."
    );
  }
}

// Display search error messages using the existing HTML
function showSearchError(message) {
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  if (searchStatus) {
    searchStatus.textContent = "!";
    searchStatus.hidden = false;
  }
}

// Search when the user presses Enter
const searchForm = document.querySelector(".search");

if (searchForm) {
  searchForm.addEventListener("submit", handlePlanetSearch);
}

// Search when the user clicks the Search button
if (searchBtn) {
  searchBtn.addEventListener("click", handlePlanetSearch);
}

