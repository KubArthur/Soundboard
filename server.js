require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const join = require("./commands/join");
const help = require("./commands/help");
const play = require("./commands/play");
const stop = require("./commands/stop");
const list = require("./commands/list");
const leave = require("./commands/leave");
const replay = require("./commands/replay");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const port = 3000;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Bot ${client.user.tag} en ligne`);
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!join")) {
    await join(message);
  } else if (message.content.startsWith("!help")) {
    await help(message);
  } else if (message.content.startsWith("!play")) {
    await play(message);
  } else if (message.content === "!stop") {
    stop(message);
  } else if (message.content === "!list") {
    await list(message);
  } else if (message.content === "!leave") {
    await leave(message);
  } else if (message.content === "!replay") {
    await replay(message);
  }
});

app.use(bodyParser.json());

const handleCommand = async (command, client, res) => {
  if (!client.isReady()) {
    return res.status(500).send("Bot non prêt");
  }

  const message = {
    content: command,
    client: client,
    reply: (text) => {
      console.log(text);
    },
  };

  try {
    const action = command.startsWith("!play") ? play : stop;
    await action(message);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'exécution de la commande");
  }
};

app.post("/play", async (req, res) => {
  const { fileName } = req.body;
  const command = `!play ${fileName}`;
  await handleCommand(command, client, res);
});

app.post("/stop", async (req, res) => {
  const command = `!stop`;
  await handleCommand(command, client, res);
});

app.listen(port, () => {
  console.log(`Serveur HTTP écoute sur http://localhost:${port}`);
});

client.login(process.env.TOKEN_APP);
