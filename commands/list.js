const path = require("path");
const fs = require("fs");

async function list(message) {
  const dbPath = path.join(__dirname, "../db");

  fs.readdir(dbPath, (err, files) => {
    if (err) {
      console.error("Erreur lors de la lecture du répertoire db :", err);
      return message.reply("Aucun son n'a pu être collecté !");
    }

    if (files.length === 0) {
      return message.reply("Le dossier db est vide...");
    }

    const audioFiles = files
      .filter((file) => file.endsWith(".mp3"))
      .map((file) => file.replace(".mp3", ""));

    const response = audioFiles.length
      ? `Fichiers audio disponibles :\n${audioFiles.join("\n")}`
      : "Aucun son trouvé...";

    message.reply(response);
  });
}

module.exports = list;
