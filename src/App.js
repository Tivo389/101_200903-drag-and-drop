import React from 'react';
import './css/index.css';
// import DebugGrid from './components/DebugGrid';
import DropItem from './components/DropItem';

function App() {
  return (
    <main className="mainContainer" style={{height: window.innerHeight}}>
      {/* <DebugGrid></DebugGrid> */}
      <div className="dragDropContainer">
        <div className="landingPad"></div>
        <div className="dropItemContainer">
          <DropItem color="cyan"></DropItem>
          <DropItem color="magenta"></DropItem>
          <DropItem color="yellow"></DropItem>
        </div>
      </div>
    </main>
  );
}

export default App;
