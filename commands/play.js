const path = require("path");
const fs = require("fs");
const { createAudioPlayer, createAudioResource } = require("@discordjs/voice");

function createVolumeControlledResource(filePath, volume = 1.0) {
  const resource = createAudioResource(filePath, {
    inlineVolume: true,
  });

  resource.volume.setVolume(volume);
  return resource;
}

async function play(message) {
  const connection = message.client.connection;
  if (!connection) {
    return message.reply(
      "Aucune connexion active. Utilisez la commande `!join` pour faire rejoindre le bot."
    );
  }

  const command = message.content.slice(6).trim();
  const vIndex = command.lastIndexOf("v");
  const audioFile = command.slice(0, vIndex).trim();
  const volumeStr = command.slice(vIndex + 1).trim();
  const volume = isNaN(parseFloat(volumeStr)) ? 0.5 : parseFloat(volumeStr);

  if (!audioFile) {
    return message.reply(
      "Veuillez spécifier un son à jouer. Par exemple: `!play hum v0.7`."
    );
  }

  let filePath = path.join(__dirname, "../db", `${audioFile}.mp3`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, "../db", `${audioFile}.ogg`);
    if (!fs.existsSync(filePath)) {
      return message.reply(
        `Le son ${audioFile}.mp3 ou ${audioFile}.ogg n'existe pas dans la db.`
      );
    }
  }

  const player = createAudioPlayer();
  const resource = createVolumeControlledResource(filePath, volume);
  message.client.lastAudioFile = audioFile;
  
  player.play(resource);
  connection.subscribe(player);
  message.reply(`Lecture de ${audioFile}...`);
}

module.exports = play;
