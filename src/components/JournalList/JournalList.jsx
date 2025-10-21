import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';
import { PostContext } from '../../context/post.context';

function JournalList({ items }) {
  const { userId } = useContext(UserContext);
  const { setCurrentPost } = useContext(PostContext);
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };
  const filteredItems = useMemo(() => {
    return items.filter((el) => el.userId === userId).sort(sortItems);
  }, [items, userId]);

  if (items.filter((el) => el.userId === userId).length === 0) {
    return <p>Записей пока нет, добавьте новую!</p>;
  }

  return (
    <>
      {filteredItems.map((el) => {
        return (
          <CardButton key={el.id} onClick={() => setCurrentPost(el)}>
            <JournalItem title={el.title} post={el.post} date={el.date} />
          </CardButton>
        );
      })}
    </>
  );
}

export default JournalList;
