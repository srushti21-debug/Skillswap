// Dummy skill data
const skills = [
  {
    name: "Web Development",
    teacher: "Aarav Mehta",
    rating: 4.9,
    category: "tech",
    level: "beginner",
    mode: "online"
  },
  {
    name: "Graphic Design",
    teacher: "Riya Sharma",
    rating: 4.7,
    category: "art",
    level: "intermediate",
    mode: "online"
  },
  {
    name: "Digital Marketing",
    teacher: "Isha Kapoor",
    rating: 4.5,
    category: "business",
    level: "beginner",
    mode: "offline"
  },
  {
    name: "Public Speaking",
    teacher: "Kabir Verma",
    rating: 4.8,
    category: "personal",
    level: "advanced",
    mode: "offline"
  }
];

const container = document.getElementById("skillsContainer");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const modeFilter = document.getElementById("modeFilter");

// Display skills
function displaySkills(list) {
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>No matching skills found 😔</p>";
    return;
  }

  list.forEach(skill => {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.innerHTML = `
      <h3>${skill.name}</h3>
      <p>👤 ${skill.teacher}</p>
      <p class="rating">⭐ ${skill.rating}</p>
      <button class="swap-btn">Offer Swap</button>
    `;
    card.querySelector(".swap-btn").addEventListener("click", () => {
      alert(`✅ Swap request sent to ${skill.teacher} for ${skill.name}!`);
    });
    container.appendChild(card);
  });
}

// Filter function
function filterSkills() {
  const searchText = searchBar.value.toLowerCase();
  const category = categoryFilter.value;
  const level = levelFilter.value;
  const mode = modeFilter.value;

  const filtered = skills.filter(skill => {
    return (
      (skill.name.toLowerCase().includes(searchText)) &&
      (category === "all" || skill.category === category) &&
      (level === "all" || skill.level === level) &&
      (mode === "all" || skill.mode === mode)
    );
  });
  displaySkills(filtered);
}

// Event listeners
searchBar.addEventListener("input", filterSkills);
categoryFilter.addEventListener("change", filterSkills);
levelFilter.addEventListener("change", filterSkills);
modeFilter.addEventListener("change", filterSkills);

// Initial load
displaySkills(skills);
