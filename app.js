import cron from "node-cron";
import { runProcess } from  "./src/index.js";

cron.schedule("*/5 * * * *", () => {
    console.log("Running process...");
    runProcess();
});