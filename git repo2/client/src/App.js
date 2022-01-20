import logo from './logo.svg';
import Header from './components/Header';
import Addtodo from './components/Addtodo';
import Todos from './components/Todos';
// import { Provider } from 'react';
import { Provider } from './components/context';

import './App.css';

function App() {
  return (
    <Provider>
    <div className="App">
      <Header></Header>
      <Addtodo></Addtodo>
      <Todos></Todos>
    </div>
    </Provider>
  );
}

export default App;
