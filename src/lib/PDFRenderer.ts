const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

export default class PDFRenderer {
	async renderURL(url: string, format: string = 'A4') {
		const executablePath = await chromium.executablePath;

		const browser = await puppeteer.launch({
			headless: true,
			args: chromium.args,
			executablePath,
		});
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle0' });
		const pdf = await page.pdf({ format: format, printBackground: true });

		await browser.close();
		return pdf;
	}
}
