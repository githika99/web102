import React from 'react';

//edited for new database

export default function Modal({ children, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
