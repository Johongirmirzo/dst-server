import mongoose from "mongoose";

export interface SleepEntryDocument extends mongoose.Document {
    sleepDate: string;
    sleepTime: string;
    wakeupTime: string;
    sleepDuration: number;
    user: string;
}

const SleepEntrySchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

export default mongoose.model<SleepEntryDocument>("SleepEntry", SleepEntrySchema);