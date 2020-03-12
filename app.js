const http = require("http");
const routes = require('./routes.js')

const server = http.createServer(routes);

console.log('hello')
server.listen(3001);
