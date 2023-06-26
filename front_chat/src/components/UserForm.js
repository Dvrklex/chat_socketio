import React, { useState } from 'react';

function UserForm({ handleUsernameSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      handleUsernameSubmit(username);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleInputChange} />
      </label>
      <button type="submit">Enter</button>
    </form>
  );
}

export default UserForm;
