const { createAudioResource } = require("@discordjs/voice");
const path = require("path");

async function replay(message) {
  const lastAudioFile = message.client.lastAudioFile;
  const connection = message.client.connection;

  if (!connection) {
    return message.reply(
      "Aucune connexion active. Utilisez la commande `!join` pour faire rejoindre le bot."
    );
  }

  if (!lastAudioFile) {
    return message.reply("Aucun son à rejouer.");
  }

  const resource = createAudioResource(
    path.join(__dirname, "../db", `${lastAudioFile}.ogg`)
  );

  const player = connection.state.subscription?.player;

  if (player) {
    player.play(resource);
    message.reply(`Relecture de ${lastAudioFile}.ogg...`);
  } else {
    message.reply("Aucune son en cours pour rejouer.");
  }
}

module.exports = replay;
