import React from 'react';
import './css/index.css';
// import DebugGrid from './components/DebugGrid';
import DragDropBasic from './components/DragDropBasic';

function App() {
  return (
    <main className="mainContainer">
      {/* <DebugGrid></DebugGrid> */}
      <DragDropBasic></DragDropBasic>
    </main>
  );
}

export default App;
