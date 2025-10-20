import { memo } from 'react';
import styles from './Logo.module.css';
import cn from 'classnames';

function Logo({ image }) {
  return <img className={cn(styles['logo'])} src={image} alt="Логотип журнала"></img>;
}

export default memo(Logo);
