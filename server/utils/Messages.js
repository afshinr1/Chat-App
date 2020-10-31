const moment = require("moment");
let messages = [];

const addMessage = (message) => {
  let text = message.text;
  let uname = message.username;
  let color = message.color;
  let date = moment().format("h:mm:ss a");
  const newMsg = { text: text, username: uname, color: color, date: date };
  messages.push(newMsg);
  if (messages.length >= 200) {
    messages.shift();
  }
  return newMsg;
};
const changeMessageColor = (username, newColor) => {
  messages.forEach((message) => {
    if (message.username === username) {
      message.color = newColor;
    }
  });
};

const changeMessageNames = (username, newName) => {
  messages.forEach((message) => {
    if (message.username === username) {
      message.username = newName;
    }
  });
};
const createMessage = (text, username) => {
  return {
    text: text,
    username: username,
    color: "000000",
    date: moment().format("h:mm:ss a"),
  };
};
const getMessages = () => {
  if (messages.length >= 200) {
    messages.shift();
  }
  return messages;
};
module.exports = {
  createMessage,
  addMessage,
  getMessages,
  changeMessageNames,
  changeMessageColor,
};
