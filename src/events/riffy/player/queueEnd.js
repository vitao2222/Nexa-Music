const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.riffy.on("queueEnd", async (player) => {
    if (player.message) {
      player.message.delete().catch(() => {});
    }

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    if (player.isAutoplay) {
      if (typeof player.autoplay === "function") {
        player.autoplay(player);
      }
    } else {
      player.destroy();

      const embed = new EmbedBuilder()
        .setColor(client.config.color)
        .setAuthor({
          name: `Queue Concluded`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `Enjoying music with me? Consider inviting me! [Click Here](${client.config.invite})`
        );

      channel.send({ embeds: [embed] }).catch(() => {});
    }
  });
};

/**
 * Project: Nexa Music
 * Author: KoDdy
 * Company: Infinity
 * This code is the property of Infinity and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/fbu64BmPFD

 */
