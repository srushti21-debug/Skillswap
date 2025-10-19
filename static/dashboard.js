// Switch between dashboard sections
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");

  const sidebarItems = document.querySelectorAll(".sidebar li");
  sidebarItems.forEach(item => item.classList.remove("active"));
  event.target.classList.add("active");
}

// Optional: Greeting alert
window.addEventListener("load", () => {
  console.log("Welcome to your SkillSwap Dashboard!");
});
