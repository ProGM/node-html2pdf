export default class PDFRenderer {
	lambda: boolean;
	puppeteer: any;
	chromium: any;

	constructor(lambda: boolean) {
		this.lambda = lambda;
		if (lambda) {
			this.chromium = require('chrome-aws-lambda');
			this.puppeteer = this.chromium.puppeteer;
		} else {
			this.puppeteer = require('puppeteer');
		}
	}

	async renderURL(url: string, format: string = 'A4') {
		const browser = await this.buildBrowser();
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle0' });
		const pdf = await page.pdf({ format: format, printBackground: true });

		await browser.close();
		return pdf;
	}

	private async buildBrowser() {
		if (this.lambda) {
			const executablePath = await this.chromium.executablePath;

			return await this.puppeteer.launch({
				headless: true,
				args: this.chromium.args,
				executablePath,
			});
		} else {
			return await this.puppeteer.launch({
				headless: true,
			});
		}
	}
}
