import { CommandInteraction } from 'discord.js';

module.exports.run = async (interaction: CommandInteraction) => {
  interaction.reply("Help is not available at this time");
}