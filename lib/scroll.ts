export function smoothScrollTo(id: string) {
  const el = document.getElementById(id) || document.querySelector(id);
  if (!el) return;
  const navHeight = 88;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}
