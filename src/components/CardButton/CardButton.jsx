import './CardButton.css';
import React from 'react';

function CardButton({ children, className, onClick }) {
  const cl = 'card-button' + (className ? className : '');
  return (
    <div className={cl} onClick={onClick}>
      {children}
    </div>
  );
}

export default CardButton;
