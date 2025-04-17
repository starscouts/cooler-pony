"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
if (!fs.existsSync("logs"))
    fs.mkdirSync("logs");
class LogManager {
    /**
     * @return void
     * @param message - The message to display
     * @description Shows a warning message
     */
    static warn(message) {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift();
        console.log(chalk_1.default.gray("[" + new Date().toISOString() + "] ") +
            chalk_1.default.yellow("[warn] ") +
            (messageParts.length > 0 ? chalk_1.default.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix));
        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [warn] " + message);
    }
    /**
     * @return void
     * @param message - The message to display
     * @description Shows an information message
     */
    static info(message) {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift();
        console.log(chalk_1.default.gray("[" + new Date().toISOString() + "] ") +
            chalk_1.default.cyan("[info] ") +
            (messageParts.length > 0 ? chalk_1.default.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix));
        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [info] " + message);
    }
    /**
     * @return void
     * @param message - The message to display
     * @description Shows a debugging message
     */
    static verbose(message) {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift();
        console.log(chalk_1.default.gray("[" + new Date().toISOString() + "] ") +
            chalk_1.default.green("[verb] ") +
            (messageParts.length > 0 ? chalk_1.default.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix));
        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [verb] " + message);
    }
    /**
     * @return void
     * @param message - The message to display
     * @description Shows an error message
     */
    static error(message) {
        let messageParts = message.split(":");
        let messagePrefix = messageParts[0];
        messageParts.shift();
        console.log(chalk_1.default.gray("[" + new Date().toISOString() + "] ") +
            chalk_1.default.red("[crit] ") +
            (messageParts.length > 0 ? chalk_1.default.underline(messagePrefix) + ":" + messageParts.join(":") : messagePrefix));
        fs.appendFileSync("logs/" + LogManager.logID + ".txt", "\n[" + new Date().toISOString() + "] [crit] " + message);
    }
}
exports.LogManager = LogManager;
LogManager.logID = new Date().toISOString();
//# sourceMappingURL=LogManager.js.map