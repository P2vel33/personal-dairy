import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';
import cn from 'classnames';

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  function changeUser(e) {
    setUserId(Number(e.target.value));
  }
  return (
    <select name="user" id="user" value={userId} onChange={changeUser} className={cn(styles['select'])}>
      <option value="1">Антон</option>
      <option value="2">Василий</option>
      <option value="3">Егор</option>
    </select>
  );
}

export default SelectUser;
