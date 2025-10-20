import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
    date: new Date(i.date)
  }));
}
function App() {
  const [items, setItems] = useLocalStorage('data');

  const addItems = (newItem) => {
    setItems([
      ...mapItems(items),
      {
        post: newItem.post,
        title: newItem.title,
        date: new Date(newItem.date),
        id: items.length > 0 ? Math.max(...items.map((el) => el.id)) + 1 : 1
      }
    ]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={mapItems(items)} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItems} />
        </Body>
      </div>
    </UserContextProvider>
  );
  // return React.createElement('div', {}, 'PROJECT');
}

export default App;
