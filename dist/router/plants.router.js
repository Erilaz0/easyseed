"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const plants_1 = require("../controllers/plants");
const admin_token_1 = __importDefault(require("../middlewares/admin_token"));
utils_1.router.get("/allplants", plants_1.getPlants);
utils_1.router.get("/plant/:pid", plants_1.getPlantById);
utils_1.router.post("/", admin_token_1.default, plants_1.postPlants);
utils_1.router.put("/:pid", admin_token_1.default, plants_1.putPlants);
utils_1.router.delete("/:pid", admin_token_1.default, plants_1.deletePlant);
exports.default = utils_1.router;
