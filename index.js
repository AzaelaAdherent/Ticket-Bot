require('dotenv').config();
require('colors');

const prefix = '[Ticket-Bot]:'.brightWhite.bgBrightGreen.bold;

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js');

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]});

client.login(process.env.TOKEN);

process.on('uncaughtException', (e) => {
  console.log(prefix, 'Bot would have crashed, see below and fix!');
  console.log(e);
});

client.on('ready', () => {
  console.log(prefix, "Hello World!");
  client.channels.cache.get(process.env.TICKET_CREATE_CHANNELID)
    .send(ticketCreateForm());
});

client.on('messageCreate', async message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});



const ticketCreateForm = () => {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Click me!')
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('pry')
        .setLabel('Click mwfae!')
        .setStyle(ButtonStyle.Primary)
    );
    
  const embed = new EmbedBuilder()
  	.setColor(0x0099FF)
  	.setTitle('Some title')
  	.setURL('https://discord.js.org')
  	.setDescription('Some description here');
  let sample = {
    content: 'meow',
    ephemeral: true,
    embeds: [embed],
    components: [row],
  };

  return sample;
}