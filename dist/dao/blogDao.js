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
exports.blogDao = void 0;
const blogModel = require("../dao/models/blog.model");
class blogDao {
    constructor() { }
    createBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.create(newBlog);
        });
    }
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.find({}).lean();
        });
    }
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.findOne({ _id: id });
        });
    }
    putBlog(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: id }, blog);
        });
    }
    deleteBlogImage(bid, mid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: bid }, { $pull: { images: { _id: mid } } });
        });
    }
    addBlogImage(bid, newUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: bid }, { $push: { images: { image: newUrl } } });
        });
    }
    addSectionImage(bid, sid, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: bid, "sections._id": sid }, { $set: { "sections.$.image": image } });
        });
    }
    updateSubtitle(bid, sid, subtitle) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: bid, "sections._id": sid }, { $set: { "sections.$.subtitle": subtitle } });
        });
    }
    updateSectionDescription(bid, sid, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: bid, "sections._id": sid }, { $set: { "sections.$.description": description } });
        });
    }
    setLikes(bid, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: bid }, { $inc: { "likes.quantity": 1 }, $push: { "likes.emails": { email: email } } });
        });
    }
    createSection(bid, section) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.updateOne({ _id: bid }, { $push: { sections: section } });
        });
    }
    deleteBlog(bid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.deleteOne({ _id: bid });
        });
    }
    blogPaginate(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogModel.paginate({}, { page: page, limit: limit, lean: true });
        });
    }
}
exports.blogDao = blogDao;
