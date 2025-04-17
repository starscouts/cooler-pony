import {GuildMember} from "discord.js";
import {LogManager} from "./LogManager";
import * as fs from "fs";

export class Welcome {
    public static questions = JSON.parse(fs.readFileSync("./assets/questions.json", "utf8"));

    public static welcome(member: GuildMember) {
        let data = global.data;
        LogManager.warn(member.user.tag + " joined the server");

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

    public static unwelcome(member: GuildMember) {
        let data = global.data;
        LogManager.warn(member.user.tag + " left the server");

        let users = data.managedChannels.map(i => i.user);
        if (users.includes(member.id)) {
            let channel = data.managedChannels.find(i => i.user === member.id);
            member.guild.channels.resolve(channel.channel).delete();
            data.managedChannels.splice(data.managedChannels.indexOf(channel), 1);
        }
    }
}