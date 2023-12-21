import { io } from "socket.io-client";

const socket = io("https://abeghelp-backend-staging.up.railway.app", {
  withCredentials: true,
});

export const socketHelper = () => {
  socket.on("connect", () => {
    console.log(socket); // x8WIv7-mJelg7on_ALbx
  });
};
