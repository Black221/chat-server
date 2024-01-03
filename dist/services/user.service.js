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
const user_model_1 = require("@models/user.model");
class UserService {
    constructor(user) {
        this._id = user._id;
        this.username = user.username;
        this.password = user.password;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.UserModel.find();
        });
    }
    static getUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.UserModel.findById(_id);
        });
    }
    static getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.UserModel.findOne({ username: username });
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.UserModel.create(user);
        });
    }
    static deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.UserModel.deleteOne({ _id: user._id });
        });
    }
}
exports.default = UserService;
