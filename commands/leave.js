const { getVoiceConnection } = require("@discordjs/voice");

async function leave(message) {
  const connection = getVoiceConnection(message.guild.id);

  if (connection) {
    connection.destroy();
    message.reply("Le bot a quitté le salon vocal.");
  } else {
    message.reply("Aucun bot n'est actuellement dans le salon vocal.");
  }
}

module.exports = leave;
