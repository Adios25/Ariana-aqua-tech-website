const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const homeLink = document.querySelector("[data-home-link]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");
const revealItems = document.querySelectorAll(".reveal");
const internalLinks = document.querySelectorAll('a[href^="#"]:not([data-home-link])');
const trackedActions = document.querySelectorAll("[data-track]");
const heroSection = document.querySelector(".hero");
const HEADER_HIDE_DELAY = 1500;
let headerHideTimer;

const trackAction = (action, detail = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "conversion_action",
    action,
    ...detail,
  });
};

const closeMenu = () => {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};

const isHeroActive = () => {
  if (!heroSection || !header) return false;
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  return heroBottom > header.offsetHeight + 160;
};

const shouldKeepHeaderVisible = () =>
  window.scrollY <= 10 ||
  isHeroActive() ||
  document.body.classList.contains("nav-open") ||
  header?.matches(":focus-within");

const revealHeader = () => {
  if (!header) return;
  header.classList.remove("is-hidden");
};

const scheduleHeaderHide = () => {
  if (!header) return;
  window.clearTimeout(headerHideTimer);
  headerHideTimer = window.setTimeout(() => {
    if (shouldKeepHeaderVisible()) return;
    header.classList.add("is-hidden");
  }, HEADER_HIDE_DELAY);
};

const scrollToTarget = (target, updateHash = true) => {
  if (!target) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offset = (header?.offsetHeight || 0) + 22;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });

  if (updateHash && target.id) {
    history.pushState(null, "", `#${target.id}`);
  }
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      revealHeader();
      scheduleHeaderHide();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

if (homeLink) {
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
  });
}

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    scrollToTarget(target);
  });
});

trackedActions.forEach((item) => {
  item.addEventListener("click", () => {
    trackAction(item.dataset.track, {
      label: item.textContent.trim(),
      href: item.getAttribute("href") || "",
    });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", () => {
    trackAction("form_submit", {
      requirement: contactForm.elements.requirement?.value || "",
    });
    formStatus.textContent = "Sending your enquiry...";
  });

  contactForm.addEventListener("reset", () => {
    formStatus.textContent = "";
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener(
  "scroll",
  () => {
    revealHeader();
    scheduleHeaderHide();
  },
  { passive: true }
);
window.addEventListener(
  "touchstart",
  () => {
    revealHeader();
    scheduleHeaderHide();
  },
  { passive: true }
);
window.addEventListener(
  "touchmove",
  () => {
    revealHeader();
    scheduleHeaderHide();
  },
  { passive: true }
);
window.addEventListener(
  "wheel",
  () => {
    revealHeader();
    scheduleHeaderHide();
  },
  { passive: true }
);
header?.addEventListener("mouseenter", () => {
  window.clearTimeout(headerHideTimer);
  revealHeader();
});
header?.addEventListener("mouseleave", scheduleHeaderHide);
header?.addEventListener("focusin", () => {
  window.clearTimeout(headerHideTimer);
  revealHeader();
});
header?.addEventListener("focusout", scheduleHeaderHide);
syncHeader();

if (window.location.hash) {
  window.requestAnimationFrame(() => {
    const target = document.querySelector(window.location.hash);
    scrollToTarget(target, false);
  });
}
