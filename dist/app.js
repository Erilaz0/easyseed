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
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path = require("path");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "api abm products",
            version: "1.0.0",
            description: "documentacion del proyecto api abm products"
        }
    },
    apis: ["./*.yaml"]
};
const specs = (0, swagger_jsdoc_1.default)(options);
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
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
const serverExpress = app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
utils_2.mongoose.connect("mongodb+srv://pandemonio278:urSUGuba7ana4gh3@cow.s8nlm84.mongodb.net")
    .then(res => { console.log("Database conected"); })
    .catch(() => { console.log("error"); });
