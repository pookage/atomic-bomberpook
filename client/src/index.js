import io from "socket.io-client";

import { CONFIG } from "SHARED/";

// connect to the web socket
const socket = io(CONFIG.server);

