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
exports.Welcome = void 0;
const LogManager_1 = require("./LogManager");
const fs = __importStar(require("fs"));
class Welcome {
    static welcome(member) {
        let data = global.data;
        LogManager_1.LogManager.warn(member.user.tag + " joined the server");
        let guild = member.guild;
        guild.channels.create("welcome", {
            parent: guild.channels.resolve("996412407217926224").parent.id
        }).then(channel => {
            let thisChannel = {
                channel: channel.id,
                user: member.user.id,
                question: Math.floor(Math.random() * Welcome.questions.length),
            };
            data.managedChannels.push(thisChannel);
            channel.permissionOverwrites.create(guild.roles.everyone, {
                VIEW_CHANNEL: false,
            });
            channel.permissionOverwrites.create(member.id, {
                VIEW_CHANNEL: true,
            });
            let welcome = guild.channels.resolve("996412407217926224");
            // @ts-ignore
            welcome.permissionOverwrites.create(member.id, {
                VIEW_CHANNEL: false,
            });
            channel.send("**Welcome to " + guild.name + ", <@" + member.id + ">!**\n\nBefore you can access the server, you need to read and agree to the <#996403284246016031>. Once done, send a reply to the following question:\n\n> " + Welcome.questions[thisChannel.question].question + "\n\nIf you reply correctly, you will be able to access the server. Contact the mods if you need help (managed channel ID: `" + thisChannel.channel + "`).\n\n:warning: Note that the bot might not accept your answer if it is not spelled properly. If it is not accepted, try again with a different phrasing. In case of doubt, the bot will direct you to a mod.");
        });
    }
    static unwelcome(member) {
        let data = global.data;
        LogManager_1.LogManager.warn(member.user.tag + " left the server");
        let users = data.managedChannels.map(i => i.user);
        if (users.includes(member.id)) {
            let channel = data.managedChannels.find(i => i.user === member.id);
            member.guild.channels.resolve(channel.channel).delete();
            data.managedChannels.splice(data.managedChannels.indexOf(channel), 1);
        }
    }
}
exports.Welcome = Welcome;
Welcome.questions = JSON.parse(fs.readFileSync("./assets/questions.json", "utf8"));
//# sourceMappingURL=Welcome.js.map