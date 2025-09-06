const { ActivityType, Events } = require("discord.js");

module.exports = (client) => {
client.on(Events.ClientReady, async () => {
    client.riffy.init(client.user.id);
    console.log(`[INFO] Logged in as ${client.user.tag}`);

    client.user.setPresence({
        activities: [
            {
                name: "Comming Soon",
                type: ActivityType.Watching
            }
        ],
        status: "idle"
    })
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
