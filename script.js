
const API_URL = "https://anurella.github.io/json/planet.json";

const searchBox = document.querySelector(".search");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const errorEl = document.querySelector("#search-error");
const searchStatus = document.querySelector("#search-status");
const card = document.querySelector(".planet-card")


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
  } catch (error) {
    showError("Unable to load planet data. Please try again later.");
  }
}

function showError(message) {
  errorEl.textContent = message;
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
    showError("Please enter a planet name.");
    return;
  }

  if (!dataLoaded) {
    showError("Planet data is not available. Please try again later.");
    return;
  }

  const match = planets.find(
    planet => planet.name.toLowerCase() === query
  );

  if (!match) {
    showError("No results found!");
    return;
  }
  clearError();
}

// Clear the error as the user edits the input
searchInput.addEventListener("input", clearError);
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
loadPlanets();
