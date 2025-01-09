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
exports.login = login;
exports.server_data = server_data;
const generaJWT_1 = __importDefault(require("../functions/generaJWT"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body.user;
        const username = body.username;
        const password = body.password;
        if (username && typeof username === "string" && username === "admin" && password && typeof password === "string" && password === "admin") {
            const adminCookie = "7W6e7B4zcchemj4A3evh9FhYLXzZ7CSL5v9h6664YCdAhK8W52_id";
            const secretToken = "u5Kn66S2DA9iq7Fxx2gHH2mtn6wkA22Z792QHkq6VjAb96BZvQ-kX2khMGJ5h6WeMTLN8g828j6P52ajFnH7E6fb856t3cGfz8DN-Mej7xX78D7Q7eH97iKmeaY789ReYr9T8PnJLe57SNhJd33c2ev";
            const encodedSecret = yield bcrypt_1.default.hash(secretToken, 10);
            const token = (0, generaJWT_1.default)(encodedSecret);
            const horasEnMilisegundos = 60 * 60 * 1000;
            const expirationTime = new Date(Date.now() + horasEnMilisegundos);
            res.cookie(adminCookie, token, { expires: expirationTime, httpOnly: true });
            res.status(200).json({ Authorized: "LOGGED AS ADMIN" });
        }
        else {
            res.status(401).json({ Unauthorized: "This credentials dont match with our records" });
        }
    });
}
function server_data(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).send("yes");
    });
}
