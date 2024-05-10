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
const chat_model_1 = __importDefault(require("./chat.model"));
class ChatDao {
    constructor() { }
    createChat(uid, message, date, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const newChat = { uid: uid, messages: [{ message: message, date: date, rol: rol }] };
            return yield chat_model_1.default.create(newChat);
        });
    }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.find({}).lean();
        });
    }
    getChatByUID(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.find({ uid: uid });
        });
    }
    addMessage(uid, message, rol, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_model_1.default.updateOne({ uid: uid }, { $push: { messages: [{ message: message, rol: rol, date: date }] } });
        });
    }
}
exports.default = ChatDao;
