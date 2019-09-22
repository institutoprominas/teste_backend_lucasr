import fs   from 'fs';
import path from 'path';
import cron from 'node-cron';

export default class Routines {

    constructor() {
    }

    _setupRoutines() {
        try {
            fs.readdirSync(path.join(__dirname, '../routines'))
                .forEach(filename => {
                    const routine = require(path.join(__dirname, '../routines/', filename)).default;

                    cron.schedule(routine.runAt, routine.run);
                });
        } catch (e) {}
    }
}