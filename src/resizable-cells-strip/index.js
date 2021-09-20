import React, { useState } from 'react';

export default (components) => {
  let drag = false;

  const [sizes, setSizes] = useState([]);

  const resize = (e, o) => {
    if (drag) {
      console.log(e.screenX, e.screenY);
    }
  };

  const clearDrag = (e) => {
    drag = false;
  };

  const setDrag = (e) => {
    drag = true;
    console.log(drag);

    function redirectEvent(eventType, fromElement, toElement) {
      //debugger;
      fromElement.addEventListener(eventType, function (event) {
        toElement.dispatchEvent(new event.constructor(event.type, event));
        event.preventDefault();
        event.stopPropagation();
      });
    }

    let nextSibling = e.target.nextSibling;
    let prevSibling = e.target.previousSibling;
    let bar = e.target;
    redirectEvent('mousemove', nextSibling, bar);
    redirectEvent('mousemove', prevSibling, bar);
    redirectEvent('mouseup', nextSibling, bar);
    redirectEvent('mouseup', prevSibling, bar);
  };

  return (
    <div className="strip-v">
      {components.children[0]}
      <div
        className="resize-control-v"
        onMouseDown={setDrag}
        onMouseMove={resize}
        onMouseUp={clearDrag}
      ></div>
      {components.children[1]}
    </div>
  );
};
