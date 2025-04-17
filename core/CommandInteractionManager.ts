import {InteractionManager} from "./InteractionManager";
import {CommandInteraction} from "discord.js";
import {LogManager} from "./LogManager";
import {CommandsLoader} from "./CommandsLoader";
import {CommandAction} from "./CommandAction";

export class CommandInteractionManager extends InteractionManager {
    public static commands = new CommandsLoader().getCommands();

    constructor(interaction: CommandInteraction) {
        super();
        LogManager.verbose("CommandInteractionManager: " + interaction.commandName);

        if (Object.keys(CommandInteractionManager.commands).includes(interaction.commandName)) {
            CommandInteractionManager.commands[interaction.commandName].handle(new CommandAction(interaction.commandName, interaction));
        } else {
            LogManager.error("Command not found: " + interaction.commandName);
            interaction.reply(":x: Command not found: `" + interaction.commandName + "`, this is most likely a bug.");
        }
    }
}