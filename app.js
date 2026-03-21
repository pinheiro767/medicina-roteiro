const emptyRowsCount = 12;
  });
}

function setupButtons() {
  document.getElementById("pdfBtn").addEventListener("click", () => window.print());
  document.getElementById("addRowBtn").addEventListener("click", () => {
    document.getElementById("ossosTable").appendChild(createEmptyRow());
  });
  document.getElementById("resetRowsBtn").addEventListener("click", renderEmptyRows);

  const noteBtn = document.getElementById("noteBtn");
  if (noteBtn) {
    noteBtn.addEventListener("click", toggleAllNotes);
  }
}

function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
}

function setupInstallPrompt() {
  const installBtn = document.getElementById("installBtn");

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    state.deferredPrompt = e;
    installBtn.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    if (!state.deferredPrompt) return;
    state.deferredPrompt.prompt();
    await state.deferredPrompt.userChoice;
    state.deferredPrompt = null;
    installBtn.classList.add("hidden");
  });
}

function init() {
  renderEmptyRows();
  renderSimpleList("section-3", arquiteturaLongos);
  renderSimpleList("section-4", arquiteturaPlanos);
  renderRoteiro();
  loadNotes();
  handleImageInputs();
  setupButtons();
  registerSW();
  setupInstallPrompt();
}

document.addEventListener("DOMContentLoaded", init);