import puppeteer from 'puppeteer';

const takeScreenshot = async () => {
    const browser = await puppeteer.launch({ 
        executablePath: 'google-chrome-stable',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: "new" 
    });
    
        try {
      const page = await browser.newPage();
      await page.goto('https://myodfw.com/reserve-your-hunt');

      // Wait for the calendar to be rendered and visible
      await page.waitForSelector('.cp_calendar', { visible: true });

      await new Promise(resolve => setTimeout(resolve, 5000));

      const calendarContainer = await page.$('.cp_calendar');
      if (!calendarContainer) {
          throw new Error('Calendar container not found or is not visible.');
      }

      await calendarContainer.screenshot({ path: 'full_calendar.png' });
      return 'full_calendar.png';  
  } catch (error) {
      throw error;
  } finally {
      await browser.close(); // Ensure the browser is closed in case of error or success
  }
}

export default takeScreenshot;