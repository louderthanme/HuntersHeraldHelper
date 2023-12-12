import puppeteer from "puppeteer";

const checkForUpdates = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.google.com/");
    
    await browser.close();
}

checkForUpdates();