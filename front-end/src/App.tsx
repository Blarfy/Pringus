import React from 'react';
import logo from './logo.svg';
import './App.css';

//Typescript: https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets
//Routers - https://betterprogramming.pub/react-routers-explained-ff89153a6405

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
