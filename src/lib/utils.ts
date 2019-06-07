const url = require("url");

export function isValidUrl(s: string): boolean {
	try {
		new url.URL(s);
		return true;
	} catch (err) {
		return false;
	}
};
