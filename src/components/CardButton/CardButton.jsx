import './CardButton.css';
import React from 'react';

function CardButton({ children, className }) {
  const cl = 'card-button' + (className ? className : '');
  return <div className={cl}>{children}</div>;
}

export default CardButton;
