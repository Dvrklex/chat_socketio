import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserList from './UserList';
// import userModule from '../../../server/userModule';

const socket = io('http://localhost:3000/');

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  useEffect(() => {
    socket.emit('set nickname', socket.id, username);

    socket.on('userConnected', (msg, totalMessages, users) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: msg, type: 'connect' },
        ...totalMessages.map((message) => ({ text: message.message, type: 'message' })),
      ]);
      setConnectedUsers(users);
    });
    

    socket.on("userDisconnected", (msg, users) => {
      setMessages((prevMessages) => [...prevMessages, { text: msg, type: 'disconnect' }]);
      setConnectedUsers(users);
    });
    
    

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { text: msg, type: 'message' }]);
    });

    socket.on('typing', (user) => {
      setTypingUsers((prevTypingUsers) => {
        if (!prevTypingUsers.includes(user)) {
          return [...prevTypingUsers, user];
        }
        return prevTypingUsers;
      });
    });

    socket.on('typingStop', (user) => {
      setTypingUsers((prevTypingUsers) => {
        return prevTypingUsers.filter((typingUser) => typingUser !== user);
      });
    });

    return () => {
      socket.off('userConnected');
      socket.off('userDisconnected');
      socket.off('chat message');
      socket.off('typing');
      socket.off('typingStop');
    };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      socket.emit('chat message', inputValue);
      setInputValue('');
      socket.emit('typingStop'); // Detener el evento de typing al enviar el mensaje
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      socket.emit('typing');
    } else {
      socket.emit('typingStop');
    }
  };

  const getMessageClassName = (messageType) => {
    switch (messageType) {
      case 'connect':
        return 'message-connect';
      case 'disconnect':
        return 'message-disconnect';
      default:
        return 'message';
    }
  };

  return (
    <div>
      <h1>Welcome to the Chat Room, {username}!</h1>

      
      <ul id="messages" className="messages">
        {messages.map((message, index) => (
          <li key={index} className={getMessageClassName(message.type)}>
            {message.text}
          </li>
        ))}
      </ul>

      <div id="writing-status">
        {typingUsers.length > 0 &&
          typingUsers.map((user, index) => (
            <div key={index}>{`${user} is typing...`}</div>
          ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <UserList users={connectedUsers} />
    </div>
  );
}

export default ChatRoom;
