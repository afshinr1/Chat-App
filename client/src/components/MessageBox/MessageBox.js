import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  scroll: {
    overflowY: "auto",
    flex: "auto",
  },
});

function MessageBox({ username }) {
  const messages = useSelector((state) => state.MessageReducer.messages);
  const classes = useStyles();

  const text = messages.map((message, i) => (
    <div key={i}>
      {" "}
      <Message message={message} username={username} />
    </div>
  ));
  return (
    <ScrollToBottom className={classes.scroll}>
      <div className={classes.messages}>{text}</div>
    </ScrollToBottom>
  );
}

export default MessageBox;
