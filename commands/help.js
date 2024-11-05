async function help(message) {
  const helpMessage = `
    **Commandes disponibles :**
    **!join** : Le bot rejoint le salon vocal où vous vous trouvez.
    **!play <nom_fichier>** : Le bot exécute le son. Par exemple :
          ~ \`!play hum v0.7\` où \`v\` est le volume avec \`v\` ϵ [0, 2].
          ~ \`!play hum\` où \`v\` est défini automatiquement à 0.5.
    **!stop** : Le bot arrête le son en cours de lecture.
    **!replay** : Le bot rejoue le dernier son exécuté avec \`v\` par défaut.
    **!leave** : Le bot quitte le salon vocal.
  `;

  try {
    await message.reply(helpMessage);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message d'aide :", error);
  }
}

module.exports = help;
