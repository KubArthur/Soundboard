function stop(message) {
  const player = message.client.connection?.state.subscription?.player;

  if (player) {
    player.stop();
    message.reply("Le son a été arrêtée.");
  } else {
    message.reply("Aucun son n'est en cours de lecture.");
  }
}

module.exports = stop;
