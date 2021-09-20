import React from 'react';
import './style.css';
import RHG from './resizable-holy-grail';
import RCS from './resizable-cells-strip';
export default function App() {
  return (
    <div className="app-root">
      {/*<RHG></RHG>*/}
      <RCS>
        <div>gg</div>
        <div>hh</div>
      </RCS>
    </div>
  );
}
