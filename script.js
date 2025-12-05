function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const STORAGE_PREFIX = "technogrunge-site-";
  const editToggle = document.getElementById("editToggle");
  const editableElements = Array.from(document.querySelectorAll(".editable"));

  function loadContent() {
    editableElements.forEach(el => {
      const key = el.dataset.key;
      if (!key) return;
      const stored = localStorage.getItem(STORAGE_PREFIX + key);
      if (stored !== null) {
        el.innerHTML = stored;
      }
    });
  }

  function saveContent(el) {
    const key = el.dataset.key;
    if (!key) return;
    localStorage.setItem(STORAGE_PREFIX + key, el.innerHTML);
  }

  function setEditMode(enabled) {
    document.body.classList.toggle("edit-mode", enabled);
    editableElements.forEach(el => {
      el.setAttribute("contenteditable", enabled ? "true" : "false");
    });
    if (editToggle) {
      if (enabled) {
        editToggle.classList.add("active");
        editToggle.innerHTML = '<span>✎</span> Edit mode: ON';
      } else {
        editToggle.classList.remove("active");
        editToggle.innerHTML = '<span>✎</span> Edit mode';
      }
    }
    localStorage.setItem(STORAGE_PREFIX + "edit-mode", enabled ? "1" : "0");
  }

  // Load initial content and edit mode state
  loadContent();
  const savedMode = localStorage.getItem(STORAGE_PREFIX + "edit-mode");
  setEditMode(savedMode === "1");

  // Auto-save on input/blur
  editableElements.forEach(el => {
    el.addEventListener("input", () => saveContent(el));
    el.addEventListener("blur", () => saveContent(el));
  });

  if (editToggle) {
    editToggle.addEventListener("click", () => {
      const isEditMode = document.body.classList.contains("edit-mode");
      setEditMode(!isEditMode);
    });
  }
});
