"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const login_1 = require("../controllers/login");
router.get("/", login_1.server_data);
router.post("/", login_1.login);
