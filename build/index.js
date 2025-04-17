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
const fs = __importStar(require("fs"));
const LogManager_1 = require("./core/LogManager");
const CoolerPony_1 = require("./core/CoolerPony");
global.data = {};
let lastSaveData = "{}";
if (fs.existsSync("./data/database.json")) {
    global.data = JSON.parse(fs.readFileSync("./data/database.json").toString());
    lastSaveData = fs.readFileSync("./data/database.json").toString();
}
setInterval(() => {
    if (lastSaveData !== JSON.stringify(global.data)) {
        fs.writeFileSync("./data/database.json", JSON.stringify(global.data));
        lastSaveData = JSON.stringify(global.data);
    }
});
if (!global.data.managedChannels) {
    global.data.managedChannels = [];
}
global.version = (fs.existsSync("./.git/refs/heads/mane") ? fs.readFileSync("./.git/refs/heads/mane").toString().trim().substring(0, 8) : (fs.existsSync("../.git/refs/heads/mane") ? fs.readFileSync("../.git/refs/heads/mane").toString().trim().substring(0, 8) : (fs.existsSync("./version.txt") ? fs.readFileSync("./version.txt").toString().trim() : (fs.existsSync("../version.txt") ? fs.readFileSync("../version.txt").toString().trim() : "live"))));
global.build = (fs.existsSync("./build.txt") ? fs.readFileSync("./build.txt").toString().trim() : (fs.existsSync("../build.txt") ? fs.readFileSync("../build.txt").toString().trim() : "dev"));
function restart() {
    if (fs.existsSync("./data/lastRestart") && new Date().getTime() - new Date(fs.readFileSync("./data/lastRestart").toString()).getTime() < 60000) {
        LogManager_1.LogManager.error("Restart cancelled: too close to another restart, try again in a few seconds.");
        fs.rmSync("./RESTART", { recursive: true });
    }
    else {
        fs.rmSync("./RESTART", { recursive: true });
        fs.writeFileSync("./data/lastRestart", new Date().toISOString());
        LogManager_1.LogManager.warn("Restart requested.");
        process.exit(14);
    }
}
async function restartManager() {
    if (fs.existsSync("./RESTART-FORCE")) {
        fs.rmSync("./RESTART-FORCE", { recursive: true });
        LogManager_1.LogManager.warn("Force restart requested.");
        process.exit(14);
    }
    if (fs.existsSync("./RESTART")) {
        restart();
    }
}
setInterval(restartManager, 500);
global.systemRoot = __dirname;
if (!fs.existsSync("data"))
    fs.mkdirSync("data");
let token = "";
if (fs.existsSync("token.txt"))
    token = fs.readFileSync("token.txt").toString().trim();
else if (fs.existsSync("../token.txt"))
    token = fs.readFileSync("../token.txt").toString().trim();
else {
    LogManager_1.LogManager.error("Cannot find token in the expected places (" + __dirname + "/token.txt or " + __dirname.split("/").splice(__dirname.split("/").length - 1, 1).join("/") + "/token.txt");
    process.exit(1);
}
LogManager_1.LogManager.verbose("Starting Discord bot...");
new CoolerPony_1.CoolerPony(token);
//# sourceMappingURL=index.js.map