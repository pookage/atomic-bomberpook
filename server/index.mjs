import express from "express";
import socket from "socket.io";

import { CONFIG, STATE } from "./defaults/index.mjs";

// CONFIGURE
// -----------------------------------------
// app
const app    = express();
const server = app.listen(CONFIG.port, init);

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
	STATE.connectedUsers += 1;

	socket.on("new_game", createGame);
	socket.on("join_game", joinGame);

	socket.on("disconnect", handleDisconnect);
	socket.emit("welcome", STATE.game);
	console.log(`${STATE.connectedUsers} players connected...`);
}// handelConnection

function handleDisconnect(){
	STATE.connectedUsers -= 1;

	console.log(`${STATE.connectedUsers} players connected...`);
}// handleDisconnect

function createGame(){

	STATE.game = {
		...STATE.game,
		active: true,
		host: "pookage",
		players: {
			"pookage": {}
		}
	};

	io.emit("new_game", STATE.game);
}// createGame

function joinGame(){
	STATE.game = {
		...STATE.game,
		players: {
			...STATE.game.players,
			"new player": {}
		}
	};

	io.emit("game_updated", STATE.game);
}// joinGame


