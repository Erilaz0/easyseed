"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const blog_1 = require("../controllers/blog");
const admin_token_1 = __importDefault(require("../middlewares/admin_token"));
utils_1.router.get("/allblogs", blog_1.getBlogs);
utils_1.router.get("/blog/:bid", blog_1.getBlogById);
utils_1.router.put("/blog/update/:bid", admin_token_1.default, blog_1.putBlog);
utils_1.router.put("/:bid/image/:mid", admin_token_1.default, blog_1.deleteBlogImage);
utils_1.router.put("/addimage/:bid", admin_token_1.default, blog_1.addBlogImage);
utils_1.router.put("/:bid/section/:sid", admin_token_1.default, blog_1.updateSection);
utils_1.router.put("/:bid/createsection/", admin_token_1.default, blog_1.addSection);
utils_1.router.put("/:bid/setlikes/", blog_1.setLikesEmail);
utils_1.router.post("/", admin_token_1.default, blog_1.postBlog);
utils_1.router.delete("/:bid", admin_token_1.default, blog_1.deleteBlog);
exports.default = utils_1.router;
