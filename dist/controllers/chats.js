"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatByUid = exports.getChats = void 0;
const chat_services_1 = __importDefault(require("../services/chat.services"));
function getChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("chat");
        console.log(req.originalUrl);
        const getChats = yield chat_services_1.default.getChats();
        if (!getChats) {
            res.status(400).json({ error: "Cannot get chats" });
        }
        else {
            res.status(200).send(getChats);
        }
    });
}
exports.getChats = getChats;
function ChatByUid(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.params.uid;
        const getChats = yield chat_services_1.default.getChatByUID(uid);
        if (!getChats) {
            res.status(400).json({ error: "Cannot get chats" });
        }
        else {
            res.status(200).send(getChats);
        }
    });
}
exports.ChatByUid = ChatByUid;
