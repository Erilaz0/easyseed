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
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
function adminVerify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminCookieName = process.env.adminCookie || "";
        const adminCookie = req.cookies[adminCookieName];
        const secret = process.env.secret || "";
        const log = req.logger;
        log.debug("Starting token validation..");
        log.debug(adminCookie);
        utils_1.jwt.verify(adminCookie, secret, (error, credentials) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                log.debug("\u2716  Invalid token");
                res.status(400).json({ error: "Invalid token" });
            }
            else {
                log.debug("\u2714  Token validated, starting second validation...");
                const secretToken = process.env.secretToken || "";
                const verifyCredentials = yield bcrypt_1.default.compare(secretToken, credentials.code);
                if (verifyCredentials === true) {
                    log.debug("\u2714  All credentials match , ending hash validation...");
                    next();
                }
                else {
                    log.debug("\u2716  Cant validate hash");
                    res.status(400).json({ error: "Invalid key" });
                }
            }
        }));
    });
}
exports.default = adminVerify;
