"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const winston_1 = __importDefault(require("winston"));
const commands_1 = require("../functions/commands");
let level = "p";
let ENVIROMENT = (0, commands_1.SYSTEM)();
switch (ENVIROMENT) {
    case "d":
        level = "debug";
        break;
    case "p":
        level = "info";
        break;
}
;
const logger = winston_1.default.createLogger({
    level: level,
    transports: [
        new winston_1.default.transports.Console({
            level: level,
            format: winston_1.default.format.simple()
        })
    ]
});
const Log = (req, res, next) => {
    req.logger = logger;
    next();
};
exports.Log = Log;
