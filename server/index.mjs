import express from "express";
import socket from "socket.io";

import { CONFIG, STATE } from "./defaults/index.mjs";

// CONFIGURE
// -----------------------------------------
// app
const app    = express();
const server = app.listen(CONFIG.port, init);

// state
const state = { ...STATE };

// socket.io
const io = socket(server);

// shared socket events
io.on("connection", handleConnection);





// LIFECYCLE JAZZ
// -------------------------------------------
function init(){
	console.log(`Listening to requests on port ${CONFIG.port}`);
}// init


// EVENT HANDLERS
// -----------------------------------------
function handleConnection(socket){
	state.connectedPlayers += 1;

	socket.on("disconnect", handleDisconnect);
	console.log(`${state.connectedPlayers} players connected.`);
}// handelConnection

function handleDisconnect(){
	state.connectedPlayers -= 1;

	console.log(`${state.connectedPlayers} players connected.`);
}// handleDisconnect


