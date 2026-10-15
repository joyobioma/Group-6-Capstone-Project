// API address
const PLANET_API_URL = "https://anurella.github.io/json/planet.json";

// Store the planet information
let planetsData = [];

// Fetch planet information from the API

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
      throw new Error("The API did not return a valid planet array.");
    }

    planetsData = data;

    console.log("Planet data fetched successfully:", planetsData);

    // Display Earth when the page first loads
    const earth = planetsData.find(
      planet => planet.name?.toLowerCase() === "earth"
    );

    if (earth) {
      displayPlanet(earth);
      console.log("Earth data from API:", earth);
    } else {
      displayPlanet(planetsData[0]);
    }

    // Notify other JavaScript functionality that the data is ready
    document.dispatchEvent(
      new CustomEvent("planetsLoaded", {
        detail: planetsData
      })
    );

  } catch (error) {
    console.error("Planet API error:", error);

    document.dispatchEvent(
      new CustomEvent("planetsLoadError", {
        detail: error.message
      })
    );
  }
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
    planet.gravity,
    planet.mass,
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

// Run when the HTML page has loaded
document.addEventListener("DOMContentLoaded", fetchPlanets);

// Search for a planet by name
const searchForm = document.querySelector(".search");

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = searchForm.querySelector('input[type="search"]');
    const searchName = searchInput.value.trim().toLowerCase();

    const selectedPlanet = planetsData.find(
      planet => planet.name?.toLowerCase() === searchName
    );

    if (selectedPlanet) {
      displayPlanet(selectedPlanet);
    } else {
      alert("Planet not found. Please enter a valid planet name.");
    }
  });
}