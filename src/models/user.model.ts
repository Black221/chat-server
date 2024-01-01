import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';


export interface User {
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    phoneNumber: string;
    permissions?: string[];
}

const userSchema = new Schema<User>({
    firstName: {
        type: String,
        required: [true, 'Please enter a first name'],
        lowercase: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    role: {
        type: String,
        required: [true, 'Please enter a role'],
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter a phone number'],
        unique: true,
        lowercase: true,
    },
    permissions: [{
        type: String,
        required: [true, 'Please enter a permission'],
        lowercase: true,
    }]
}, { timestamps: true });


// play function before save into DB
userSchema.pre("save", async function (next)  {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect email or password');
    }
    throw Error('incorrect email or password');
};

export const UserModel = model<User>("User", userSchema);
