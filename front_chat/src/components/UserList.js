import React from "react";
import '../index.css'
function UserList({ users }) {
  const userListStyles = {
    marginTop: "1rem",
    backgroundColor: "#f2f2f2",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const listItemStyles = {
    marginBottom: "0.5rem",
  };
    return (
      <div id={userListStyles}>
        <h2>Usuarios conectados:</h2>
        <ul>
          {users && users.map((user) => (
            <li key={user.id} style={listItemStyles}>{user.nickname}</li>
          ))}
        </ul>
      </div>
    );
  }
  
export default UserList;
