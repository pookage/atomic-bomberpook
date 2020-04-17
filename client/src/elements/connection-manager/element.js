import io from "socket.io-client";

import { STATE } from "SHARED/";
import { CONFIG } from "./";

export default class ConnectionManager extends HTMLElement {

	constructor(){
		super();

		// scope binding
		this.connect = this.connect.bind(this);
		this.reconnect = this.reconnect.bind(this);
		this.connected = this.connected.bind(this);

		STATE.subscribe("socket__host", this.connect);
	}// constructor

	connect(){
		const {
			socket__host: host,
			socket__connection: socket
		} = STATE;

		// close any existing connection
		socket?.close();

		// attempt to connect to the new host address
		STATE.socket__connection = io(`//${host}`);
		STATE.socket__connecting = true;
		STATE.socket__connected  = false;
		STATE.socket__failed     = false;


		// add callbacks for connection progress
		STATE.socket__connection.on("reconnecting", this.reconnect);
		STATE.socket__connection.on("connect", this.connected);
	}// connect

	reconnect(failCount){
		if(failCount >= CONFIG.retries){
			const { 
				socket__connection: socket 
			} = STATE;

			// close any open lingering connection if one exists
			socket?.close();

			console.log("marking as failed...")

			// report failure to state
			STATE.socket__connecting = false;
			STATE.socket__connected  = false;
			STATE.socket__failed     = true;
		}
	}// reconnect

	connected(){
		const { 
			socket__connection: socket 
		} = STATE;

		socket.on("welcome", (game) => {
			const { active, started } = game;
			console.log("the server has welcomed us", { active, started });
			STATE.game__active  = active;
			STATE.game__started = started;
		});
		socket.on("new_game", (game) => {
			// const { active, started } = game;
			console.log("a new game has been created", game);
		});

		socket.on("game_updated", (game) => {
			const {
				active,
				started,
				players
			} = game;

			STATE.game__active  = active;
			STATE.game__started = started;
			STATE.game__players = players;

			console.log("game updated!", game)

		});

		// report success to state
		STATE.socket__connecting = false;
		STATE.socket__connected  = true;
		STATE.socket__failed     = false;
	}// connected
}; // AppManager