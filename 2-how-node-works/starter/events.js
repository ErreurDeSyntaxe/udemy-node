import { EventEmitter } from 'events';
import http from 'http';

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});
myEmitter.on('newSale', () => {
  console.log('Constumer name: Jonas');
});
myEmitter.on('newSale', (amount) => {
  console.log(`The new sale amounts to $${amount}`);
});
myEmitter.emit('newSale', 90);

console.log('------------------------');

// -------------------------- //

const server = http.createServer();
server.on('request', (req, res) => {
  console.log('Request received!');
  res.end('Request received!');
});
server.on('request', (req, res) => {
  console.log('Another 🫠');
});
server.on('close', (req, res) => {
  res.end('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests');
});
