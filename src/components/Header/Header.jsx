import cn from 'classnames';
import Logo from '../Logo/Logo';
import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';
import Button from '../Button/Button';
import { useCallback, useState } from 'react';

const logos = ['./logo.svg', './vite.svg'];
function Header() {
  const [logoIndex, setLogoIndex] = useState(0);
  const toogleLogo = useCallback(() => {
    setLogoIndex((state) => Number(!Boolean(state)));
  }, []);
  return (
    <div className={cn(styles['header'])}>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClick={toogleLogo}>Сменить логотип</Button>
    </div>
  );
}

export default Header;
