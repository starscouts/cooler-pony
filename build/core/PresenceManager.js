"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceManager = void 0;
class PresenceManager {
    static start(client) {
        client.user.setPresence({ activities: [{ name: 'with you!' }], status: 'online' });
    }
}
exports.PresenceManager = PresenceManager;
//# sourceMappingURL=PresenceManager.js.map