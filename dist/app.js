"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const preference_router_1 = __importDefault(require("./router/preference.router"));
const plants_router_1 = __importDefault(require("./router/plants.router"));
const blog_router_1 = __importDefault(require("./router/blog.router"));
const login_router_1 = __importDefault(require("./router/login.router"));
const winstone_1 = require("./middlewares/winstone");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path = require("path");
const PORT = 8080;
const app = (0, utils_1.express)();
app.use(utils_1.express.json());
app.use(utils_1.express.urlencoded({ extended: true }));
app.use(utils_1.express.static(path.join(__dirname + '/public')));
app.use((0, cookie_parser_1.default)());
app.use(winstone_1.Log);
app.use((0, cors_1.default)({
    origin: 'https://easyseed.netlify.app',
    credentials: true
}));
app.use("/blogs", blog_router_1.default);
app.use("/login", login_router_1.default);
app.use("/preferences", preference_router_1.default);
app.use("/plants", plants_router_1.default);
const serverExpress = app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
const url_mongodb = process.env.MONGO_URL || "";
utils_2.mongoose.connect(url_mongodb)
    .then(res => { console.log("Database conected"); })
    .catch(() => { console.log("error"); });
