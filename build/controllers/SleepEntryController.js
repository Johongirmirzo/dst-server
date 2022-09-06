"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SleepEntry_1 = __importDefault(require("../models/SleepEntry"));
const formatSleepDuration_1 = require("../utils/formatSleepDuration");
const router = (0, express_1.Router)();
const SleepEntryController = {
    getAllSleepEntries: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.user, req.userData, "Get All Sleep Entries");
        if (req.user.username === req.userData.username) {
            const entries = yield SleepEntry_1.default.find({ user: req.userData.id });
            res.status(200).json(entries);
        }
        else {
            res.status(403).json({ message: "You are unauthorized to get these entries" });
        }
        console.log(req.user, req.userData);
    }),
    getAllSleepEntry: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user.username === req.userData.username) {
            const entries = yield SleepEntry_1.default.findById(req.params.sleepEntryId);
            res.status(200).json(entries);
        }
        else {
            res.status(403).json({ message: "You are unauthorized to get this entry" });
        }
    }),
    addSleepEntry: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { sleepDate, sleepTime, wakeupTime } = req.body;
        const sleepTimHour = Number(sleepTime.slice(0, 2));
        const wakeupTimeHour = Number(wakeupTime.slice(0, 2));
        const sleepTimeMinutes = Number(sleepTime.slice(3));
        const wakeupTimeMinutes = Number(wakeupTime.slice(3));
        const sleepDuration = (0, formatSleepDuration_1.getFormattedSleepDuration)(sleepTimHour, sleepTimeMinutes, wakeupTimeHour, wakeupTimeMinutes);
        if (req.user.username === req.userData.username) {
            const newSleepEntry = yield SleepEntry_1.default.create({ sleepDate, sleepTime, wakeupTime, sleepDuration, user: req.userData.id });
            return res.status(201).json(newSleepEntry);
        }
        else {
            res.status(403).json({ message: "You are unauthorized to create this entry" });
        }
    }),
    editSleepEntry: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { sleepDate, sleepTime, wakeupTime } = req.body;
        const sleepTimHour = Number(sleepTime.slice(0, 2));
        const wakeupTimeHour = Number(wakeupTime.slice(0, 2));
        const sleepTimeMinutes = Number(sleepTime.slice(3));
        const wakeupTimeMinutes = Number(wakeupTime.slice(3));
        console.log({ sleepDate, sleepTime, wakeupTime, id: req.params.sleepEntryId });
        const sleepDuration = (0, formatSleepDuration_1.getFormattedSleepDuration)(sleepTimHour, sleepTimeMinutes, wakeupTimeHour, wakeupTimeMinutes);
        if (req.user.username === req.userData.username) {
            const editedSleepEntry = yield SleepEntry_1.default.findByIdAndUpdate(req.params.sleepEntryId, { $set: { sleepDate, sleepTime, wakeupTime, sleepDuration } }, { new: true });
            res.status(200).json(editedSleepEntry);
        }
        else {
            res.status(403).json({ message: "You are unauthorized to edit this entry" });
        }
    }),
    deleteSleepEntry: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const sleepEntry = yield SleepEntry_1.default.findById({ _id: req.params.sleepEntryId });
        if (req.user.username === req.userData.username) {
            yield SleepEntry_1.default.findByIdAndRemove(req.params.sleepEntryId);
            res.status(200).json({ message: "Data is deleted successfully" });
        }
        else {
            res.status(403).json({ message: "You are unauthorized to delete this entry" });
        }
    })
};
exports.default = SleepEntryController;
