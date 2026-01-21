const roleName = document.querySelector(".role-name");
const words = [
  { text: "Backend Developer", class: "" },
  { text: "Frontend Developer", class: "" },
  { text: "Fullstack Developer", class: "fullstack" }
];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let showingFull = false;

function typeEffect() {
  const current = words[wordIndex];
  roleName.className = "role-name " + current.class;
  if (!deleting && !showingFull && charIndex === current.text.length) {
    showingFull = true;
    roleName.textContent = current.text;
    setTimeout(() => {
      showingFull = false;
      deleting = true;
      typeEffect();
    }, 1000);
    return;
  }
  if (!deleting && !showingFull) {
    roleName.textContent = current.text.slice(0, charIndex++);
  }
  if (deleting) {
    roleName.textContent = current.text.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 80);
}

typeEffect();
