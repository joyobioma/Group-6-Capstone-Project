
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
}

function showDefaultPage() {
  clearError();
  card.classList.remove("planet-card--error");
  searchStatus.hidden = true;
}


// Clear the error as the user edits the input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  searchStatus.hidden = true;
  clearError();

  // Return to the default page when the input is empty
  if (!query) {
    showDefaultPage();
    return;
  }

  if (!dataLoaded) return;
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
