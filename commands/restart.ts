import {CommandBase} from "../core/CommandBase";
import {SlashCommandBuilder} from "@discordjs/builders";
import * as fs from 'fs';
import {CommandAction} from "../core/CommandAction";
import {MessageEmbed} from "discord.js";

export class RestartCommand extends CommandBase {
    constructor() {
        super();
        this.slashCommandData = new SlashCommandBuilder()
            .setName("restart")
            .setDescription("Restarts the bot")
    }

    public handle(action: CommandAction) {
        let interaction = action.getInteraction();

        if (!interaction.memberPermissions.has("ADMINISTRATOR")) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(":x: You need to have the server administrator permission.")
                ]
            });
            return;
        }

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(":white_check_mark: The bot is now restarting")
            ]
        }).then(() => {
            fs.writeFileSync("./RESTART-FORCE", "");
        });
    }
}
