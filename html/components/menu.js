//  <meta name="author" content="Danil Vassilets">

// Get the base path for the project root
// This works for both local files and GitHub Pages with repository subdirectories
const getBasePath = () => {
  const currentPath = window.location.pathname;
  
  // For GitHub Pages, find where index.html would be
  // Look for common project folders to determine depth
  const pathParts = currentPath.split('/').filter(p => p);
  
  // Remove filename if present (ends with .html, .htm, etc.)
  let hasFile = false;
  if (pathParts.length > 0 && /\.(html?|php)$/i.test(pathParts[pathParts.length - 1])) {
    pathParts.pop();
    hasFile = true;
  }
  
  // Count how deep we are inside project folders (html, students, model_V, etc.)
  let projectDepth = 0;
  for (let i = pathParts.length - 1; i >= 0; i--) {
    const folder = pathParts[i];
    if (folder === 'html' || folder === 'students' || folder === 'other') {
      projectDepth = pathParts.length - i;
      break;
    } else if (folder === 'model_V' || folder === 'model_K' || 
               folder === 'model_L' || folder === 'model_MZ' || 
               folder === 'components') {
      // These are subfolders, keep looking
      continue;
    }
  }
  
  // If we found a project folder, go up that many levels
  if (projectDepth > 0) {
    return '../'.repeat(projectDepth);
  }
  
  // Otherwise, we're at root or one level down
  return hasFile ? './' : './';
};

const basePath = getBasePath();

const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.getElementById("sideMenu");
const modelImage = document.getElementById("modelImage");

const tabs = document.querySelectorAll(".menu-tab");
const sectionsMenu = document.querySelectorAll(".menu-section");

const modelItems = document.querySelectorAll("#menu-models .model-item");
const techItems = document.querySelectorAll("#menu-tech .model-item");
const aboutItems = document.querySelectorAll("#menu-about .model-item");

const allItems = [...modelItems, ...techItems, ...aboutItems];
const DEFAULT_IMG = basePath + "images/logo/preview.jpg";

// Set correct paths for all images and links on load
document.addEventListener("DOMContentLoaded", () => {
  // Fix home link
  const homeLink = document.getElementById("homeLink");
  if (homeLink) {
    homeLink.href = basePath + "index.html";
  }
  
  // Fix contact link
  const contactLink = document.getElementById("contactLink");
  if (contactLink) {
    contactLink.href = basePath + "html/contact_us.html";
  }
  
  // Fix model image default source
  if (modelImage) {
    const defaultSrc = modelImage.getAttribute("data-default");
    if (defaultSrc) {
      modelImage.src = basePath + defaultSrc;
    }
  }
  
  // Fix all data-img and data-link attributes
  document.querySelectorAll(".model-item").forEach(item => {
    const img = item.getAttribute("data-img");
    if (img && !img.startsWith("http") && !img.startsWith(basePath)) {
      item.setAttribute("data-img", basePath + img);
    }
    const link = item.getAttribute("data-link");
    if (link && !link.startsWith("http") && !link.startsWith(basePath)) {
      item.setAttribute("data-link", basePath + link);
    }
  });
});

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

