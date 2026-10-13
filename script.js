

const PLANET_API_URL =
  "https://planets-api.vercel.app/api/v1/planets";

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
}

// Start fetching after the HTML has loaded
document.addEventListener("DOMContentLoaded", fetchPlanets);
