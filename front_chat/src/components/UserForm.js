import React, { useState } from 'react';
import 'boxicons'
import SkillsTable from './SkillsTable';
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
    <div>

    <form onSubmit={handleSubmit} class="userForm">
      <label id="userNameLabel">
        Ingresa un nombre para ingresar al chat
      </label>
        <input id="userNameInput" type="text" value={username} onChange={handleInputChange} placeholder='Escribir nombre... ' />
      <button type="submit" id="userNameButton">Enter</button>
    </form>
    <h2 class="skillTitle">Proyecto creado con</h2>
    <div class="skillTable">
        <SkillsTable></SkillsTable>
    </div>
    </div>
  );
}

export default UserForm;
