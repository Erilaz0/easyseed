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
            const adminCookie = process.env.adminCookie;
            const secretToken = process.env.secretToken;
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
