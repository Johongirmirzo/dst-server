"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SleepEntrySchema = new mongoose_1.default.Schema({
    sleepDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    sleepTime: {
        type: String,
        required: true,
    },
    wakeupTime: {
        type: String,
        required: true,
    },
    sleepDuration: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user"
    }
});
exports.default = mongoose_1.default.model("SleepEntry", SleepEntrySchema);
