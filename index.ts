import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Interaction,
  Message,
} from "discord.js";
import { MongoClient } from 'mongodb';
import { isTicket } from './tickets';
const fs = require('fs');

async function getConfig() {
  return await JSON.parse(fs.readFileSync('./config.json'));
}

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]});

async function run() { // starts the bot
  let config = await getConfig();
  client.login(config.token);
}run();

process.on('uncaughtException', async e => {
  console.log('Bot would have crashed, see below and fix!');
  console.log(e);
});

client.once('ready', async () => {
  let config = await getConfig();
  console.log("Discord bot is now online");

  client.on('messageCreate', async (message: Message) => {
    if (message.author.id === config.ownerId) { // owner only commands
      if (message.content === '.registercommands') {
        await message.reply('Registering Commands... Please allow some time for the api to update them');
        await registerCommands();
      }
    }

    // check if it's an open ticket channel
    let search = await isTicket(message.channel.id)
    if (search !== null) {
      // console.log(search);
      // console.log(message);
    }

  });

  client.on('interactionCreate', async (interaction: Interaction) => {
    config = await getConfig();
    switch (interaction.type) {
      case 2:
        try {
          await require(`./commands/${interaction.commandName}.ts`).run(interaction, client);
        }
        catch (err) {
          console.error(err);
          interaction.reply({ content: 'That command seems to be missing...', ephemeral: true });
        }
        break;
    }
  });

});

async function registerCommands() {
  let config = await getConfig();
  let commands = await JSON.parse(fs.readFileSync('./commands/commands.json'));
  const rest = new REST({ version: '10' }).setToken(config.token);

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(config.botId, config.guildId), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}