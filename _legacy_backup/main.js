// 🌙 Theme Toggle
const modeToggle = document.getElementById("modeToggle");
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    modeToggle.textContent = isLight ? "☀️" : "🌙";
    modeToggle.setAttribute("aria-pressed", String(isLight));
  });
}

// 📱 Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("primary-navigation");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// 🖱 Smooth Scroll for Buttons
document.querySelectorAll("button[data-target], .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target =
      btn.getAttribute("data-target") ||
      (btn.id === "discoverBtn"
        ? "#projects"
        : btn.id === "servicesBtn"
        ? "#services"
        : null);
    if (target) {
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 🎬 Hero Animation (GSAP)
window.addEventListener("load", () => {
  if (typeof gsap !== "undefined") {
    gsap.from(".glass h1", {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(".tagline", { opacity: 0, y: 20, duration: 1, delay: 0.5 });
    gsap.from(".cta-row", { opacity: 0, y: 20, duration: 1, delay: 1 });
  }
});

// 💫 Card Hover Glow (GSAP)
const cards = document.querySelectorAll(".service-card, .project-card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(card, { boxShadow: "0 0 15px #facc15", duration: 0.3 });
    } else {
      card.style.boxShadow = "0 0 15px #facc15";
    }
  });
  card.addEventListener("mouseleave", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(card, { boxShadow: "0 0 0 transparent", duration: 0.3 });
    } else {
      card.style.boxShadow = "none";
    }
  });
});

// 🧭 Navbar Shadow on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  navbar.style.boxShadow =
    window.scrollY > 50 ? "0 4px 15px rgba(0,0,0,0.3)" : "none";
});

// 📬 Contact Form Handling (Netlify & Localhost)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const isNetlify = contactForm.hasAttribute("data-netlify");
    const isLocalhost =
      location.hostname === "127.0.0.1" || location.hostname === "localhost";

    if (isNetlify && isLocalhost) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const params = new URLSearchParams();
      for (const [k, v] of formData.entries()) params.append(k, v);

      fetch("/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
        .then(() => {
          window.location.href = "/#contact?sent=1";
        })
        .catch(() => alert("Unable to send message locally."));
      return;
    }

    if (isNetlify && !isLocalhost) return;

    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const action = contactForm.getAttribute("action") || "";
    if (action.includes("formspree") || action.includes("formsubmit")) {
      contactForm.submit();
      return;
    }

    const email = document.getElementById("email").value.trim();
    const subject = encodeURIComponent(
      `Contact from ${name || "Website Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  });
}

// 🪟 Modal Preview for Projects/Services
const modal = document.getElementById("previewModal");
const modalBody = document.getElementById("modalBody");
let lastFocused = null;

function openModal(html) {
  if (!modal) return;
  lastFocused = document.activeElement;
  modalBody.innerHTML = html;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalBody.innerHTML = "";
  if (lastFocused) lastFocused.focus();
}

// 🖼️ Card Click → Modal Content
document.addEventListener("click", (e) => {
  const card = e.target.closest("a.project-card, a.service-card");
  if (card && card.getAttribute("href")) {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    const url = card.getAttribute("href");

    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const content = doc.querySelector("main") || doc.querySelector("body");
        openModal(content ? content.innerHTML : "No preview available.");
      })
      .catch(() =>
        openModal(
          `<p>Unable to load preview. <a href="${url}" target="_blank">Open full page</a></p>`
        )
      );
  }

  const actionClose = e.target.closest("[data-action='close']");
  if (actionClose) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("open")) {
    closeModal();
  }
});

// 📰 Blog Cards Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  const blogCards = document.querySelectorAll(".blog-card");
  if (!blogCards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  blogCards.forEach((card) => observer.observe(card));
});

// 🚫 Prevent Modal Open on Blog Cards
document.addEventListener("click", (e) => {
  if (e.target.closest(".blog-card")) {
    return; // disable modal behavior for blogs
  }
});
