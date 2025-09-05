const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "join",
    description: "Join your current voice channel",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const member = interaction.member;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: "You must be in a voice channel first.", ephemeral: true });
        }

        try {
            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: voiceChannel.id,
                textChannel: interaction.channel.id,
                deaf: true
            });

            await interaction.reply({ content: `Joined **<#${voiceChannel.id}>**` });
        } catch (err) {
            console.error(err);
            return interaction.reply({ content: "Failed to join the voice channel.", ephemeral: true });
        }
    }
};

/**
 * Project: Nexa Music
 * Author: KoDdy
 * Company: Infinity
 * This code is the property of Infinity and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/fbu64BmPFD

 */
