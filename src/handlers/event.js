const { readdirSync } = require('fs');
const path = require('path');

module.exports = (client) => {
    let eventCount = 0;

    readdirSync(path.join(__dirname, '../events/bot')).forEach(dir => {
        const events = readdirSync(path.join(__dirname, '../events/bot', dir))
            .filter(file => file.endsWith(".js"));

        for (const file of events) {
            try {
                const pull = require(path.join(__dirname, '../events/bot', dir, file));

                if (typeof pull === 'function') {
                    pull(client);
                    eventCount++;
                    //console.log(`[EVENTS] Loaded event: ${file.replace('.js', '')}`);
                } else {
                    console.log(`[WANING] Event ${file} does not export a function.`);
                }
            } catch (err) {
                console.log(`[ERROR] Couldn't load the event ${file}, error: ${err.message}`);
            }
        }
    });

    console.log(`[EVENTS] Successfully loaded ${eventCount} events.`);
};

/**
 * Project: Nexa Music
 * Author: KoDdy
 * Company: Infinity
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/fbu64BmPFD
 */