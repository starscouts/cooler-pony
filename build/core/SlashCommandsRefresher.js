"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandsRefresher = void 0;
const LogManager_1 = require("./LogManager");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const CommandsLoader_1 = require("./CommandsLoader");
class SlashCommandsRefresher {
    static async refresh(clientId, token) {
        const rest = new rest_1.REST({ version: '9' }).setToken(token);
        try {
            const commandsLoader = new CommandsLoader_1.CommandsLoader();
            LogManager_1.LogManager.info('Started refreshing application (/) commands.');
            await rest.put(v9_1.Routes.applicationCommands(clientId), { body: [] });
            try {
                await rest.put(v9_1.Routes.applicationGuildCommands(clientId, "996331009744318534"), { body: commandsLoader.slashCommands() });
            }
            catch (e) {
                await rest.put(v9_1.Routes.applicationGuildCommands(clientId, "969994404184084560"), { body: commandsLoader.slashCommands() });
            }
            LogManager_1.LogManager.info('Successfully reloaded application (/) commands. Changes may take a while to appear on Discord.');
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.SlashCommandsRefresher = SlashCommandsRefresher;
//# sourceMappingURL=SlashCommandsRefresher.js.map