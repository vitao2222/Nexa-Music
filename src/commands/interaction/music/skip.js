module.exports = {
    name: 'skip',
    description: 'Skips the current track',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        player.stop();

        return interaction.reply(`Skipped the current track.`);
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