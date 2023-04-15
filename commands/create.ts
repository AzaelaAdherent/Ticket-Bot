import { CommandInteraction, Client } from 'discord.js';
import { createTicket } from '../tickets';
const fs = require('fs');

async function getConfig() {
  return await JSON.parse(fs.readFileSync('./config.json'));
}

module.exports.run = async (interaction: CommandInteraction, client: Client) => {
  await interaction.deferReply({ ephemeral: true });

  let config = await getConfig();

  let tag = interaction.user.username + interaction.user.discriminator;

  client.guilds.cache.get(config.guildId)?.channels.create({
    name: tag,
    type: 0,
    parent: config.ticketCategoryId,
  })
  .then(channel => {
    createTicket(interaction.user.id, new Date, channel.id, channel.name);
    interaction.editReply(`Ticket successfully created! <#${channel.id}>`);
  });
  
}