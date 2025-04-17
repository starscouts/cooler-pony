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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsLoader = void 0;
const LogManager_1 = require("./LogManager");
const fs = __importStar(require("fs"));
class CommandsLoader {
    constructor() {
        this.commands = {};
        LogManager_1.LogManager.verbose("Generate CommandsLoader list");
        let list = fs.readdirSync("./commands").filter((i) => i.endsWith(".js"));
        for (let item of list) {
            LogManager_1.LogManager.verbose("    load: " + item);
            let imported = require('../commands/' + item);
            let cmd = imported[Object.keys(imported)[0]];
            this.commands[item.substring(0, item.length - 3)] = new cmd();
        }
    }
    slashCommands() {
        let slashCommands = [];
        for (let name of Object.keys(this.commands)) {
            let command = this.commands[name];
            LogManager_1.LogManager.verbose("CommandsLoader: " + name);
            slashCommands.push(command.slashCommandData);
        }
        return slashCommands;
    }
    getCommands() {
        return this.commands;
    }
}
exports.CommandsLoader = CommandsLoader;
//# sourceMappingURL=CommandsLoader.js.map