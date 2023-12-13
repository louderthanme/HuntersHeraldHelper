import puppeteer from 'puppeteer';

const takeScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://myodfw.com/reserve-your-hunt');

  // Wait for the calendar to be rendered and visible
  await page.waitForSelector('.cp_calendar', { visible: true });

  await new Promise(resolve => setTimeout(resolve, 5000));

  const calendarContainer = await page.$('.cp_calendar');
  if (calendarContainer) {
    await calendarContainer.screenshot({ path: 'full_calendar.png' });
    console.log('Screenshot taken.'); 
  } else {
    console.log('Calendar container not found or is not visible.');
  }

  await browser.close();
}

export default takeScreenshot;
