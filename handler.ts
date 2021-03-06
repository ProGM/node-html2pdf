import { Handler, Context } from 'aws-lambda';
import * as HttpStatus from 'http-status-codes';
import { isValidUrl } from './src/lib/utils';
import PDFRenderer from './src/lib/PDFRenderer';
import Sentry from './src/lib/SentryConfig';

const pdf: Handler = async (event: any, context: Context) => {
	try {
		const pdfRenderer = new PDFRenderer(true);
		const url = event.queryStringParameters && event.queryStringParameters.url;

		if (!url) {
			return { statusCode: HttpStatus.BAD_REQUEST, body: JSON.stringify({ error: 'Missing parameter `url`' }) }
		}

		if (!isValidUrl(url)) {
			return { statusCode: HttpStatus.BAD_REQUEST, body: JSON.stringify({ error: `"${url}" is not a valid URL` }) }
		}

		const file = await pdfRenderer.renderURL(url);
		return {
			statusCode: HttpStatus.OK,
			headers: {
				'Content-Type': 'application/pdf'
			},
			body: file.toString('base64'),
			isBase64Encoded: true
		};
	} catch (error) {
		Sentry.captureException(error);
		return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, body: JSON.stringify({ error: error.message }) }
	}
};

export { pdf }
