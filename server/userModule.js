let users = new Map();
let messages = [];

const userModule = {
  addUser: (id, nickname) => {
    users.set(id, { id: id, nickname: nickname, online: true });
  },
  removeUser: (id) => {
    users.delete(id);
  },
  getUser: (id) => {
    return users.get(id);
  },
  addMessage: (id, message) => {
    if (users.has(id)) {
      messages.push({ id: id, message: message, nickname: users.get(id).nickname });
    }
  },
  getMessages: () => {
    return messages;
  },
  getUsers: () => {
    return Array.from(users.values());
  },
};

module.exports = userModule;
