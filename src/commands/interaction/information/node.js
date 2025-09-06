const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "node",
    description: "Check Lavalink node statistics",
    run: async (client, interaction) => {
        const ms = (await import("pretty-ms")).default;

        try {
            let nodes = [];

            if (client.riffy) {
                nodes = Array.from(client.riffy.nodes.values());
            }

            if (!nodes.length) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Red")
                        .setDescription("No Lavalink nodes found.")],
                    ephemeral: true
                });
            }

            const formatMB = (bytes) => ((bytes ?? 0) / 1024 / 1024).toFixed(2);

            const formatPercent = (value) => ((value ?? 0) * 100).toFixed(2);

            const embeds = nodes.map((node, index) => {
                const identifier = node.name || node.info?.identifier || `Node ${index + 1}`;
                const online = node.isConnected ? "🟢 Online" : "🔴 Offline";
                const ping = node.ping ? `${node.ping}ms` : "N/A";

                const stats = node.stats || {};

                const players = stats.players ?? 0;
                const playing = stats.playingPlayers ?? 0;
                const uptime = stats.uptime ? ms(stats.uptime, { verbose: true }) : "Unknown";

                const memory = stats.memory || {};
                const memoryInfo = {
                    used: formatMB(memory.used),
                    free: formatMB(memory.free),
                    allocated: formatMB(memory.allocated),
                    reservable: formatMB(memory.reservable),
                };

                const memoryUsage = memory.allocated && memory.used ? 
                    ((memory.used / memory.allocated) * 100).toFixed(1) : "N/A";

                const cpu = stats.cpu || {};
                const cpuInfo = {
                    cores: cpu.cores ?? "N/A",
                    systemLoad: formatPercent(cpu.systemLoad),
                    lavalinkLoad: formatPercent(cpu.lavalinkLoad),
                };

                const frameStats = stats.frameStats || {};
                const frames = {
                    sent: frameStats.sent ?? "N/A",
                    nulled: frameStats.nulled ?? "N/A",
                    deficit: frameStats.deficit ?? "N/A",
                };

                return new EmbedBuilder()
                    .setColor(node.isConnected ? (client.config?.color || "#00FF00") : "#FF0000")
                    .setAuthor({ 
                        name: "Lavalink Node Statistics", 
                        iconURL: client.user?.displayAvatarURL() 
                    })
                    .setTitle(`${identifier}`)
                    .setDescription(`**Status:** ${online}\n**Ping:** \`${ping}\``)
                    .addFields(
                        {
                            name: "Player Statistics",
                            value: `**Players:** ${players}\n**Playing:** ${playing}\n**Uptime:** ${uptime}`,
                            inline: true
                        },
                        {
                            name: "CPU Information",
                            value: `**Cores:** ${cpuInfo.cores}\n**System Load:** ${cpuInfo.systemLoad}%\n**Lavalink Load:** ${cpuInfo.lavalinkLoad}%`,
                            inline: true
                        },
                        {
                            name: "Memory Usage",
                            value: `**Used:** ${memoryInfo.used} MB\n**Free:** ${memoryInfo.free} MB\n**Usage:** ${memoryUsage}%`,
                            inline: true
                        },
                        {
                            name: "Memory Allocation",
                            value: `**Allocated:** ${memoryInfo.allocated} MB\n**Reservable:** ${memoryInfo.reservable} MB`,
                            inline: true
                        }
                    )
                    .setFooter({ 
                        text: `Node ${index + 1}/${nodes.length} • Updated`,
                        iconURL: client.user?.displayAvatarURL()
                    })
                    .setTimestamp();
            });


            if (embeds.length === 1) {
                return interaction.reply({ embeds });
            }

            let currentPage = 0;
            const maxPages = embeds.length;

            const getButtons = (page) => {
                return new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('prev')
                            .setLabel('◀️ Previous')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(page === 0),
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel('Next ▶️')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(page === maxPages - 1),
                        new ButtonBuilder()
                            .setCustomId('refresh')
                            .setLabel('🔄 Refresh')
                            .setStyle(ButtonStyle.Secondary)
                    );
            };

            const response = await interaction.reply({
                embeds: [embeds[currentPage]],
                components: [getButtons(currentPage)],
                fetchReply: true
            });

            const collector = response.createMessageComponentCollector({
                time: 300000
            });

            collector.on('collect', async (buttonInteraction) => {
                if (buttonInteraction.user.id !== interaction.user.id) {
                    return buttonInteraction.reply({
                        content: "You cannot use these buttons.",
                        ephemeral: true
                    });
                }

                if (buttonInteraction.customId === 'prev') {
                    currentPage = Math.max(0, currentPage - 1);
                } else if (buttonInteraction.customId === 'next') {
                    currentPage = Math.min(maxPages - 1, currentPage + 1);
                } else if (buttonInteraction.customId === 'refresh') {
                    const refreshedNodes = Array.from(client.riffy.nodes.values());
                    if (refreshedNodes[currentPage]) {
                        const refreshedEmbed = embeds[currentPage];
                        refreshedEmbed.setFooter({ 
                            text: `Node ${currentPage + 1}/${maxPages} • Refreshed`,
                            iconURL: client.user?.displayAvatarURL()
                        }).setTimestamp();
                    }
                }

                await buttonInteraction.update({
                    embeds: [embeds[currentPage]],
                    components: [getButtons(currentPage)]
                });
            });

            collector.on('end', () => {
                const disabledRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('prev')
                            .setLabel('◀️ Previous')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel('Next ▶️')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId('refresh')
                            .setLabel('🔄 Refresh')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(true)
                    );

                response.edit({ components: [disabledRow] }).catch(() => {});
            });

            return response;

        } catch (error) {
            console.error("Error in node command:", error);
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("An error occurred while fetching Lavalink node statistics.\n```js\n" + error.message + "\n```")],
                ephemeral: true
            });
        }
    },
};