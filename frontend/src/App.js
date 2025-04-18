import { Routes, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList';
import CreateUser from './pages/CreateUser';
import UpdateUser from './pages/UpdateUser';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Users</Link> | <Link to="/create">Add User</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;