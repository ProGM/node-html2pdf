const puppeteer = require('puppeteer');

export default class PDFRenderer {
	async renderURL(url: string, format: string = 'A4') {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle0' });
		const pdf = await page.pdf({ format: format });

		await browser.close();
		return pdf;
	}
}
