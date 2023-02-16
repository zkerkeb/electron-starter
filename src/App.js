import logo from './logo.svg';
import './App.css';
import DialogButton from './components/dialogButton';
import { useEffect, useState } from 'react';

function App() { 
  const [filePath, setFile] = useState()
  
  const openDialog = () => {
  window.dialog.open();
  window.dialog.getFilePath(setFile);
}
  useEffect(() => {
    return () => {
      window.dialog.removeEventListener();
    }
  }, [])

  useEffect(() => {
    console.log(filePath)
  }, [filePath])

  return (
    <div className="App">
      <DialogButton onClick={openDialog}></DialogButton>
      <audio  src={filePath} controls></audio>
    </div>
  );
}

export default App;
