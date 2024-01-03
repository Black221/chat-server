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
const discussion_model_1 = require("@models/discussion.model");
const Message_service_1 = __importDefault(require("@services/Message.service"));
class DiscussionService {
    constructor(discussion) {
        this.users = [];
        this._id = discussion._id;
        this.users = discussion.users;
        this.created_by = discussion.created_by;
        this.img = discussion.img;
        this.name = discussion.name;
    }
    static getDiscussions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_model_1.DiscussionModel.find({ users: user });
        });
    }
    static getDiscussion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_model_1.DiscussionModel.findById(id);
        });
    }
    static getDiscussionMembers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_model_1.DiscussionModel.findById(id).populate('users');
        });
    }
    static getDiscussionMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Message_service_1.default.getDiscussionMessages(id);
        });
    }
    static createDiscussion(discussion) {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_model_1.DiscussionModel.create(discussion);
        });
    }
    static addUser(discussion, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_model_1.DiscussionModel.findByIdAndUpdate(discussion._id, { $push: { users: user } }, { new: true });
        });
    }
    static removeUser(discussion, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return discussion_model_1.DiscussionModel.findByIdAndUpdate(discussion._id, { $pull: { users: user } }, { new: true });
        });
    }
    static deleteDiscussion(discussion) {
        return __awaiter(this, void 0, void 0, function* () {
            yield discussion_model_1.DiscussionModel.deleteOne({ _id: discussion._id });
        });
    }
}
exports.default = DiscussionService;
