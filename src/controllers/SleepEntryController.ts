import {Router, Request, Response, NextFunction} from "express";
import SleepEntry from "../models/SleepEntry";
import {getFormattedSleepDuration} from "../utils/formatSleepDuration";
 
const router = Router();

const SleepEntryController = {
    getAllSleepEntries: async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.user, req.userData, "Get All Sleep Entries")
        if(req.user.username === req.userData.username){
            const entries = await SleepEntry.find({user: req.userData.id});
            res.status(200).json(entries);
        } else {
            res.status(403).json({message: "You are unauthorized to get these entries"})
        }
        console.log(req.user, req.userData)
    },
    getAllSleepEntry: async (req: Request, res: Response, next: NextFunction)=>{
        if(req.user.username === req.userData.username){
            const entries = await SleepEntry.findById(req.params.sleepEntryId);
            res.status(200).json(entries);
        } else {
            res.status(403).json({message: "You are unauthorized to get this entry"})
        }
    },
    addSleepEntry: async (req: Request, res: Response, next: NextFunction)=>{
        const {sleepDate, sleepTime, wakeupTime} = req.body;
        const sleepTimHour = Number(sleepTime.slice(0, 2));
        const wakeupTimeHour = Number(wakeupTime.slice(0, 2));
        const sleepTimeMinutes = Number(sleepTime.slice(3));
        const wakeupTimeMinutes = Number(wakeupTime.slice(3));
    
        const sleepDuration = getFormattedSleepDuration(sleepTimHour, sleepTimeMinutes, wakeupTimeHour, wakeupTimeMinutes);
        
        if(req.user.username === req.userData.username){
            const newSleepEntry = await SleepEntry.create({sleepDate, sleepTime, wakeupTime, sleepDuration, user: req.userData.id});
            return res.status(201).json(newSleepEntry);
        } else {
            res.status(403).json({message: "You are unauthorized to create this entry"});
        }
    },
    editSleepEntry: async (req: Request, res: Response, next: NextFunction)=>{
        const {sleepDate, sleepTime, wakeupTime} = req.body;
        const sleepTimHour = Number(sleepTime.slice(0, 2));
        const wakeupTimeHour = Number(wakeupTime.slice(0, 2));
        const sleepTimeMinutes = Number(sleepTime.slice(3));
        const wakeupTimeMinutes = Number(wakeupTime.slice(3));
    
        console.log({sleepDate, sleepTime, wakeupTime, id: req.params.sleepEntryId})
    
        const sleepDuration = getFormattedSleepDuration(sleepTimHour, sleepTimeMinutes, wakeupTimeHour, wakeupTimeMinutes);
        
        if(req.user.username === req.userData.username){
            const editedSleepEntry = await SleepEntry.findByIdAndUpdate(req.params.sleepEntryId, {$set: {sleepDate, sleepTime, wakeupTime, sleepDuration}}, {new: true});
            res.status(200).json(editedSleepEntry);
        } else {
            res.status(403).json({message: "You are unauthorized to edit this entry"});
        }
    },
    deleteSleepEntry: async (req: Request, res: Response, next: NextFunction)=>{
        const sleepEntry = await SleepEntry.findById({_id: req.params.sleepEntryId});
        if(req.user.username === req.userData.username){
            await SleepEntry.findByIdAndRemove(req.params.sleepEntryId);
            res.status(200).json({message: "Data is deleted successfully"})
        } else {
            res.status(403).json({message: "You are unauthorized to delete this entry"});
        }
    }
}

export default SleepEntryController