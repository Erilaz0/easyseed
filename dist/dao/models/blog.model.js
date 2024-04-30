"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const blogCollection = "blog";
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    images: [{ image: { type: String, required: true } }],
    description: { type: String, required: true },
    sections: [{ subtitle: { type: String, required: true }, description: { type: String, required: true }, image: { type: String, default: "none" } }],
    likes: { quantity: { type: Number }, emails: [{ email: { type: String } }] },
    published: { type: Boolean, default: true },
    date: { type: String, required: true }
});
blogSchema.plugin(mongoose_paginate_v2_1.default);
const blogModel = utils_1.mongoose.model(blogCollection, blogSchema);
module.exports = blogModel;
