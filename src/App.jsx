import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

function App() {
  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList></JournalList>
      </LeftPanel>
      <Body>BODY</Body>
    </div>
  );
  // return React.createElement('div', {}, 'PROJECT');
}

export default App;
