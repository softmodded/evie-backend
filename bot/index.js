const discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
require("dotenv").config();

const prefix = "v";

const client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.MessageContent,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.Guilds,
  ],
});


client.db = db;

async function loadCommands() {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "cmds"))
    .filter((file) => file.endsWith(".js"));

  client.commands = new discord.Collection();

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, "cmds", file));
    client.commands.set(command.help.name, command);
    console.log(`loaded command ${command.help.name}`);
  }
}

client.once("ready", async () => {
  console.log(`logged in as ${client.user.tag}`);
  const activity = (await db.get("activity")) || "hello world";
  client.user.setActivity({
    type: discord.ActivityType.Custom,
    name: activity,
  });

  loadCommands();
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;

  try {
    cmd.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply(
      "there was an error trying to execute that command: `" + error + "`"
    );
  }
});

client.login(process.env.TOKEN);
