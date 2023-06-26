import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import UserForm from './components/UserForm';

function App() {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (name) => {
    setUsername(name);
  };

  return (
    <div className="container">
      {username ? (
        <ChatRoom username={username} />
      ) : (
        <UserForm handleUsernameSubmit={handleUsernameSubmit} />
      )}
    </div>
  );
}

export default App;
