import { io } from "socket.io-client";

// Connect to your backend
export const socket = io("https://pixel-talk-2-0-backend.onrender.com"); // replace with your backend IP
