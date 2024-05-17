"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const preference_1 = require("../controllers/preference");
utils_1.router.post("/create_preference", preference_1.createPreference);
exports.default = utils_1.router;
