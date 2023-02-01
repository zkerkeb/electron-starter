import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SystemText } from '../texts'



const Dashboard = () => {
  const { requestSystemInfo, getSystemInfo, cleanSystemInfo } = window.electron
  const [systemInfo, setSystemInfo] = useState({})
  const timerRef = React.useRef(null)

  const getAllInfo = async () => {
    await requestSystemInfo()
    getSystemInfo(setSystemInfo)
  }

  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
    getAllInfo()
    }, 1000)

    return () => {
      cleanSystemInfo()
    clearInterval(timerRef.current)

    }
  }, [])

  return ( 
  <Container>   
  <SystemText>  
    System Info
  </SystemText>
  <SystemInfos>
    <p>Platform: {systemInfo.platform}</p> 
    <p>Version: {systemInfo.version}</p>
    <p>CPU Usage: {systemInfo.cpuUsage?.percentCPUUsage}</p>
    <p>Memory Usage: {systemInfo.memoryUsage?.free} / {systemInfo.memoryUsage?.total}</p>
  </SystemInfos>
  </Container>
  )
}

const SystemInfos = styled.div`

`

const Container = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  background-color: #222222;
  min-height: 100vh;
`

export default Dashboard
