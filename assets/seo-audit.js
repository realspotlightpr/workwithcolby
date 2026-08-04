(() => {
  const modal = document.querySelector("[data-seo-audit-modal]");
  if (!modal) return;

  const dialog = modal.querySelector("[role='dialog']");
  const form = modal.querySelector("[data-seo-audit-form]");
  const status = modal.querySelector("[data-seo-audit-status]");
  const formView = modal.querySelector("[data-seo-audit-form-view]");
  const successView = modal.querySelector("[data-seo-audit-success]");
  let returnFocus = null;

  function openModal(event) {
    if (event) event.preventDefault();
    returnFocus = event && event.currentTarget;
    modal.hidden = false;
    document.body.classList.add("seo-audit-open");
    requestAnimationFrame(() => modal.querySelector("input[name='name']").focus());
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("seo-audit-open");
    if (returnFocus) returnFocus.focus();
  }

  document.querySelectorAll("[data-seo-audit-open]").forEach((button) => button.addEventListener("click", openModal));
  modal.querySelectorAll("[data-seo-audit-close]").forEach((button) => button.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll("button:not([disabled]), input:not([disabled]), a[href]")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector("button[type='submit']");
    const data = Object.fromEntries(new FormData(form).entries());
    data.pageUrl = window.location.href;
    button.disabled = true;
    button.textContent = "Saving your request…";
    status.textContent = "";
    status.classList.remove("is-error");
    try {
      const response = await fetch("/.netlify/functions/highlevel-seo-audit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Please try again.");
      form.reset();
      formView.hidden = true;
      successView.hidden = false;
      successView.querySelector("button").focus();
    } catch (error) {
      status.textContent = error.message || "We couldn't save your request. Please try again.";
      status.classList.add("is-error");
    } finally {
      button.disabled = false;
      button.textContent = "Request My Free Audit";
    }
  });
})();
