import {defaultMaxListeners} from "events";
import mongoose from "mongoose";
import {Schema} from "mongoose";

const data = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    username: {type: String},

    score: {
        type: String, required: true
    }
}, {timestamps: true})




export default mongoose.models.gameData || mongoose.model('gameData', data);