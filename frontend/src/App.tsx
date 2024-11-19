import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calendar } from './components/Calendar/Calendar';

function App() {
  return (
    <div className="App">
      <Calendar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
