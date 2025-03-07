import React from 'react';
import Dashboard from './components/Dashboard';
import './styles/styles.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">YouTube Course Analytics</div>
      </nav>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
