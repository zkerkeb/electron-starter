
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
// import { ipcRenderer } from 'electron';

// const { ipcRenderer } = window.require('electron');

function App() {
  console.log('electron', window.electron)
  console.log('electron', window.versions)
  const {requestSystemInfo, getSystemInfo, cleanSystemInfo} = window.electron;
  const [systemInfo, setSystemInfo] = useState({});

useEffect(() => {
  requestSystemInfo();
  getSystemInfo(setSystemInfo)

  return () => {
    cleanSystemInfo();
  }
}, []);

useEffect(() => {
  console.log('systemInfo', systemInfo)
}, [systemInfo])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
