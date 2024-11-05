const { joinVoiceChannel } = require("@discordjs/voice");

async function join(message) {
  const channel = message.member.voice.channel;

  if (!channel) {
    return message.reply(
      "Vous devez être dans un salon vocal pour que le bot puisse vous rejoindre !"
    );
  }

  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
      selfDeaf: true,
    });

    message.client.connection = connection;
    message.reply(`Le bot vous a rejoint dans le salon ${channel.name}`);
  } catch (error) {
    console.error("Erreur lors de la connexion au salon vocal :", error);
    message.reply(
      "Une erreur est survenue lors de la tentative de connexion au salon vocal."
    );
  }
}

module.exports = join;
