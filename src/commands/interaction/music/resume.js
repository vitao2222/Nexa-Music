module.exports = {
    name: 'resume',
    description: 'Resumes the current track',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (!player.paused) {
            return interaction.reply(`The player is already playing song`);
        } else {
            player.pause(false);
            return interaction.reply(`Resumed the current track.`);
        }
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
