let Sentry: { captureException: Function };
if (process.env.SENTRY_DSN) {
	const Raven = require('raven');
	Raven.config(process.env.SENTRY_DSN).install();
	Sentry = Raven;
} else {
	Sentry = { captureException(...args: any) { console.error(...args) } }
}
export default Sentry;
