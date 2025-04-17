import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    MessageComponentInteraction,
    ModalSubmitInteraction
} from "discord.js";

class CommandName extends String {
    constructor(...args) {
        super(...args);
    }
}

export class CommandAction {
    private readonly command: CommandName;
    private readonly args: object | CommandInteractionOptionResolver;
    private readonly interaction: CommandInteraction | ModalSubmitInteraction | MessageComponentInteraction;

    constructor(command: string, interaction: CommandInteraction | ModalSubmitInteraction | MessageComponentInteraction, args?: object) {
        this.command = new CommandName(command);
        this.interaction = interaction;
        if (args) {
            this.args = args;
        } else if (interaction instanceof CommandInteraction) {
            this.args = interaction.options;
        } else {
            this.args = {};
        }
    }

    public getCommand(): CommandName {
        return this.command;
    }

    public getInteraction(): CommandInteraction | ModalSubmitInteraction | MessageComponentInteraction {
        return this.interaction;
    }

    public getArgument(argument: string): any {
        if (this.args instanceof CommandInteractionOptionResolver) {
            return this.args.get(argument, true).value;
        } else {
            return this.args[argument];
        }
    }
}