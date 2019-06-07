import app from '../app';
import * as http from 'http';

const port = normalizePort(+process.env.PORT || 3000);
app.set('port', port);

var server = http.createServer(app);

server.listen(port, onListening);
server.on('error', onError);

function normalizePort(val: any): number | string | boolean {
	let port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

function onError(error: any) {
	if (error.syscall != 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	switch (error.code) {
		case 'EACCES':
			console.error(bind + 'requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + 'is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.log('Listening on ' + bind);
}
