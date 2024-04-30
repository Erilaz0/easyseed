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
exports.setLikesEmail = exports.deleteBlog = exports.deleteBlogImage = exports.addSection = exports.updateSection = exports.addBlogImage = exports.putBlog = exports.postBlog = exports.getBlogById = exports.getBlogs = void 0;
const utils_1 = require("../utils");
const blog_services_1 = require("../services/blog.services");
const Validator_1 = require("../validators/Validator");
const send_1 = __importDefault(require("../mailing/send"));
function getBlogs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        if (page && typeof page === "number" || limit && typeof limit === "number") {
            const log = req.logger;
            const blogs = yield blog_services_1.blogServices.paginateBlog(page, limit);
            if (!blogs) {
                log.debug("Error trying to get blogs - blog.ts");
                res.status(400).json({ error: "Cannot get blogs" });
            }
            else {
                log.debug("Getting Blogs - blog.ts");
                res.status(200).send(blogs);
            }
        }
        else {
            const log = req.logger;
            const blogs = yield blog_services_1.blogServices.getBlogs();
            if (!blogs) {
                log.debug("Error trying to get blogs - blog.ts");
                res.status(400).json({ error: "Cannot get blogs" });
            }
            else {
                log.debug("Getting Blogs - blog.ts");
                res.status(200).send(blogs);
            }
        }
    });
}
exports.getBlogs = getBlogs;
function getBlogById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const id = req.params.bid;
        if (!id || !utils_1.mongoose.Types.ObjectId.isValid(id)) {
            log.debug("Not valid bid");
            res.status(400).json({ error: "Not valid bid" });
        }
        else {
            log.debug("Starting blog validation");
            const blogById = yield blog_services_1.blogServices.getBlogById(id);
            const validate = (0, Validator_1.validateBlog)(blogById);
            if (!blogById || validate === false) {
                log.debug("Blog validation failed");
                res.status(400).json({ error: `Blog with BID: ${id} not founded or invalid data` });
            }
            else {
                log.debug("Valid data blog");
                log.debug("Sending");
                res.status(200).send([blogById]);
            }
        }
    });
}
exports.getBlogById = getBlogById;
function putBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const id = req.params.bid;
        const { blog } = req.body;
        console.log(blog);
        if (!id || !utils_1.mongoose.Types.ObjectId.isValid(id)) {
            log.debug("Not valid BID");
            res.status(400).json({ error: "Not valid BID" });
        }
        else {
            const updateBlog = yield blog_services_1.blogServices.putBlog(id, blog);
            if (!updateBlog) {
                log.debug("Cannot update blog");
                res.status(400).json({ error: "no updated" });
            }
            else {
                console.log(updateBlog);
                log.debug("Blog updated");
                res.status(200).json({ message: "updated" });
            }
        }
    });
}
exports.putBlog = putBlog;
function deleteBlogImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const bid = req.params.bid;
        const mid = req.params.mid;
        if (!utils_1.mongoose.Types.ObjectId.isValid(bid) || !utils_1.mongoose.Types.ObjectId.isValid(mid)) {
            log.debug("Not valid BID or MID");
            res.status(400).json({ error: "Not valid BID or MID " });
        }
        else {
            const deleteBlogImage = yield blog_services_1.blogServices.deleteBlogImage(bid, mid);
            if (!deleteBlogImage) {
                log.debug("Cannot delete image");
                res.status(400).json({ error: "Cannot delete Image" });
            }
            else {
                log.debug("Image deleted");
                res.status(200).json({ message: "Deleted" });
            }
        }
    });
}
exports.deleteBlogImage = deleteBlogImage;
function addBlogImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const bid = req.params.bid;
        const { newUrl } = req.body;
        if (!utils_1.mongoose.Types.ObjectId.isValid(bid) || !newUrl || typeof newUrl != "string") {
            log.debug("Not valid BID or invalid object");
            res.status(400).json({ error: "Not valid BID or invalid object" });
        }
        else {
            const addBlogImage = yield blog_services_1.blogServices.addBlogImage(bid, newUrl);
            if (!addBlogImage) {
                log.debug("Cant add Image");
                res.status(400).json({ error: "Cant add Image" });
            }
            else {
                log.debug("New image added");
                res.status(200).json({ message: "New image added" });
            }
        }
    });
}
exports.addBlogImage = addBlogImage;
function postBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const { title, description, images, sections } = req.body;
        if (!title || !description || !images || !sections || sections.length === 0 || !sections[0].subtitle || !sections[0].description) {
            log.debug("Complete all required fields");
            res.status(400).json({ error: "Complete all required fields" });
        }
        else {
            const newBlog = { title, description, images, sections };
            const validation = (0, Validator_1.validateBlog)(newBlog);
            log.debug("Starting new blog validation...");
            if (validation === true) {
                let date = new Date();
                const blog = { title, description, images, sections, date };
                const createBlog = yield blog_services_1.blogServices.createBlog(blog);
                if (createBlog) {
                    log.debug("Blog data validated ,the blog was created");
                    res.status(200).json({ message: "The blog has been created properly" });
                }
                else {
                    log.debug("Cannot create blog - blog.ts");
                    res.status(400).json({ error: "Cannot create blog - Internal Error" });
                }
            }
            else {
                log.debug("Failed to validate blog data");
                res.status(400).json({ error: "Fail to validate blog data" });
            }
        }
    });
}
exports.postBlog = postBlog;
function updateSection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const bid = req.params.bid;
        const sid = req.params.sid;
        const { section } = req.body;
        if (!utils_1.mongoose.Types.ObjectId.isValid(bid) || !utils_1.mongoose.Types.ObjectId.isValid(sid) || !section || typeof section != "object") {
            log.debug("Not valid BID , SID or Object");
            res.status(400).json({ error: "Not valid BID , SID or object" });
        }
        else {
            if (section.subtitle) {
                log.debug("Starting subtitles update");
                const updateSubtitle = yield blog_services_1.blogServices.updateSubtitle(bid, sid, section.subtitle);
                if (!updateSubtitle) {
                    log.debug("Cannot update subtitle");
                    res.status(400).json({ error: "Cannot update section subtitle" });
                }
                else {
                    log.debug("Updated");
                    res.status(200).json({ message: "Updated" });
                }
            }
            else if (section.description) {
                log.debug("Starting description update");
                const updateSectionDescription = yield blog_services_1.blogServices.updateSectionDescription(bid, sid, section.description);
                if (!updateSectionDescription) {
                    log.debug("Cannot update section description");
                    res.status(400).json({ error: "Cannot update section description" });
                }
                else {
                    log.debug("Updated");
                    res.status(200).json({ message: "Updated" });
                }
            }
            else if (section.image) {
                let image = section.image;
                const addImage = yield blog_services_1.blogServices.addSectionImage(bid, sid, image);
                if (!addImage) {
                    log.debug("Cannot add image on this section");
                    res.status(400).json({ error: "Cannot add image on this section" });
                }
                else {
                    log.debug("Image added");
                    res.status(200).json({ message: "Image added" });
                }
            }
            else {
                log.debug("Not valid section properties");
                res.status(400).json({ error: "Not valid section properties" });
            }
        }
    });
}
exports.updateSection = updateSection;
function setLikesEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const { data } = req.body;
        const bid = req.params.bid;
        const setEmail = data.email;
        if (!utils_1.mongoose.Types.ObjectId.isValid(bid)) {
            res.status(400).json({ error: "Not valid BID" });
        }
        else {
            const getBlog = yield blog_services_1.blogServices.getBlogById(bid);
            if (!getBlog) {
                res.status(400).json({ error: `Cnnot find blog by id ${bid}` });
            }
            else {
                const verifyEmials = getBlog.likes.emails.find((email) => email.email === setEmail);
                if (verifyEmials) {
                    res.status(400).json({ error: `This email already exists` });
                }
                else {
                    const likesUpload = yield blog_services_1.blogServices.setLikes(bid, setEmail);
                    if (likesUpload) {
                        (0, send_1.default)(setEmail)
                            .then((data) => log.debug(data))
                            .catch((error) => log.debug(error));
                        res.status(200).json({ message: "success" });
                    }
                    else if (!likesUpload) {
                        res.status(400).json({ message: "error, cannot upload" });
                    }
                    else {
                        res.status(400).json({ message: "error, cannot upload" });
                    }
                }
            }
        }
    });
}
exports.setLikesEmail = setLikesEmail;
function addSection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const bid = req.params.bid;
        const { section } = req.body;
        if (!utils_1.mongoose.Types.ObjectId.isValid(bid) || !section || typeof section != "object") {
            log.debug("Not valid BID or Object");
            res.status(400).json({ error: "Not valid BID or Object" });
        }
        else {
            const createSection = yield blog_services_1.blogServices.createSection(bid, section);
            log.debug(`Creating new section: ${section}`);
            if (!createSection) {
                log.debug("Cannot create section");
                res.status(400).json({ error: "Cannot create section" });
            }
            else {
                log.debug("Section created");
                res.status(200).json({ message: "Updated" });
            }
        }
    });
}
exports.addSection = addSection;
function deleteBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const bid = req.params.bid;
        if (!utils_1.mongoose.Types.ObjectId.isValid(bid) || !bid) {
            log.debug("Invalid BID");
            res.status(400).json({ error: "Invalid BID" });
        }
        else {
            log.debug(`Deleting blog`);
            const deleteBlog = yield blog_services_1.blogServices.deleteBlog(bid);
            if (!deleteBlog) {
                log.debug(`Blog with ID: ${bid} cannot be deleted`);
                res.status(400).json({ error: `Blog with ID:${bid} cannot be deleted` });
            }
            else {
                log.debug(`Blog with ID : ${bid} has been deleted`);
                res.status(200).json({ message: `Blog with ID : ${bid} has been deleted` });
            }
        }
    });
}
exports.deleteBlog = deleteBlog;
