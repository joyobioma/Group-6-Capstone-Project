// JavaScript functionality will be added in the next phase.
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
