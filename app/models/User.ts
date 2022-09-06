import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    _id: string;
    id: string;
    username: string;
    email: string;
    password: string;
    authProvider?: string;
}

const UserSchema = new mongoose.Schema({
    id: String,
    authProvider: String,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model<UserDocument>("User", UserSchema)