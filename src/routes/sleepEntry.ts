import {Router, Request, Response, NextFunction} from "express";
import {sleepEntryValidator} from "../middlewares/validators";
import {checkAuth} from "../middlewares/checkAuth";
import SleepEntryController from "../controllers/SleepEntryController";

const router = Router();
 
router.get("/getAllSleepEntries", checkAuth, SleepEntryController.getAllSleepEntries)
router.get("/getSleepEntry/:sleepEntryId", checkAuth, SleepEntryController.getAllSleepEntry)
router.post("/addSleepEntry", sleepEntryValidator, checkAuth, SleepEntryController.addSleepEntry)
router.delete("/delete/:sleepEntryId", checkAuth, SleepEntryController.deleteSleepEntry)
router.put("/edit/:sleepEntryId", sleepEntryValidator, checkAuth,  SleepEntryController.editSleepEntry)

export default router;