import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './styles.css';

function App() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <div className="container">
      <h1>User Management</h1>
      <UserForm onUserCreated={() => setRefresh(!refresh)} />
      <UserList key={refresh} />
    </div>
  );
}

export default App;
