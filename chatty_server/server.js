// server.js

const express = require('express');
const SocketServer = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

//broadcast to the clients
wss.broadcast = function broadcast(data) {
  // this loops through all the clients and then sends data to all clients
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// Check ws frames?  TO see if it sent correctly.
wss.on('connection', (ws) => {
  console.log('Client connected');
    ws.on('message', function incoming(message) {
        const receivedMessage = JSON.parse(message);
        const messageObject = {
          id: generateGUID,
          username: receivedMessage.username,
          content: receivedMessage.content
        };


      console.log("Server received message" , JSON.stringify(messageObject));
      wss.broadcast(JSON.stringify(messageObject)); // Must broadcast in stringify, web sockets only do stringify
    });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

//GUID generator
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var generateGUID = guid();

