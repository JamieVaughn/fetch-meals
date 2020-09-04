import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DAILY HARVEST</h1>
        <h2>Meal Catalog Search</h2>
      </header>
      <Search />
    </div>
  );
}

export default App;
