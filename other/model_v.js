//  <meta name="author" content="Danil Vassilets">

document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll(".wipe-section")];
  const hero = document.querySelector(".hero");

  const wipeCurrent = document.getElementById("wipe-current");
  const wipeNext = document.getElementById("wipe-next");

  const gallerySlides = [...document.querySelectorAll(".gallery-slide")];
  const galleryPrev = document.querySelector(".gallery-nav-prev");
  const galleryNextBtn = document.querySelector(".gallery-nav-next");
  const galleryDots = [...document.querySelectorAll(".gallery-dot")];
  
  const parallaxBlocks = [...document.querySelectorAll(".parallax")];
  const revealBlocks = [...document.querySelectorAll(".section-inner-body")];

  const BG_MAP = {
    img1: "/images/models/Model_V/wipe2.png",
    img2: "/images/models/Model_V/wipe3.png",
    img3: "/images/models/Model_V/wipe4.jpg",
    img4: "/images/models/Model_V/wipe5.png",
    img5: "/images/models/Model_V/wipe1.png",
    img6: "/images/models/Model_V/model-image3.png",
  }; 

  Object.values(BG_MAP).forEach(src => {
    const img = new Image();
    img.src = src;
  });
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const easeOutQuad = x => 1 - (1 - x) ** 2;
  const getBg = key => BG_MAP[key];
  function setInitialBackground() {
    if (!sections.length || !wipeCurrent || !wipeNext) return;
    const first = sections[0];
    const second = sections[1] || first;
    const firstBg = getBg(first.dataset.bg);
    const secondBg = getBg(second.dataset.bg);

    if (firstBg) {
      wipeCurrent.style.backgroundImage = `url('${firstBg}')`;
      wipeCurrent.dataset.src = firstBg;
    }

    if (secondBg) {
      wipeNext.style.backgroundImage = `url('${secondBg}')`;
      wipeNext.dataset.src = secondBg;
    }

    wipeNext.style.clipPath = "inset(100% 0 0 0)";
  }

  function updateWipe() {
    if (!sections.length || !hero || !wipeCurrent || !wipeNext) return;
    const heroRect = hero.getBoundingClientRect();
    const heroBottom = heroRect.bottom + window.scrollY;
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const delay = vh * 0.2;

    if (scrollY < heroBottom + delay) {
      wipeNext.style.clipPath = "inset(100% 0 0 0)";
      return;
    }

    const offsetY = scrollY - (heroBottom + delay);
    let index = clamp(Math.floor(offsetY / vh), 0, sections.length - 1);
    const current = sections[index];
    const next = sections[index + 1] || current;
    const start = index * vh;
    const pos = offsetY - start;
    const t = easeOutQuad(clamp(pos / vh, 0, 1));
    const currentSrc = getBg(current.dataset.bg);
    const nextSrc = getBg(next.dataset.bg);

    if (currentSrc && wipeCurrent.dataset.src !== currentSrc) {
      wipeCurrent.style.backgroundImage = `url('${currentSrc}')`;
      wipeCurrent.dataset.src = currentSrc;
    }

    if (nextSrc && wipeNext.dataset.src !== nextSrc) {
      wipeNext.style.backgroundImage = `url('${nextSrc}')`;
      wipeNext.dataset.src = nextSrc;
    }

    wipeNext.style.clipPath = `inset(${(1 - t) * 100}% 0 0 0)`;
  }
  let currentSlide = 0;
  function setSlide(index) {
    if (!gallerySlides.length) return;

    currentSlide = (index + gallerySlides.length) % gallerySlides.length;
    gallerySlides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === currentSlide);
    });
    galleryDots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentSlide);
    });
  }

  if (galleryPrev && galleryNextBtn) {
    galleryPrev.addEventListener("click", () => setSlide(currentSlide - 1));
    galleryNextBtn.addEventListener("click", () => setSlide(currentSlide + 1));
  }
  galleryDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index || 0);
      setSlide(index);
    });
  });

  function updateParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    parallaxBlocks.forEach(block => {
      const bg = block.querySelector(".parallax-bg");
      if (!bg) return;
      const rect = block.getBoundingClientRect();
      const blockCenter = rect.top + scrollY + rect.height / 2;
      const distance = scrollY + vh / 2 - blockCenter;
      const strength = 0.12;
      const translateY = distance * strength;
      bg.style.transform = `translateY(${translateY}px)`;
    });
  }

  function updateParallaxText() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    document.querySelectorAll(".floating-text").forEach(section => {
      const body = section.querySelector(".section-inner-body");
      if (!body) return;

      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + scrollY + rect.height / 2;
      const viewportCenter = scrollY + vh / 2;
      const distance = viewportCenter - sectionCenter;
      const strength = 0.18;
      const translateY = distance * strength;

      body.style.setProperty("--floatY", `${translateY}px`);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    revealBlocks.forEach(block => observer.observe(block));
  } else {
    revealBlocks.forEach(block => block.classList.add("is-visible"));
  }

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateWipe();
        updateParallax();
        updateParallaxText();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    setInitialBackground();
    updateWipe();
    updateParallax();
    updateParallaxText();
  });
  setInitialBackground();
  setSlide(0);
  updateWipe();
  updateParallax();
  updateParallaxText();
});
