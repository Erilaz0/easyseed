"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const plants_router_1 = require("./router/plants.router");
const blog_router_1 = require("./router/blog.router");
const winstone_1 = require("./middlewares/winstone");
const path = require("path");
const PORT = 8080;
const app = (0, utils_1.express)();
app.use(utils_1.express.json());
app.use(utils_1.express.urlencoded({ extended: true }));
app.use(utils_1.express.static(path.join(__dirname + '/public')));
app.use(winstone_1.Log);
app.use((0, cors_1.default)());
app.use("/home", plants_router_1.router);
app.use("/blog", blog_router_1.router);
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
utils_2.mongoose.connect("mongodb+srv://pandemonio278:urSUGuba7ana4gh3@cow.s8nlm84.mongodb.net")
    .then(res => { console.log("Database conected"); })
    .catch(() => { console.log("error"); });
