"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const chatCollection = "users-chat";
const chatSchema = new utils_1.mongoose.Schema({
    uid: {
        type: String, required: true
    },
    messages: [{
            message: { type: String },
            rol: { type: String },
            date: { type: String },
        }]
});
const chatModel = utils_1.mongoose.model(chatCollection, chatSchema);
exports.default = chatModel;
