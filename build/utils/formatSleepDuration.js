"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedSleepDuration = void 0;
const padZero = (val) => {
    return val.toString().padStart(2, "0");
};
const calculate = (minutes) => {
    const sleepDurationInHour = Math.floor(minutes / 60);
    const sleepDurationInMinutes = padZero(minutes % 60);
    return `${sleepDurationInHour}:${sleepDurationInMinutes} HRS`;
};
const getFormattedSleepDuration = (sleepTimeHour, sleepTimeMinutes, wakeupTimeHour, wakeupTimeMinutes) => {
    if (wakeupTimeHour > sleepTimeHour) {
        const hourToMinutes = (wakeupTimeHour - sleepTimeHour) * 60;
        if (wakeupTimeMinutes >= sleepTimeMinutes) {
            const minutes = (wakeupTimeMinutes - sleepTimeMinutes) + hourToMinutes;
            return calculate(minutes);
        }
        else {
            const minutes = hourToMinutes - (sleepTimeMinutes - wakeupTimeMinutes);
            return calculate(minutes);
        }
    }
    else {
        if (sleepTimeHour >= wakeupTimeHour && sleepTimeMinutes >= wakeupTimeMinutes) {
            const hourToMinutes = ((24 - sleepTimeHour) + wakeupTimeHour) * 60;
            const minutes = hourToMinutes - (sleepTimeMinutes - wakeupTimeMinutes);
            return calculate(minutes);
        }
        else if (sleepTimeHour === wakeupTimeHour && wakeupTimeMinutes >= sleepTimeMinutes) {
            const hourToMinutes = (sleepTimeHour - wakeupTimeHour) * 60;
            const minutes = hourToMinutes + (wakeupTimeMinutes - sleepTimeMinutes);
            return calculate(minutes);
        }
        else if (wakeupTimeMinutes >= sleepTimeMinutes) {
            const hourToMinutes = ((24 - sleepTimeHour) + wakeupTimeHour) * 60;
            const minutes = hourToMinutes + (wakeupTimeMinutes - sleepTimeMinutes);
            return calculate(minutes);
        }
        else if (sleepTimeMinutes >= wakeupTimeMinutes) {
            const hourToMinutes = ((24 - sleepTimeHour) + wakeupTimeHour) * 60;
            const minutes = hourToMinutes - (sleepTimeMinutes - wakeupTimeMinutes);
            return calculate(minutes);
        }
    }
};
exports.getFormattedSleepDuration = getFormattedSleepDuration;
