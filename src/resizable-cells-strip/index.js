import React, { useState } from 'react';

export default (components) => {
  let drag = -1;

  let nextSibling, prevSibling;
  let originalOffsetHeight1, originalOffsetHeight2;

  const [sizes, setSizes] = useState([]);

  const resize = (e, o) => {
    if (drag > 0) {
      const delta = e.screenY - drag;
      prevSibling.style.maxHeight = originalOffsetHeight2 + delta + 'px';
      nextSibling.style.maxHeight = originalOffsetHeight1 - delta + 'px';
    }
  };

  const clearDrag = (e) => {
    drag = -1;
    originalOffsetHeight1 = undefined;
    originalOffsetHeight2 = undefined;
  };

  const setDrag = (e) => {
    nextSibling = e.target.nextSibling;
    prevSibling = e.target.previousSibling;
    drag = e.screenY;
    originalOffsetHeight1 = nextSibling.offsetHeight;
    originalOffsetHeight2 = prevSibling.offsetHeight;

    function redirectEvent(eventType, fromElement, toElement) {
      //debugger;
      fromElement.addEventListener(eventType, function (event) {
        toElement.dispatchEvent(new event.constructor(event.type, event));
        event.preventDefault();
        event.stopPropagation();
      });
    }

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
