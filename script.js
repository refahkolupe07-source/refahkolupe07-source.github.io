/* =========================================================
   Refah Kolupe — Portfolio & Web Services
   ========================================================= */

// Aktifkan mode animasi hanya jika JavaScript berjalan.
document.documentElement.classList.add("js");

// Ganti nomor ini dengan nomor WhatsApp asli sebelum website dipublikasikan.
const WA_NUMBER = "6281234567890";
const WA_DEFAULT_MESSAGE = "Halo Refah, saya tertarik membuat website. Boleh diskusi?";

const header = document.getElementById("site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const menuLinks = Array.from(document.querySelectorAll("#nav-menu a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const yearTarget = document.getElementById("year");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------
   WhatsApp links
   --------------------------------------------------------- */
document.querySelectorAll("[data-wa]").forEach((link) => {
  const message = link.dataset.wa || WA_DEFAULT_MESSAGE;
  link.href = `https://wa.me/${6285298339432}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

/* ---------------------------------------------------------
   Header & active navigation
   --------------------------------------------------------- */
let scrollTicking = false;

function updateOnScroll() {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  if (!sections.length || !navLinks.length) {
    scrollTicking = false;
    return;
  }

  const marker = window.scrollY + 150;
  let currentId = sections[0].id;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= marker) {
      currentId = section.id;
    }
  });

  const isAtBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

  if (isAtBottom) {
    currentId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    const isActive = link.hash === `#${currentId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  scrollTicking = false;
}

function requestScrollUpdate() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateOnScroll);
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateOnScroll();

/* ---------------------------------------------------------
   Mobile menu
   --------------------------------------------------------- */
function setMenu(open) {
  if (!navMenu || !navToggle) return;

  navMenu.classList.toggle("is-open", open);
  navToggle.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  document.body.classList.toggle("menu-open", open);
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("is-open"));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.classList.contains("is-open")) return;
    if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
    setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !navMenu.classList.contains("is-open")) return;
    setMenu(false);
    navToggle.focus();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setMenu(false);
  });
}

/* ---------------------------------------------------------
   Fade-in saat elemen masuk viewport
   --------------------------------------------------------- */
const revealElements = Array.from(document.querySelectorAll(".reveal"));

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -55px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

/* ---------------------------------------------------------
   Tahun footer
   --------------------------------------------------------- */
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}
