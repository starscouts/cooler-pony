"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const CommandBase_1 = require("../core/CommandBase");
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
class PingCommand extends CommandBase_1.CommandBase {
    constructor() {
        super();
        this.slashCommandData = new builders_1.SlashCommandBuilder()
            .setName("ping")
            .setDescription("Shows the latency between the bot and Discord");
    }
    handle(action) {
        let interaction = action.getInteraction();
        let VoiceBase = global.VoiceBase;
        let processing = new Date().getTime() - global.processingStart;
        let interactionTime = new Date().getTime() - interaction.createdAt.getTime();
        let apiTime = global.client.ws.ping;
        interaction.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(":rocket: Pong!")
                    .addFields({ name: "Processing", value: processing.toFixed(2) + "ms", inline: true }, { name: "Interaction", value: interactionTime.toFixed(2) + "ms", inline: true }, { name: "API", value: apiTime.toFixed(2) + "ms", inline: true })
            ]
        });
    }
}
exports.PingCommand = PingCommand;
//# sourceMappingURL=ping.js.map