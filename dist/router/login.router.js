"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const login_1 = require("../controllers/login");
router.get("/", login_1.server_data);
router.post("/", login_1.login);
exports.default = router;
