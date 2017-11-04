// server.js
"use strict";

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
var numberOfUsersConnected = 0;
wss.on('connection', (ws) => {
  numberOfUsersConnected += 1;
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({type:"numberOfUsersConnected",numberOfUsersConnected:numberOfUsersConnected}));
    });  
  console.log('Client connected');
  ws.on('message', (message) => {
    let messageReceived = JSON.parse(message);
    if(messageReceived.type === 'postNotification'){
      var NotificationToClients = {type:'incomingNotification',content:messageReceived.content};
      wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(NotificationToClients));
    });  
  }else if(messageReceived.type === 'postMessage'){
      var toSend = {type:'incomingMessage',id:uuidv1(),username:messageReceived.username,content:messageReceived.content};
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(toSend)); 
      });
  }
    
});

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {numberOfUsersConnected -= 1;
                        console.log('Client disconnected')
                        wss.clients.forEach(function each(client) {
                          client.send(JSON.stringify({type:"numberOfUsersConnected",numberOfUsersConnected:numberOfUsersConnected}));
                          }); 
                        });
});