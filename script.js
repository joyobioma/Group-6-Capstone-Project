// JavaScript functionality will be added in the next phase.
/* =========================================
   GROUP 6 — PLANET API
   Responsibilities: API Fetching and Errors
   ========================================= */

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
