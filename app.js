import express from 'express';
import cron from 'node-cron';
import { runProcess } from './src/index.js';

const app = express();
const port = process.env.PORT || 3000;

// Schedule the task
cron.schedule('*/5 * * * *', () => {
  console.log('Running process...');
  runProcess();
});

// Basic route just to keep the server responding
app.get('/', (req, res) => {
  res.send("Hunter's Herald Helper is running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
