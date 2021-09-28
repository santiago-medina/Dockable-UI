import React, { useState, useEffect } from 'react';

export default (components) => {
  let dragStart = undefined;
  let DOMSizes = [];

  const [sizes, setSizes] = useState(DOMSizes);

  const childrenWithProps = React.Children.map(
    components.children,
    (child, index) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          style: { maxHeight: sizes[index] },
        });
      }
      return child;
    }
  );

  const resize = (e, o) => {
    if (dragStart > 0) {
      const delta = e.screenY - dragStart;
      e.target.previousSibling.style.maxHeight = DOMSizes[0] + delta + 'px';
      e.target.nextSibling.style.maxHeight = DOMSizes[1] - delta + 'px';
    }
  };

  const clearDrag = (e) => {
    setSizes(...DOMSizes);
    DOMSizes = [undefined, undefined];
    dragStart = undefined;
  };

  const setDrag = (e) => {
    dragStart = e.screenY;
    DOMSizes = [
      e.target.previousSibling.offsetHeight,
      e.target.nextSibling.offsetHeight,
    ];

    function redirectEvent(eventType, fromElement, toElement) {
      fromElement.addEventListener(eventType, function (event) {
        toElement.dispatchEvent(new event.constructor(event.type, event));
        event.preventDefault();
        event.stopPropagation();
      });
    }

    let bar = e.target;
    redirectEvent('mousemove', e.target.nextSibling, bar);
    redirectEvent('mousemove', e.target.previousSibling, bar);
    redirectEvent('mouseup', e.target.nextSibling, bar);
    redirectEvent('mouseup', e.target.previousSibling, bar);
  };

  return (
    <div className="strip-v">
      {childrenWithProps[0]}
      <div
        className="resize-control-v"
        onMouseDown={setDrag}
        onMouseMove={resize}
        onMouseUp={clearDrag}
      ></div>
      {childrenWithProps[1]}
    </div>
  );
};
