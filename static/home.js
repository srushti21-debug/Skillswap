// Simple welcome popup when button is clicked
function joinNow() {
  alert("Welcome to SkillSwap! Let's start your journey 🚀");
}

// Smooth scrolling (optional beginner-friendly feature)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
