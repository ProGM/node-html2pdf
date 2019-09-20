import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import PDFRenderer from '../lib/PDFRenderer';
import { isValidUrl } from '../lib/utils'
import Sentry from '../lib/SentryConfig';

const router: Router = Router();
const pdfRenderer = new PDFRenderer(false);

router.get('/', async (req: Request, res: Response) => {
	if (!req.query.url) {
		return res.send({ ok: false, error: 'Missing parameter `url`', code: HttpStatus.BAD_REQUEST });
	}
	if (!isValidUrl(req.query.url)) {
		return res.send({ ok: false, error: `"${req.query.url}" is not a valid URL`, code: HttpStatus.BAD_REQUEST });
	}

	try {
		const pdf = await pdfRenderer.renderURL(req.query.url);
		res.contentType('application/pdf');
		res.end(pdf, 'binary');
		return res;
	} catch (error) {
		console.error(error);
		Sentry.captureException(error);
		return res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
	}
});

export default router;
