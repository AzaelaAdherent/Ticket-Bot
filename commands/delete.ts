import { CommandInteraction, Client, GuildChannel } from 'discord.js';
import { isTicket, deleteTicket } from '../tickets';
const fs = require('fs');

async function getConfig() {
  return await JSON.parse(fs.readFileSync('./config.json'));
}

module.exports.run = async (interaction: CommandInteraction, client: Client) => {
  await interaction.deferReply({ ephemeral: true });
  const reason = interaction.options.get('reason')?.value?.toString() ?? 'No reason specified';

  let channelid = interaction.channel?.id ?? '';
  let channelname = (interaction.channel as GuildChannel)?.name;
  let category = (interaction.channel as GuildChannel)?.parent?.name ?? 'unknown';

  // check if it's an open ticket channel
  let search = await isTicket(channelid)
  if (search !== null) {
    interaction.channel?.delete()
    .then(() => {
      deleteTicket(interaction.user.id, new Date, channelid, channelname, category, reason);
    })
    .catch(console.error);
  }

}