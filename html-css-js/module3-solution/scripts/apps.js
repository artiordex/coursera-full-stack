document.addEventListener("DOMContentLoaded", async () => {
  const includeTargets = document.querySelectorAll("[data-include]");

  for (const el of includeTargets) {
    const filePath = el.getAttribute("data-include");
    if (!filePath) continue;
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(filePath);
      el.innerHTML = await response.text();
      el.removeAttribute("data-include");
      el.setAttribute("data-included", "true");
    } catch (err) {
      el.innerHTML = `<div class="alert alert-danger">Include 실패: ${filePath}</div>`;
    }
  }
  document.dispatchEvent(new Event("includesLoaded"));
});
