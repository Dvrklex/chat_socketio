let users = {};
let messages = [];

const userModule = {
  addUser: (id, nickname) => {
    users[id] = { nickname: nickname, online: true };
  },
  removeUser: (id) => {
    if (users[id]) {
      users[id].online = false;
    }
  },
  getUser: (id) => {
    return users[id];
  },
  addMessage: (id, message) => {
    if (users[id]) {
      messages.push({ id: id, message: message, nickname: users[id].nickname });
    }
  },
  getMessages: () => {
    return messages;
  },
  getUsers: () => {
    return Object.values(users).filter(user => user.online);
  }
};

module.exports = userModule;