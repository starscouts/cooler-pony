import {LogManager} from "./LogManager";
import * as fs from 'fs';

import {SlashCommandBuilder} from "@discordjs/builders";

export class CommandsLoader {
    private commands: object = {};

    constructor() {
        LogManager.verbose("Generate CommandsLoader list");
        let list = fs.readdirSync("./commands").filter((i: string) => i.endsWith(".js"));

        for (let item of list) {
            LogManager.verbose("    load: " + item);
            let imported = require('../commands/' + item);
            let cmd = imported[Object.keys(imported)[0]];
            this.commands[item.substring(0, item.length - 3)] = new cmd();
        }
    }

    public slashCommands(): SlashCommandBuilder[] {
        let slashCommands = [];

        for (let name of Object.keys(this.commands)) {
            let command = this.commands[name];
            LogManager.verbose("CommandsLoader: " + name);

            slashCommands.push(command.slashCommandData);
        }

        return slashCommands;
    }

    public getCommands(): object {
        return this.commands;
    }
}