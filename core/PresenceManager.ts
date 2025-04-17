import {Client} from "discord.js";

export class PresenceManager {
    public static start(client: Client): void {
        client.user.setPresence({activities: [{name: 'with you!'}], status: 'online'});
    }
}