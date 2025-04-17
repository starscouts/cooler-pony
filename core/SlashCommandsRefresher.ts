import {LogManager} from "./LogManager";
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {CommandsLoader} from "./CommandsLoader";

export class SlashCommandsRefresher {
    public static async refresh(clientId: string, token: string) {
        const rest = new REST({version: '9'}).setToken(token);
        try {
            const commandsLoader = new CommandsLoader();
            LogManager.info('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(clientId),
                {body: []},
            );

            try {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, "996331009744318534"),
                    {body: commandsLoader.slashCommands()},
                );
            } catch (e) {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, "969994404184084560"),
                    {body: commandsLoader.slashCommands()},
                );
            }

            LogManager.info('Successfully reloaded application (/) commands. Changes may take a while to appear on Discord.');
        } catch (error) {
            console.error(error);
        }
    }
}