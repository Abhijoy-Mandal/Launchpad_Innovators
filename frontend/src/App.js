import React from 'react';
import BabylonVisualizer from './components/BabylonVisualizer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        <BabylonVisualizer />
      </div>
    </div>
  );
}

export default App;
