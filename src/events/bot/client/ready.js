const { ActivityType } = require("discord.js");

module.exports = (client) => {
client.on("ready", async () => {
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
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/fbu64BmPFD
 */