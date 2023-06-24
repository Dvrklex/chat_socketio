import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on('userConnected', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text: msg }]);
    });

    socket.on('userDisconnected', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text: msg }]);
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text: msg }]);
    });

    socket.on('typing', (user) => {
      setIsTyping(true);
    });

    socket.on('typingStop', () => {
      setIsTyping(false);
    });

    return () => {
      socket.off('userConnected');
      socket.off('userDisconnected');
      socket.off('chat message');
      socket.off('typing');
      socket.off('typingStop');
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    socket.emit('typing');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      socket.emit('chat message', inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="container">
      <ul className="messages">
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      {isTyping && <div id="writing-status">Someone is typing...</div>}
      <form id="form" onSubmit={handleSubmit}>
        <input id="input" type="text" autoComplete="off" value={inputValue} onChange={handleInputChange} />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
