import './App.css';
// import Entry from './components/travelJournal/Entry';
import Header from './components/chefClaude/Header';
// import { data } from './data';
import Main from './components/chefClaude/Main';

function App() {

  // const entries = data.map((entry) => {
  //   return (
  //     <Entry
  //       key={entry.id}
  //       {...entry}
  //     />
  //   );
  // });

  return (
    <main>
      <Header />
      {/* <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 py-28 gap-8'>
        {entries}
      </section> */}
      <Main />
    </main>
  );
}

export default App;
