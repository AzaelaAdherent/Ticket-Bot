import { CommandInteraction } from 'discord.js';
import { createTicket } from '../tickets';

module.exports.run = async (interaction: CommandInteraction) => {
  interaction.reply("Working...");

  createTicket();
}