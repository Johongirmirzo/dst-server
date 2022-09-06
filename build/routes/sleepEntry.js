"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validators_1 = require("../middlewares/validators");
const checkAuth_1 = require("../middlewares/checkAuth");
const SleepEntryController_1 = __importDefault(require("../controllers/SleepEntryController"));
const router = (0, express_1.Router)();
router.get("/getAllSleepEntries", checkAuth_1.checkAuth, SleepEntryController_1.default.getAllSleepEntries);
router.get("/getSleepEntry/:sleepEntryId", checkAuth_1.checkAuth, SleepEntryController_1.default.getAllSleepEntry);
router.post("/addSleepEntry", validators_1.sleepEntryValidator, checkAuth_1.checkAuth, SleepEntryController_1.default.addSleepEntry);
router.delete("/delete/:sleepEntryId", checkAuth_1.checkAuth, SleepEntryController_1.default.deleteSleepEntry);
router.put("/edit/:sleepEntryId", validators_1.sleepEntryValidator, checkAuth_1.checkAuth, SleepEntryController_1.default.editSleepEntry);
exports.default = router;
