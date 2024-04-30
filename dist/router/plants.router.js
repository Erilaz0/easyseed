"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const utils_1 = require("../utils");
Object.defineProperty(exports, "router", { enumerable: true, get: function () { return utils_1.router; } });
const plants_1 = require("../controllers/plants");
const admin_token_1 = __importDefault(require("../middlewares/admin_token"));
utils_1.router.get("/plants", plants_1.getPlants);
utils_1.router.get("/plants/:pid", plants_1.getPlantById);
utils_1.router.post("/plants", admin_token_1.default, plants_1.postPlants);
utils_1.router.put("/plants/:pid", admin_token_1.default, plants_1.putPlants);
utils_1.router.delete("/plants/:pid", admin_token_1.default, plants_1.deletePlant);
