//  <meta name="author" content="Danil Vassilets">

const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.getElementById("sideMenu");
const modelImage = document.getElementById("modelImage");

const tabs = document.querySelectorAll(".menu-tab");
const sectionsMenu = document.querySelectorAll(".menu-section");

const modelItems = document.querySelectorAll("#menu-models .model-item");
const techItems = document.querySelectorAll("#menu-tech .model-item");
const aboutItems = document.querySelectorAll("#menu-about .model-item");

const allItems = [...modelItems, ...techItems, ...aboutItems];
const DEFAULT_IMG = "/images/logo/preview.jpg";

const setDefaultImage = () => {
  if (!modelImage) return;
  modelImage.src = DEFAULT_IMG;
  modelImage.style.opacity = "1";
  modelImage.style.transform = "scale(1.02)";
};

// Smooth zoom‑in animation for preview images
const animateModelImage = (img) => {
  img.style.transition = "none";
  img.style.opacity = "1";
  img.style.transform = "scale(1.05)";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      img.style.transition =
        "transform 7s cubic-bezier(0.52, 1, 0.36, 1), opacity 0.1s ease";
      img.style.transform = "scale(1)";
    });
  });
};

// Switches visible tab inside the side menu
const switchTab = (targetId) => {
  tabs.forEach((t) => t.classList.remove("active"));
  sectionsMenu.forEach((s) => s.classList.remove("active"));

  document.querySelector(`[data-target="${targetId}"]`)?.classList.add("active");
  document.getElementById(targetId)?.classList.add("active");

  setDefaultImage();
};

const getCurrentSection = () => {
  const modelSections = [
    ...document.querySelectorAll(".model-section"),
    document.getElementById("about-us")
  ].filter(Boolean);

  let current = null;

  modelSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
      current = section.id;
    }
  });

  if (!current) return "menu-models";
  if (current.startsWith("tech-")) return "menu-tech";
  if (current === "about-us") return "menu-about";
  return "menu-models";
};

// Open/close side menu
menuBtn?.addEventListener("click", () => {
  const opening = !sideMenu.classList.contains("open");

  menuBtn.classList.toggle("active");
  sideMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", opening);

  if (opening) {
    switchTab(getCurrentSection());
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.target));
});

// Attach events to menu items)
const attachItemEvents = (items) => {
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const img = item.getAttribute("data-img");
      if (img && modelImage) {
        modelImage.src = img;
        animateModelImage(modelImage);
      }
    });

    item.addEventListener("mouseleave", setDefaultImage);

    item.addEventListener("click", () => {
      const link = item.getAttribute("data-link");
      const targetId = item.getAttribute("data-target");

      allItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      if (link) {
        menuBtn.classList.remove("active");
        sideMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
        window.location.href = link;
        return;
      }

      if (targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }

      menuBtn.classList.remove("active");
      sideMenu.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
};

attachItemEvents(modelItems);
attachItemEvents(techItems);
attachItemEvents(aboutItems);



// Auto‑highlight menu item based on scroll position
const updateActiveOnScroll = () => {
  const modelSections = [
    ...document.querySelectorAll(".model-section"),
    document.getElementById("about-us")
  ].filter(Boolean);

  if (modelSections.length === 0) return;

  let current = null;

  modelSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
      current = section.id;
    }
  });

  if (!current) return;

  if (current !== "about-us") {
    aboutItems.forEach(item => item.classList.remove("active"));
  }

  let found = false;

  allItems.forEach((item) => {
    const isPerson = item.hasAttribute("data-highlight");
    if (isPerson) return;

    const target = item.getAttribute("data-target");
    const isMatch = target === current && !found;

    item.classList.toggle("active", isMatch);
    if (isMatch) found = true;
  });
};


window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
updateActiveOnScroll();

const gradientMap = {
  "about-person1": "flash-petros",
  "about-person5": "flash-danil",
  "about-person2": "flash-zdravko",
  "about-person4": "flash-strahinja",
  "about-person3": "flash-kosta"
};

document.querySelectorAll(".model-item").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-highlight");

    if (!targetId) return;

    allItems.forEach(i => i.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".team-card").forEach(card => {
      card.classList.remove(
        "highlighted",
        "flash-gradient",
        "flash-petros",
        "flash-danil",
        "flash-zdravko",
        "flash-strahinja",
        "flash-kosta"
      );
    });

    const card = document.querySelector(`.team-card[data-highlight="${targetId}"]`);
    if (!card) return;

    card.classList.add("highlighted");

    const gradientClass = gradientMap[targetId];
    if (gradientClass) {
      card.classList.add("flash-gradient", gradientClass);
      setTimeout(() => {
        card.classList.remove("flash-gradient", gradientClass);
      }, 1600);
    }

    card.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

setDefaultImage();

