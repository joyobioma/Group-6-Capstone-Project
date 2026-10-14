

const PLANET_API_URL =
  "https://anurella.github.io/json/planet.json";

let planetsData = [];


async function fetchPlanets() {
  try {
    const response = await fetch(PLANET_API_URL);

    
    if (!response.ok) {
      throw new Error(
        "Request failed: " +
        response.status + " "+
        response.statusText
      );
    }

    
    const data = await response.json();

    
     {if (!Array.isArray(data) || data.length === 0) {
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
