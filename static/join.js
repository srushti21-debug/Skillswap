// Form submission event
document.getElementById("joinForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent page reload

  // Collect user input values
  const name = document.getElementById("name").value;
  const teach = document.getElementById("teach").value;
  const learn = document.getElementById("learn").value;

  // Simple beginner-level confirmation message
  alert("Welcome " + name + "! 🎉\nYou can teach: " + teach + "\nYou want to learn: " + learn + "\nYour SkillSwap account has been created successfully!");

  // Optionally redirect to home
  window.location.href = "index.html";
});
