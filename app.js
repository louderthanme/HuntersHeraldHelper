import cron from "node-cron";
import { runProcess } from  "./src/index.js";

cron.schedule("0 */4 * * *", () => {
    console.log("Running process...");
    runProcess();
});