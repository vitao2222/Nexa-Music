module.exports = (client) => {
    client.riffy.on('nodeError', (node, error) => {
        console.log(`[RIFFY] Node error on ${node.name}: ${error.message}`);
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