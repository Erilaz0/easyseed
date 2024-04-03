"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const plantsCollection = "plants";
const plantsSchema = new mongoose_1.default.Schema({
    common_name: { type: String, required: true },
    scientific_name: { type: String, required: true },
    thumbnail: [{ image: { type: String, required: true } }],
    species: { type: String, required: true },
    life_time: { type: Number, required: true },
    price: { type: Number, required: true },
    light: { type: String, required: true },
    water: { type: String, required: true },
    special_needs: { type: String, required: true },
    created_at: { type: String, required: true },
});
plantsSchema.plugin(mongoose_paginate_v2_1.default);
const plantsModel = mongoose_1.default.model(plantsCollection, plantsSchema);
module.exports = plantsModel;
