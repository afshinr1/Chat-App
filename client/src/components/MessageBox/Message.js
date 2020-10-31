import { Typography } from "@material-ui/core";
import React from "react";
import ReactEmoji from "react-emoji";
import "./MessageStyles.css";
function Message({ message, username }) {
  if (message.username === username) {
    return (
      <>
        <div className="user-info justifyEnd">
          <Typography variant="body2" className="sentText pl-10">
            {message.username} :
          </Typography>
          <Typography variant="caption"> {message.date}</Typography>
        </div>
        <div className="messageContainer justifyEnd">
          <div className={`messageBox backgroundLight `}>
            <Typography
              variant="body2"
              className="messageText"
              style={{ color: `#${message.color}` }}
            >
              <b> {ReactEmoji.emojify(message.text)}</b>
            </Typography>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="user-info">
          <Typography variant="body2" className="sentText pl-10">
            {message.username} :
          </Typography>
          <Typography variant="caption">{message.date}</Typography>
        </div>
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <Typography
              variant="body2"
              className="messageText colorDark"
              style={{ color: `#${message.color}` }}
            >
              {ReactEmoji.emojify(message.text)}
            </Typography>
          </div>
        </div>
      </>
    );
  }
}

export default Message;
