import chalk from 'chalk';
import * as fs from 'fs';

if (!fs.existsSync("logs")) fs.mkdirSync("logs");

export class LogManager {
    public static logID = new Date().toISOString();

    /**
     * @return void
     * @param message - The message to display
     * @description Shows a warning message
     */
    public static warn(message: string): void {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift()

        console.log(
            chalk.gray("[" + new Date().toISOString() + "] ") +
            chalk.yellow("[warn] ") +
            (messageParts.length > 0 ? chalk.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix)
        );

        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [warn] " + message);
    }

    /**
     * @return void
     * @param message - The message to display
     * @description Shows an information message
     */
    public static info(message: string): void {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift()

        console.log(
            chalk.gray("[" + new Date().toISOString() + "] ") +
            chalk.cyan("[info] ") +
            (messageParts.length > 0 ? chalk.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix)
        );

        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [info] " + message);
    }

    /**
     * @return void
     * @param message - The message to display
     * @description Shows a debugging message
     */
    public static verbose(message: string): void {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift()

        console.log(
            chalk.gray("[" + new Date().toISOString() + "] ") +
            chalk.green("[verb] ") +
            (messageParts.length > 0 ? chalk.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix)
        );

        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [verb] " + message);
    }

    /**
     * @return void
     * @param message - The message to display
     * @description Shows an error message
     */
    public static error(message: string): void {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift()

        console.log(
            chalk.gray("[" + new Date().toISOString() + "] ") +
            chalk.red("[crit] ") +
            (messageParts.length > 0 ? chalk.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix)
        );

        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [crit] " + message);
    }
}
