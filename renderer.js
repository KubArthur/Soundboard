document.getElementById("loadFileList").addEventListener("click", async () => {
  try {
    const files = await window.electron.getFileList();
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    files.forEach((file) => {
      const li = document.createElement("li");
      li.textContent = file.slice(0, -4);
      fileList.appendChild(li);

      li.addEventListener("click", () => {
        const volume = parseFloat(document.getElementById("volume").value);
        window.electron.fileClicked(file, volume);
      });
    });
  } catch (error) {
    console.error("Erreur lors du chargement de la liste des fichiers:", error);
  }
});

document.getElementById("stopButton").addEventListener("click", () => {
  window.electron.stopButton();
});
