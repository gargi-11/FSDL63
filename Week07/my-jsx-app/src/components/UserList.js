import React, { useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ]);

  return (
    <div style={styles.container}>
      <h1>User List</h1>
      <ul style={styles.list}>
        {users.map((user) => (
          <li key={user.id} style={styles.listItem}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
  },
};

export default UserList;