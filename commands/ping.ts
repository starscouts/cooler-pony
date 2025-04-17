import {CommandBase} from "../core/CommandBase";
import {MessageEmbed} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandAction} from "../core/CommandAction";

export class PingCommand extends CommandBase {
    constructor() {
        super();
        this.slashCommandData = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Shows the latency between the bot and Discord")
    }

    public handle(action: CommandAction) {
        let interaction = action.getInteraction();
        let VoiceBase = global.VoiceBase;
        let processing = new Date().getTime() - global.processingStart;
        let interactionTime = new Date().getTime() - interaction.createdAt.getTime();
        let apiTime = global.client.ws.ping;

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(":rocket: Pong!")
                    .addFields(
                        {name: "Processing", value: processing.toFixed(2) + "ms", inline: true},
                        {name: "Interaction", value: interactionTime.toFixed(2) + "ms", inline: true},
                        {name: "API", value: apiTime.toFixed(2) + "ms", inline: true}
                    )
            ]
        });
    }
}