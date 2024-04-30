"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const secret = "32bSg3H73R7antXUpVs234-i43p43arF6BG9F69bPvaf94gRuTdN8uFvhvM9ZS9jYD5P96Xu8";
const generaJWT = (code) => utils_1.jwt.sign({ code }, secret, { expiresIn: "1h" });
exports.default = generaJWT;
