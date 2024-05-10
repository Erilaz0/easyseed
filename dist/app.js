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
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const chat_router_1 = __importDefault(require("./router/chat.router"));
const plants_router_1 = __importDefault(require("./router/plants.router"));
const blog_router_1 = __importDefault(require("./router/blog.router"));
const login_router_1 = __importDefault(require("./router/login.router"));
const winstone_1 = require("./middlewares/winstone");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const chat_services_1 = __importDefault(require("./services/chat.services"));
const path = require("path");
const PORT = 8080;
const app = (0, utils_1.express)();
app.use(utils_1.express.json());
app.use(utils_1.express.urlencoded({ extended: true }));
app.use(utils_1.express.static(path.join(__dirname + '/public')));
app.use((0, cookie_parser_1.default)());
app.use(winstone_1.Log);
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use("/blogs", blog_router_1.default);
app.use("/login", login_router_1.default);
app.use("/chats", chat_router_1.default);
app.use("/plants", plants_router_1.default);
const serverExpress = app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
utils_2.mongoose.connect("mongodb+srv://pandemonio278:urSUGuba7ana4gh3@cow.s8nlm84.mongodb.net")
    .then(res => { console.log("Database conected"); })
    .catch(() => { console.log("error"); });
const serverSocket = new socket_io_1.Server(serverExpress, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});
serverSocket.on("connection", sock => {
    sock.on("client_message", (message_data) => __awaiter(void 0, void 0, void 0, function* () {
        const messagesData = message_data.data;
        const date = new Date().toISOString();
        let rol = messagesData.rol;
        const message = messagesData.message;
        const uid = message_data.uid;
        if (uid) {
            const findChat = yield chat_services_1.default.getChatByUID(uid);
            if (findChat && findChat.length > 0) {
                const addMessage = yield chat_services_1.default.addMessage(uid, message, rol, date);
                if (!addMessage) {
                    console.log("cannot add message");
                }
                else {
                    const send_new_message = { uid: uid, messages: { message: message, rol: rol, date: date } };
                    sock.emit("addNewMessage", send_new_message);
                    console.log("una vesss");
                    serverSocket.emit("admin_message", send_new_message);
                    console.log("mesnaje añadido a chat existente");
                }
            }
            else {
                const newChat = yield chat_services_1.default.createChat(uid, message, rol, date);
                if (!newChat) {
                    console.log("cannot create chat");
                }
                else {
                    console.log("chat created");
                }
            }
        }
        else {
            console.log("no uid socket");
        }
    }));
    sock.on("admin_response", (response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("una ves");
        const messagesData = response.data;
        const date = new Date().toISOString();
        let rol = messagesData.rol;
        const message = messagesData.message;
        const uid = response.uid;
        if (uid) {
            const findChat = yield chat_services_1.default.getChatByUID(uid);
            if (findChat) {
                const addMessage = yield chat_services_1.default.addMessage(uid, message, rol, date);
                if (addMessage) {
                    const send_new_message = { uid: uid, messages: { message: message, rol: rol, date: date } };
                    serverSocket.emit("admin_message", send_new_message);
                }
            }
        }
    }));
});
