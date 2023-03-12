import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState({set:false})
  const [sources, setSources] = useState([])
  const [sourceId, setSourceId] = useState(null)
  const refreshRef = React.useRef(null)
  // const constraints = {
    // audio: false,
    // video: {
    //   mandatory: {
    //     chromeMediaSource: 'desktop',
    //   }
    // }
  // }

  const getStatus =async () => { 
     await window.electron.getStatus()
     window.electron.storeStatus(setStatus)
  }
  const getSources = async () => {
    await window.electron.getSources()
    window.electron.storeSources(setSources)
  }

  useEffect(() => {
    getStatus()
    clearInterval(refreshRef.current)
    refreshRef.current = setInterval(() => {
    getSources()
    }, 1000)
    return () => clearInterval(refreshRef.current)
  }, [])


  useEffect(() => {
    console.log("🚀 ~ file: App.js:12 ~ useEffect: ~ sourceId", sourceId)
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    })
    .then(stream => { 
      console.log(stream)
      const video = document.querySelector('video')
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    }).catch(err => console.log(err))

  }, [sourceId])


  return (
    <div className="App">
      <header  className="App-header">
          <video  width={720} style={{
            backgroundColor: 'grey'
          }} ></video>
      <button>Capture d'ecran</button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      {sources.map((source, index) => {
        return (
          <div key={index}>
            <button onClick={() => setSourceId(source.id)}>{source.name}</button>
          </div>
        )
      }
      )}
      </div>
      </header>
    </div>
  );
}

export default App;
