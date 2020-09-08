import React from 'react';
import './css/index.css';
// import DebugGrid from './components/DebugGrid';
// import DragDropBasic from './components/DragDropBasic';
import DragDropIntermediate from './components/DragDropIntermediate';

function App() {
  return (
    <main className="mainContainer">
      {/* <DebugGrid></DebugGrid> */}
      {/* <DragDropBasic></DragDropBasic> */}
      <DragDropIntermediate></DragDropIntermediate>
    </main>
  );
}

export default App;
