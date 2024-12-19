import './App.css';
import Entry from './components/Entry';
import Header from './components/Header';
import { data } from './data';

function App() {

  const entries = data.map((entry) => {
    return (
      <Entry
        key={entry.id}
        {...entry}
      />
    );
  });

  return (
    <main>
      <Header />
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 py-28 gap-8'>
        {entries}
      </section>
    </main>
  );
}

export default App;