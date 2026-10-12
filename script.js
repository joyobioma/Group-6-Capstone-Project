// API address
const PLANET_API_URL = "https://anurella.github.io/json/planet.json";

// Store the planet information
let planetsData = [];

// Fetch planet information from the API
async function fetchPlanets() {
  try {
    const response = await fetch(PLANET_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch planet data");
    }

    const data = await response.json();

    planetsData = data;

    console.log("Planet data fetched successfully:", planetsData);

  } catch (error) {
    console.error("Error fetching planet data:", error);
  }
}

// Run the function when the HTML page has loaded
document.addEventListener("DOMContentLoaded", fetchPlanets);