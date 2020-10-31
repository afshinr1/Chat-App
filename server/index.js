const express = require("express");
const app = express();
const http = require("http").createServer(app);
const {
  addUser,
  getUser,
  removeUser,
  getUsers,
  defaultName,
  changeName,
} = require("./utils/Users");

const {
  addMessage,
  getMessages,
  changeMessageNames,
  createMessage,
  changeMessageColor,
} = require("./utils/Messages");

const PORT = 5000 || process.env.PORT;

const io = require("socket.io")(http);

app.get("/", (req, res, next) => {
  res.send("server is up and runnning");
});

io.on("connection", (socket) => {
  console.log("A user has connected");

  /*HANDLE LOGIC WHEN USER FIRST CONNECTS */

  socket.on("join", (username) => {
    //handle adding new user to list and getting default username
    if (username === "") username = defaultName();
    let user = { id: socket.id, username: username };
    user = addUser(user);
    username = user.username;

    //Handle message when a new user joins
    let joinMsg = createMessage(`Welcome to the room!`, "Admin");

    socket.emit("chat message", joinMsg);
    joinMsg.text = `A new user has connected!`;
    socket.broadcast.emit("chat message", joinMsg);

    //handle sending new room data when new user joins
    io.emit("roomData", getUsers());
    const allMessages = getMessages();
    socket.emit("setUsername", { username, allMessages });
  });

  /*END OF LOGIC WHEN USER FIRST CONNECTS */

  //Handle new message arrival, Send the message to everyone
  socket.on("chat-message", (msg) => {
    console.log(msg);
    newMsg = addMessage(msg);
    io.emit("chat message", newMsg);
  });

  //Change message Color of User using /color
  socket.on("new color", (obj) => {
    let username = obj.username;
    let newColor = obj.newColor;
    changeMessageColor(username, newColor);
    const allMessages = getMessages();
    io.emit("update messages", allMessages);
  });

  //Change name of user using /name
  socket.on("new name", (obj) => {
    let username = obj.username;
    let newName = obj.newName;
    let result = changeName(socket.id, newName);
    if (result === "error") {
      socket.emit("username exist", "Error");
    } else {
      changeMessageNames(username, newName);
      const allMessages = getMessages();
      socket.emit("success", "Sucessfully changed nickname!");
      socket.emit("setUsername", { username: newName, allMessages });
      io.emit("roomData", getUsers());
      socket.broadcast.emit("update messages", allMessages);
    }
  });

  //On disconnect notify all users
  socket.on("disconnect", () => {
    console.log("A user disconected");
    const user = getUser(socket.id);
    const newUsers = removeUser(socket.id);

    let discMsg = createMessage(`A user disconnected the room `, "Admin");

    io.emit("chat message", discMsg);
    io.emit("roomData", newUsers);
  });
});

http.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
