let users = [];
let counter = 0;
const addUser = (user) => {
  users.forEach((checkUser) => {
    if (checkUser.username === user.username) {
      user.username = defaultName();
    }
  });
  users.push(user);
  return user;
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};
const getUsers = () => {
  return users;
};
const defaultName = () => {
  let name = `USER ${counter}`;
  counter++;
  return name;
};
const changeName = (id, newName) => {
  const exists = users.find((user) => user.username === newName);
  if (exists) return "error";
  else {
    users.forEach((user) => {
      if (user.id === id) {
        user.username = newName;
      }
    });

    return "username changed successfully";
  }
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
  return users;
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  defaultName,
  changeName,
  removeUser,
};
