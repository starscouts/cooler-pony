import {SlashCommandBuilder} from "@discordjs/builders";

export class CommandBase {
    public slashCommandData: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor() {
    }
}