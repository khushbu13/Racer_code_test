const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000,
});

// Add the route
server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => reply('Nothing to see here'),
});

// Start the server
server.start((err) => {
	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});

console.log('checkin test');