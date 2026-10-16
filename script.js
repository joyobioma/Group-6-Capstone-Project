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

