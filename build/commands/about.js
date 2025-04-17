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
exports.AboutCommand = void 0;
const CommandBase_1 = require("../core/CommandBase");
const builders_1 = require("@discordjs/builders");
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
const discord_js_1 = require("discord.js");
const LogManager_1 = require("../core/LogManager");
class AboutCommand extends CommandBase_1.CommandBase {
    constructor() {
        super();
        this.slashCommandData = new builders_1.SlashCommandBuilder()
            .setName("about")
            .setDescription("Gets diagnostics information from the bot");
    }
    handle(action) {
        let interaction = action.getInteraction();
        interaction.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(":sos: Diagnostics Information")
                    .setDescription(global.client.user.username + " version " + global.version + ", build " + global.build + "\n    on Node.js " + process.versions.node + " " + process.arch + "\n    on " + os.type() + " " + os.arch() + " " + os.release() + "\n    on " + os.hostname() + "\n" + (fs.existsSync("./RESTART") ? (":warning: Update to version " + (fs.existsSync("./.git/refs/heads/mane") ? fs.readFileSync("./.git/refs/heads/mane").toString().trim().substring(0, 8) : (fs.existsSync("../.git/refs/heads/mane") ? fs.readFileSync("../.git/refs/heads/mane").toString().trim().substring(0, 8) : (fs.existsSync("./version.txt") ? fs.readFileSync("./version.txt").toString().trim() : (fs.existsSync("../version.txt") ? fs.readFileSync("../version.txt").toString().trim() : "live")))) + ", build " + (fs.existsSync("./build.txt") ? fs.readFileSync("./build.txt").toString().trim() : (fs.existsSync("../build.txt") ? fs.readFileSync("../build.txt").toString().trim() : "dev")) + " pending.") : ("")))
                    .addField("System Information", "" +
                    "**PID:** " + process.pid + ", running as " + os.userInfo().username + " (" + os.userInfo().uid + ":" + os.userInfo().gid + ")\n" +
                    "**Path:** " + global.systemRoot + "\n")
                    .addField("Bot Information", "" +
                    "**User ID:** " + global.client.user.id + "\n" +
                    "**Imported modules:** " + Object.keys(require.cache).length + "\n" +
                    "**Used RAM:** " + Math.round(process.memoryUsage().heapTotal / (1024 ** 2)) + " MiB\n" +
                    "**Connection date:** " + global.client.readyAt.toISOString())
            ],
            components: [
                new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setLabel('Source Code')
                    .setStyle('LINK')
                    .setURL("https://git.equestria.dev/equestria.dev/cooler-pony"), new discord_js_1.MessageButton()
                    .setLabel('Roadmap')
                    .setStyle('LINK')
                    .setURL("https://git.equestria.dev/equestria.dev/cooler-pony/src/branch/mane/TODO.md"), new discord_js_1.MessageButton()
                    .setLabel('General Information')
                    .setStyle('LINK')
                    .setURL("https://git.equestria.dev/equestria.dev/cooler-pony/src/branch/mane/README.md"))
            ]
        }).then(() => {
            LogManager_1.LogManager.info("/about: dispatched GUI info");
        });
        return;
    }
}
exports.AboutCommand = AboutCommand;
//# sourceMappingURL=about.js.map