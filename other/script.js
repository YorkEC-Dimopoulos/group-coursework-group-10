// Cinematic reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const cinematicReveal = () => {
  const trigger = window.innerHeight * 0.85;
  revealEls.forEach((el) => {
    if (!el.classList.contains("active") && el.getBoundingClientRect().top < trigger) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", cinematicReveal, { passive: true });
cinematicReveal();


// Parallax 
const video = document.getElementById("heroVideo");
window.addEventListener("scroll", () => {
  if (video) video.style.transform = `translateY(${window.scrollY * 0.25}px)`;
}, { passive: true });
const scrollBtn = document.getElementById("scroll-btn");
scrollBtn?.addEventListener("click", () => {
  document.getElementById("model-1")?.scrollIntoView({ behavior: "smooth" });
});
 
const startTypewriter = (el) => {
  const text = el.getAttribute("data-text");
  if (!text) return;

  el.innerHTML = "";
  [...text].forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${i * 0.1}s`;
    el.appendChild(span);
  });
};
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const typewriterEl = entry.target.querySelector(".typewriter");
      if (typewriterEl && !typewriterEl.dataset.animated) {
        startTypewriter(typewriterEl);
        typewriterEl.dataset.animated = "true";
      }
      obs.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.3 
});

document.querySelectorAll(".team-card").forEach(card => {
  observer.observe(card);
});

const buttonLinks = {
  "Model V": "html/model_V/model_v.html",
  "Model MZ": "html/model_MZ/model_MZ.html",
  "Model MZ Specs": "html/model_MZ/model_MZ_specs.html",
  "Model L": "html/model_L/Model_L.html",
  "Model K": "html/model_K/model_k.html",
  "Charging Calculator": "html/Charging_Calculator.html",
  "Spare parts": "html/spare_parts.html",
  "Guide": "html/Guide.html",
  "Warranty": "html/warranty.html",
  "Contact Us": "html/contact_us.html",
  "About Us": "html/about_us.html",
  "FAQ": "html/faq.html",
  "Reviews": "html/reviews.html",
};

document.querySelectorAll(".glow-btn").forEach(button => {
  button.addEventListener("click", () => {
    const label = button.textContent.trim();
    if (label === "Team Lead" || label === "Team Member") return;

    const page = buttonLinks[label];
    if (page) window.location.href = page;
  });
});
