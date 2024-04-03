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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const blogDao_1 = require("../dao/blogDao");
class blogService {
    constructor(dao) {
        this.dao = dao;
    }
    createBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.createBlog(newBlog);
        });
    }
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.getBlogs();
        });
    }
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.getBlogById(id);
        });
    }
    putBlog(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.putBlog(id, blog);
        });
    }
    deleteBlogImage(bid, mid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.deleteBlogImage(bid, mid);
        });
    }
    addBlogImage(bid, newUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.addBlogImage(bid, newUrl);
        });
    }
    addSectionImage(bid, sid, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.addSectionImage(bid, sid, image);
        });
    }
    updateSubtitle(bid, sid, subtitle) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.updateSubtitle(bid, sid, subtitle);
        });
    }
    updateSectionDescription(bid, sid, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.updateSectionDescription(bid, sid, description);
        });
    }
    createSection(bid, section) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.createSection(bid, section);
        });
    }
    deleteBlog(bid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.deleteBlog(bid);
        });
    }
    paginateBlog(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.blogPaginate(page, limit);
        });
    }
}
const daoBlog = new blogDao_1.blogDao();
const blogServices = new blogService(daoBlog);
exports.blogServices = blogServices;
