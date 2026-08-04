(function () {
  var storageKey = "wwc-seo-resource-unlocked";

  function unlock(gate) {
    gate.classList.add("is-unlocked");
    var first = gate.querySelector(".lead-downloads a");
    if (first) first.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-lead-gate]").forEach(function (gate) {
    try {
      if (localStorage.getItem(storageKey) === "yes") unlock(gate);
    } catch (e) {}

    var form = gate.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var status = form.querySelector(".lead-form-status");
      var original = button.textContent;
      var formData = new FormData(form);
      var data = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        resource: String(formData.get("resource") || "SEO Resource").trim(),
        companyWebsite: String(formData.get("company-website") || "").trim(),
        pageUrl: window.location.href,
      };

      button.disabled = true;
      button.textContent = "Unlocking…";
      status.classList.remove("error");
      status.textContent = "Saving your request…";

      fetch("/.netlify/functions/highlevel-resource-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Submission failed");
          try {
            localStorage.setItem(storageKey, "yes");
          } catch (e) {}
          status.textContent = "Success — your downloads are ready.";
          unlock(gate);
        })
        .catch(function () {
          status.textContent =
            "That did not go through. Please check your details and try again.";
          status.classList.add("error");
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = original;
        });
    });
  });
})();
