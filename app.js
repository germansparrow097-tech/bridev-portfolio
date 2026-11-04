"use strict";
document.documentElement.classList.add("js");
const $ = (selector) => document.querySelector(selector);
let motionPaused = matchMedia("(prefers-reduced-motion: reduce)").matches;
function setMotion(paused) {
  motionPaused = paused;
  document.documentElement.classList.toggle("motion-paused", paused);
  $("#motion-toggle").textContent = paused ? "Resume motion" : "Pause motion";
  $("#motion-toggle").setAttribute("aria-pressed", String(paused));
  window.dispatchEvent(
    new CustomEvent("portfolio-motion", { detail: { paused } }),
  );
}
setMotion(motionPaused);
$("#motion-toggle").addEventListener("click", () => setMotion(!motionPaused));
matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) =>
  setMotion(e.matches),
);
const reveal = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        reveal.unobserve(entry.target);
      }
    }),
  { threshold: 0.07 },
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
const toggle = $("#menu-toggle"),
  mobileNav = $("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  toggle.textContent = "☰";
}
toggle.addEventListener("click", () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  toggle.textContent = open ? "✕" : "☰";
});
mobileNav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
let ticking = false;
function updateReadingProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  $(".reading-progress").style.width =
    `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  ticking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateReadingProgress);
    }
  },
  { passive: true },
);
updateReadingProgress();
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let count = 0;
    document.querySelectorAll("[data-filter]").forEach((b) => {
      const active = b === button;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".project").forEach((p) => {
      project.hidden = filter !== "all" && project.dataset.category !== filter;
      if (!project.hidden) {
        count++;
        project.classList.add("visible");
      }
    });
    $("#filter-status").textContent =
      `Showing ${count} ${count === 1 ? "project" : "projects"}.`;
  }),
);
const dialog = $("#project-dialog");
let projectTrigger = null;
document.querySelectorAll("[data-project]").forEach((button) =>
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    projectTrigger = button;
    $("#project-kind").textContent = project.kind;
    $("#project-title").textContent = project.title;
    $("#project-description").textContent = project.description;
    $("#project-disclosure").textContent = project.disclosure;
    const gallery = $("#project-gallery");
    gallery.replaceChildren();
    (project.images || []).forEach(([src, alt]) => {
      const a = document.createElement("a");
      a.href = src;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      a.append(img);
      gallery.append(a);
    });
    const list = $("#project-features");
    list.replaceChildren();
    project.features.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      list.append(li);
    });
    const tags = $("#project-tags");
    tags.replaceChildren();
    project.tags.forEach((text) => {
      const tag = document.createElement("span");
      tag.textContent = text;
      tags.append(tag);
    });
    const link = $("#project-link");
    link.hidden = !project.url;
    if (project.url) link.href = project.url;
    else link.removeAttribute("href");
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }),
);
$(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  projectTrigger?.focus({ preventScroll: true });
});
let ignited = false;
$("#ignite").addEventListener("click", () => {
  ignited = !ignited;
  $("#ignite").setAttribute("aria-pressed", String(ignited));
  $("#ignite").innerHTML = ignited
    ? 'RETURN TO BLUE <span aria-hidden="true">&lt;/&gt;</span>'
    : 'IGNITE THE BACKGROUND <span aria-hidden="true">&lt;/&gt;</span>';
  window.dispatchEvent(
    new CustomEvent("portfolio-ignite", { detail: { ignited } }),
  );
});
