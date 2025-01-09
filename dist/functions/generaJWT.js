"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const secret = process.env.secret
const generaJWT = (code) => utils_1.jwt.sign({ code }, secret, { expiresIn: "1h" });
exports.default = generaJWT;
