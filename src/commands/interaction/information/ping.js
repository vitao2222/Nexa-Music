const { Client, CommandInteraction } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Obtain the bot's latency reading.",
    run: async (client, interaction) => {
        return interaction.reply(`${client.ws.ping}ms`)
    }
}

/**
 * Project: Nexa Music
 * Author: KoDdy
 * Company: Infinity
 * This code is the property of Infinity and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/fbu64BmPFD
 */
