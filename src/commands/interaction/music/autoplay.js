const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'autoplay',
  description: 'Toggle autoplay for the current music player.',
  inVc: true,
  sameVc: true,

  run: async (client, interaction) => {
    const player = client.riffy.players.get(interaction.guildId);

    if (!player) {
      return interaction.reply({
        content: '❌ No music player found for this server.',
        ephemeral: true
      });
    }


    player.isAutoplay = !player.isAutoplay;

    if (typeof player.autoplay === 'function') {
      player.autoplay(player);
    }

    const embed = new EmbedBuilder()
      .setColor(client.config.color)
      .setDescription(`Autoplay mode is now \`${player.isAutoplay ? 'enabled' : 'disabled'}\``);

    return interaction.reply({ embeds: [embed] });
  },
};

/**
 * Project: Nexa Music
 * Author: KoDdy
 * Company: Infinity
 * This code is the property of Infinity and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/fbu64BmPFD

 */
