"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedChannelManager = void 0;
const Welcome_1 = require("./Welcome");
const fuse_js_1 = __importDefault(require("fuse.js"));
const LogManager_1 = require("./LogManager");
class ManagedChannelManager {
    static handleMessage(message) {
        if (message.author.id === global.client.user.id)
            return;
        let data = global.data;
        let channels = data.managedChannels.map(i => i.channel);
        if (channels.includes(message.channel.id)) {
            let channel = data.managedChannels.find(i => i.channel === message.channel.id);
            if (channel.user === message.author.id) {
                let question = Welcome_1.Welcome.questions[channel.question];
                const fuse = new fuse_js_1.default(question.response, {
                    includeScore: true
                });
                let results = fuse.search(message.content);
                if (results.length === 0) {
                    message.react("❌");
                    return;
                }
                LogManager_1.LogManager.verbose("Question \"" + question.question + "\": response \"" + message.content + "\", score " + results[0].score.toFixed(5));
                if (results[0].score < 0.5) {
                    message.react("✅");
                    message.member.roles.add("996411960293859400");
                    message.channel.delete();
                    data.managedChannels.splice(data.managedChannels.indexOf(channel), 1);
                }
                else {
                    message.react("❌");
                }
            }
        }
    }
}
exports.ManagedChannelManager = ManagedChannelManager;
//# sourceMappingURL=ManagedChannelManager.js.map