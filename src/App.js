import logo from './logo.svg';     
import './App.css'; 
import { useEffect, useState } from 'react';  
import Dashboard from './components/dashboard'
   
function App() { 
  console.log('electron', window.electron)

 
  return (
    <Dashboard/> 
      
    );
}

export default App;
  