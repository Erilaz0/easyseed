"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const chats_1 = require("../controllers/chats");
console.log("chats router");
utils_1.router.get("/allchats", chats_1.getChats);
utils_1.router.get("/chat/:uid", chats_1.ChatByUid);
exports.default = utils_1.router;
