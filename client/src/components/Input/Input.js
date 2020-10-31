import React, { useState } from "react";
import "./Input.css";
import { Box, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
function Input({ handleMessage }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      handleMessage(message);
      setMessage("");
    }
  };
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };
  return (
    <Box display="flex" component="div" className="input-form">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="message-input"
        onKeyDown={handleEnter}
      />
      <Button
        className="message-button"
        color="primary"
        variant="contained"
        startIcon={<SendIcon />}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Box>
  );
}

export default Input;
