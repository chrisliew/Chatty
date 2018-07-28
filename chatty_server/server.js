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


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  getUsersCount();

  ws.on('message', function incoming(newMessage) {

    //parses stringified data into object again.
    var receivedMessage = JSON.parse(newMessage);

    function setType() {
      return receivedMessage.type === "postNotification" ? "incomingNotification" :
      "incomingMessage";
    }

    var messagesAddedID = {
      id: generateGUID,
      type: setType(),
      username: receivedMessage.username,
      content: receivedMessage.content,
    };
    //turns object back into stringify.
    wss.broadcast(JSON.stringify(messagesAddedID));
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if(client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};
//function to getUsersCount and send back to browser.
function getUsersCount(){
    const messageObject = {
    type: 'usersCount',
    content: wss.clients.size,
  };
  wss.broadcast(JSON.stringify(messageObject));
}



function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var generateGUID = guid();

