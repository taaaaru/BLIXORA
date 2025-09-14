import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Simulations from './pages/Simulations';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.href = '/'; }
  return (
    <div>
      <nav className="p-4 bg-slate-800 text-white flex justify-between">
        <div className="font-bold">Blixora Labs</div>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/simulations">Simulations</Link>
          <Link to="/dashboard">Dashboard</Link>
          {localStorage.getItem('role') === 'admin' && <Link to="/admin">Admin</Link>}
          {!localStorage.getItem('token') ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}
export default App;


