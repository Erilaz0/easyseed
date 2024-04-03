"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlant = exports.plantValidator = void 0;
const ajv = require("ajv");
exports.plantValidator = {
    type: `object`,
    properties: {
        common_name: { type: "string" },
        scientific_name: { type: "string" },
        thumbnail: { type: "string" },
        species: { type: "string" },
        life_time: { type: "number" },
        price: { type: "number" },
        light: { type: "string" },
        water: { type: "string" },
        special_needs: { type: "string" },
        created_at: { type: "string" }
    },
    required: ['common_name', 'scientific_name', 'species', 'life_time', 'price', 'light', 'water', 'special_needs', 'created_at', 'thumbnail']
};
const ajv_validation = new ajv();
const validatePlant = ajv_validation.compile(exports.plantValidator);
exports.validatePlant = validatePlant;
