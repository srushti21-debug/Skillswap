// Small animations or effects
document.addEventListener("DOMContentLoaded", () => {
  console.log("SkillSwap Home Page Loaded ✅");

  const skills = document.querySelectorAll('.skill-card');
  skills.forEach(card => {
    card.addEventListener('mouseover', () => card.style.backgroundColor = '#ffe082');
    card.addEventListener('mouseout', () => card.style.backgroundColor = '#fff');
  });
});
