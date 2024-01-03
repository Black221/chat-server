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
const discussion_service_1 = __importDefault(require("@services/discussion.service"));
const user_service_1 = __importDefault(require("@services/user.service"));
const mongoose_1 = require("mongoose");
class DiscussionController {
    static getDiscussions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const user = yield user_service_1.default.getUser(userId);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }
                const discussions = yield discussion_service_1.default.getDiscussions(user);
                res.status(200).json(discussions);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static getDiscussion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const _id = new mongoose_1.Schema.ObjectId(id);
                const discussion = yield discussion_service_1.default.getDiscussion(_id);
                if (!discussion) {
                    res.status(404).json({ error: 'Discussion not found' });
                    return;
                }
                res.status(200).json(discussion);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static getDiscussionMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                const _id = new mongoose_1.Schema.ObjectId(id);
                const discussion = yield discussion_service_1.default.getDiscussionMembers(_id);
                if (!discussion) {
                    res.status(404).json({ error: 'Discussion not found' });
                    return;
                }
                res.status(200).json(discussion);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static getDiscussionMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                const _id = new mongoose_1.Schema.ObjectId(id);
                const messages = yield discussion_service_1.default.getDiscussionMessages(_id);
                res.status(200).json(messages);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static createDiscussion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discussionDTO = {
                    name: req.body.name,
                    img: req.body.img,
                    created_by: req.body.created_by,
                    users: req.body.users,
                };
                const discussion = yield discussion_service_1.default.createDiscussion(discussionDTO);
                res.status(200).json(discussion);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discussion = yield discussion_service_1.default.addUser(req.body.discussion, req.body.user);
                res.status(200).json(discussion);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discussion = yield discussion_service_1.default.removeUser(req.body.discussion, req.body.user);
                res.status(200).json(discussion);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = DiscussionController;
