import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { setColor } from "./actions/ColorActions";
import { addMessage, updateMessages } from "./actions/MessageActions";
import { setUsers } from "./actions/UsersActions";
import "./App.css";
import Header from "./components/Header/Header";
import InfoBar from "./components/InfoBar/InfoBar";
import Input from "./components/Input/Input";
import MessageBox from "./components/MessageBox/MessageBox";
import { socket } from "./Socket";

function App() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.ColorReducer.color);

  const cookies = new Cookies();
  const [username, setUsername] = useState("");

  /*Handle sending request to server on first join*/
  useEffect(() => {
    let uname = "";
    let savedUsername = cookies.get("username");
    if (savedUsername) {
      uname = savedUsername;
    }
    socket.emit("join", uname);
  }, []);

  useEffect(() => {
    /* Handle getting chat message. Update all messages */
    socket.on("chat message", (msg) => {
      console.log("got message");
      console.log(msg);
      dispatch(addMessage(msg));
    });
    socket.on("update messages", (messageList) => {
      dispatch(updateMessages(messageList));
    });

    /* Show success message on this reponse*/
    socket.on("success", (msg) => {
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
      });
    });

    /* Show error that username already exists on this response */
    socket.on("username exist", (err) => {
      toast.error("Username Exists!", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
      });
    });

    /* Set username for user and set all messages held in server */
    socket.on("setUsername", (obj) => {
      handleSetUsername(obj);
    });

    /* Get list of users online and display to user/set the users */
    socket.on("roomData", (users) => {
      dispatch(setUsers(users));
    });
  }, []);

  //handle setting users username and messages upon connecting and changing username
  const handleSetUsername = (obj) => {
    setUsername(obj.username);
    cookies.set("username", obj.username);

    dispatch(updateMessages(obj.allMessages));
  };

  /* Handles sending data to server when username changes name */
  const handleUsernameChange = (msg) => {
    let msg_arr = msg.split(" ");

    if (msg_arr[0] === "/name") {
      msg_arr.shift();
      let newName = msg_arr.join(" ");
      console.log("new name" + newName);
      if (newName.length < 10) {
        socket.emit("new name", { username: username, newName: newName });
      } else {
        toast.error(
          "Username is too long, please enter 10 characters or less!",
          {
            position: "top-center",
            autoClose: 5000,
            draggable: true,
          }
        );
      }
    } else {
      socket.emit("chat-message", {
        username: username,
        text: msg,
        color: color,
      });
    }
  };

  /* Handles sending data to server when username changes color */
  const handleColorChange = (msg) => {
    let msg_arr = msg.split(" ");

    if (msg_arr[0] === "/color") {
      msg_arr.shift();
      let newColor = msg_arr.join(" ");
      console.log("new color" + newColor);
      if (newColor.length === 6) {
        dispatch(setColor(newColor));
        socket.emit("new color", { username: username, newColor: newColor });
      } else {
        toast.error("Color is invalid!", {
          position: "top-center",
          autoClose: 5000,
          draggable: true,
        });
      }
    } else {
      socket.emit("chat-message", {
        username: username,
        text: msg,
        color: color,
      });
    }
  };

  /* Handles user request to send a message to the server*/
  const handleMessage = (msg) => {
    if (msg.includes("/name")) {
      handleUsernameChange(msg);
    } else if (msg.includes("/color")) {
      handleColorChange(msg);
    } else {
      socket.emit("chat-message", {
        username: username,
        text: msg,
        color: color,
      });
    }
  };

  return (
    <div className="chat-outerContainer">
      <InfoBar username={username} />
      <Box component="div" className="chat-container">
        <Header />
        <MessageBox username={username} />
        <Input handleMessage={handleMessage} />
      </Box>
      <ToastContainer />
    </div>
  );
}

export default App;
