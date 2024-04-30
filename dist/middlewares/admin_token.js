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
        const adminCookie = req.cookies["7W6e7B4zcchemj4A3evh9FhYLXzZ7CSL5v9h6664YCdAhK8W52_id"];
        const secret = "32bSg3H73R7antXUpVs234-i43p43arF6BG9F69bPvaf94gRuTdN8uFvhvM9ZS9jYD5P96Xu8";
        const log = req.logger;
        log.debug("Starting token validation..");
        utils_1.jwt.verify(adminCookie, secret, (error, credentials) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                log.debug("\u2716  Invalid token");
                res.status(400).json({ error: "Invalid token" });
            }
            else {
                log.debug("\u2714  Token validated, starting second validation...");
                const key = "u5Kn66S2DA9iq7Fxx2gHH2mtn6wkA22Z792QHkq6VjAb96BZvQ-kX2khMGJ5h6WeMTLN8g828j6P52ajFnH7E6fb856t3cGfz8DN-Mej7xX78D7Q7eH97iKmeaY789ReYr9T8PnJLe57SNhJd33c2ev";
                const verifyCredentials = yield bcrypt_1.default.compare(key, credentials.code);
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
