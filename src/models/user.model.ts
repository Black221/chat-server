import mongoose, { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { Notebook } from './notebook.model';
import jwt from 'jsonwebtoken';

export interface Role {
    name: string;
    description: string;
    permissions: Permission[];
}

export interface Permission {
    name: string;
    description: string;
}

export interface User {
    _id: Schema.Types.ObjectId | mongoose.Types.ObjectId | string;
    username: string;
    password: string;
    role?: string;
    phoneNumber?: string;
    notebooks?: Notebook[];
}

interface IUserModel extends Model<User> {
    login: (username: string, password: string) => Promise<User>;
    generateToken: (_id: Schema.Types.ObjectId | mongoose.Types.ObjectId | string) => Promise<string>;
    updatePassword: (user: User, password: string) => Promise<void>;
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, 'Please enter a first name'],
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    phoneNumber: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    notebooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Notebook',
    }],
}, { timestamps: true });


// play function before save into DB
userSchema.pre("save", async function (next)  {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.static("login", async function (username: string, password: string): Promise<User> {
    const user = await UserModel.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect username or password');
    }
    throw Error('incorrect username or password');
})

userSchema.static("updatePassword", async function (user: User, password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(password, salt);
    await UserModel.updateOne({ _id: user._id }, { password: newPassword });
})

userSchema.static("generateToken", async function (_id: Schema.Types.ObjectId | mongoose.Types.ObjectId | string): Promise<string> {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET as string);
    return token;
})


export const UserModel = mongoose.model<User, IUserModel>("User", userSchema);
