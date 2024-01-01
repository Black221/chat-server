import mongoose, {Schema, Types, model} from 'mongoose';
// import muv from 'mongoose-unique-validator';

type Role = 'admin' | 'client' | 'deliverer'

interface User {
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string
}

interface Deliverer {
    id: Types.ObjectId;
}

interface Client {
    id: Types.ObjectId;
}

const UserSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true}
})

const DelivererSchema = new Schema<Deliverer>({
    id: Schema.Types.ObjectId
})

const ClientSchema = new Schema<Client>({
    id: Schema.Types.ObjectId
})

// mongoose.plugin(muv)


export const users = model<User>('users', UserSchema)
export const deliverer = model<Deliverer>('deliverer', DelivererSchema)
export const client = model<Client>('client', ClientSchema)