let http = require('http');
var url = require('url');
var dt = require('./data');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end('Sucesso');
}).listen(8080);