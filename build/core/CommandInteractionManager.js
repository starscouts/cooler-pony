"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandInteractionManager = void 0;
const InteractionManager_1 = require("./InteractionManager");
const LogManager_1 = require("./LogManager");
const CommandsLoader_1 = require("./CommandsLoader");
const CommandAction_1 = require("./CommandAction");
class CommandInteractionManager extends InteractionManager_1.InteractionManager {
    constructor(interaction) {
        super();
        LogManager_1.LogManager.verbose("CommandInteractionManager: " + interaction.commandName);
        if (Object.keys(CommandInteractionManager.commands).includes(interaction.commandName)) {
            CommandInteractionManager.commands[interaction.commandName].handle(new CommandAction_1.CommandAction(interaction.commandName, interaction));
        }
        else {
            LogManager_1.LogManager.error("Command not found: " + interaction.commandName);
            interaction.reply(":x: Command not found: `" + interaction.commandName + "`, this is most likely a bug.");
        }
    }
}
exports.CommandInteractionManager = CommandInteractionManager;
CommandInteractionManager.commands = new CommandsLoader_1.CommandsLoader().getCommands();
//# sourceMappingURL=CommandInteractionManager.js.map