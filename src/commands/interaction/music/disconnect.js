module.exports = {
    name: 'disconnect',
    description: 'Disconnect the bot from your voice channel',
    inVc: true,
    sameVc: true,
    player: true,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guildId);
        player.destroy();

        return interaction.reply(`Disconnected from the voice channel.`);
    },
};

/**
 * Project: Nexa Music
 * Author: KoDdy
 * Company: Infinity
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/fbu64BmPFD
 */