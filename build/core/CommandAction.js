"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandAction = void 0;
const discord_js_1 = require("discord.js");
class CommandName extends String {
    constructor(...args) {
        super(...args);
    }
}
class CommandAction {
    constructor(command, interaction, args) {
        this.command = new CommandName(command);
        this.interaction = interaction;
        if (args) {
            this.args = args;
        }
        else if (interaction instanceof discord_js_1.CommandInteraction) {
            this.args = interaction.options;
        }
        else {
            this.args = {};
        }
    }
    getCommand() {
        return this.command;
    }
    getInteraction() {
        return this.interaction;
    }
    getArgument(argument) {
        if (this.args instanceof discord_js_1.CommandInteractionOptionResolver) {
            return this.args.get(argument, true).value;
        }
        else {
            return this.args[argument];
        }
    }
}
exports.CommandAction = CommandAction;
//# sourceMappingURL=CommandAction.js.map