module.exports = {
    name: 'stop',
    description: 'Stop the music and clears the queue',
    inVc: true,
    sameVc: true,
    player: true,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player.queue.size && !player.queue.current) {
            return interaction.reply({ content: '❌ | There is nothing playing right now.', ephemeral: true });
        }

        player.queue.clear();

        player.stop();

        return interaction.reply(`⏹️ | Stopped the music and cleared the queue.`);
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
