import {Message} from "discord.js";
import {Welcome} from "./Welcome";
import Fuse from "fuse.js";
import {LogManager} from "./LogManager";

export class ManagedChannelManager {
    public static handleMessage(message: Message): void {
        if (message.author.id === global.client.user.id) return;
        let data = global.data;

        let channels = data.managedChannels.map(i => i.channel);
        if (channels.includes(message.channel.id)) {
            let channel = data.managedChannels.find(i => i.channel === message.channel.id);
            if (channel.user === message.author.id) {
                let question = Welcome.questions[channel.question];

                const fuse = new Fuse(question.response, {
                    includeScore: true
                })

                let results = fuse.search(message.content);

                if (results.length === 0) {
                    message.react("❌");
                    return;
                }

                LogManager.verbose("Question \"" + question.question + "\": response \"" + message.content + "\", score " + results[0].score.toFixed(5));

                if (results[0].score < 0.5) {
                    message.react("✅");
                    message.member.roles.add("996411960293859400");
                    message.channel.delete();
                    data.managedChannels.splice(data.managedChannels.indexOf(channel), 1);
                } else {
                    message.react("❌");
                }
            }
        }
    }
}