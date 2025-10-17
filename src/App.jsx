import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import { useEffect, useState } from 'react';
// const initialItems = [
//   {
//     id: 1,
//     title: 'Подготовка к обновлению курсов',
//     post: 'Горные походы открывают удивительные природные ландшафт',
//     date: new Date()
//   },
//   {
//     id: 2,
//     title: 'Поход в годы',
//     post: 'Думал, что очень много времени',
//     date: new Date()
//   }
// ];
function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setItems(
        data.map((el) => ({
          ...el,
          date: new Date(el.date)
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem('data', JSON.stringify(items));
    }
  }, [items]);

  const addItems = (newItem) => {
    setItems([
      ...items,
      {
        post: newItem.post,
        title: newItem.title,
        date: new Date(newItem.date),
        id: items.length > 0 ? Math.max(...items.map((el) => el.id)) + 1 : 1
      }
    ]);
    // setItems((oldItems) => [
    //   ...oldItems,
    //   {
    //     post: newItem.post,
    //     title: newItem.title,
    //     date: new Date(newItem.date)
    //   }
    // ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItems} />
      </Body>
    </div>
  );
  // return React.createElement('div', {}, 'PROJECT');
}

export default App;
