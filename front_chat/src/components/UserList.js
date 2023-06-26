import React from "react";

function UserList({ users }) {
    return (
      <div>
        <h2>Usuarios conectados:</h2>
        <ul>
          {users && users.map((user) => (
            <li key={user.id}>{user.nickname}</li>
          ))}
        </ul>
      </div>
    );
  }
  
export default UserList;
