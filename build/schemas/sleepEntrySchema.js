"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepEntrySchema = void 0;
const yup_1 = require("yup");
exports.sleepEntrySchema = (0, yup_1.object)({
    sleepDate: (0, yup_1.string)().required("Sleep date can't be empty"),
    sleepTime: (0, yup_1.string)().required("Sleep time can't be empty"),
    wakeupTime: (0, yup_1.string)().required("Wakeup time can't be empty")
});
