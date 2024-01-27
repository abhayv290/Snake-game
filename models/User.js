import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true},
    email_id: {type: String, required: true, unique: true},
    password: {type: String, required: true}

}, {timestamps: true})

export default mongoose.models.User || mongoose.model('User', userSchema);