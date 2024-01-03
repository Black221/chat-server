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
const message_model_1 = require("@models/message.model");
class MessageService {
    constructor(message) {
        this._id = message._id;
        this.text = message.text;
        this.reply_to = message.reply_to;
        this.date = message.date;
        this.sender = message.sender;
        this.receiver = message.receiver;
    }
    static getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return message_model_1.MessageModel.find();
        });
    }
    static getMessage(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return message_model_1.MessageModel.findById(_id).populate('sender').populate('receiver').populate('reply_to');
        });
    }
    static getDiscussionMessages(receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            return message_model_1.MessageModel.find({ receiver: receiver }).populate('sender').populate('reply_to');
        });
    }
    static getLatestMessage(receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            return message_model_1.MessageModel.find({ receiver: receiver }).populate('sender').populate('reply_to').sort({ date: -1 }).limit(1);
        });
    }
    static createMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return message_model_1.MessageModel.create(message);
        });
    }
    static deleteMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message_model_1.MessageModel.deleteOne({ _id: message._id });
        });
    }
}
exports.default = MessageService;
