import React from 'react';
import styles from './Logo.module.css';
import cn from 'classnames';

function Logo() {
  return <img className={cn(styles['logo'])} src="/logo.svg" alt="Логотип журнала"></img>;
}

export default Logo;
