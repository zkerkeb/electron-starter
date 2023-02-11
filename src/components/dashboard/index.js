import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SystemTitle, SystemValue } from '../texts'

const Dashboard = () => {
  const {
    requestSystemInfo,
    getSystemInfo,
    cleanSystemInfo,
    alertNotification
  } = window.electron
  const [ramWarning, setRamWarning] = useState(false)
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

  useEffect(() => {
    if (!ramWarning) {
      if (systemInfo.memoryUsage?.free / systemInfo.memoryUsage?.total > 0.8) {
        setRamWarning(true)
        alertNotification()
      }
    }
    if (ramWarning) {
      if (systemInfo.memoryUsage?.free / systemInfo.memoryUsage?.total < 0.8) {
        setRamWarning(false)
      }
    }
  }, [systemInfo])

  return (
    <Container>
      <SystemTitle>System Info</SystemTitle>
      <SystemInfos>
        <SystemRow>
          <SystemValue>Platform: {systemInfo.platform}</SystemValue>
        </SystemRow>
        <SystemRow>
          <SystemValue>Version: {systemInfo.version}</SystemValue>
        </SystemRow>
        <SystemRow>
          <SystemValue>
            CPU Usage: {Math.trunc(systemInfo.cpuUsage?.percentCPUUsage * 100)}%
          </SystemValue>
        </SystemRow>
        <SystemRow>
          <SystemValue>
            Memory Usage: {convertByteToMB(systemInfo.memoryUsage?.free)} MB /{' '}
            {convertByteToMB(systemInfo.memoryUsage?.total)} MB
          </SystemValue>
        </SystemRow>
      </SystemInfos>
    </Container>
  )
}

// convert byte to MB
const convertByteToMB = bytes => {
  return Math.trunc(bytes / 1024)
}

const SystemRow = styled.div`
  display: flex;
`

const SystemInfos = styled.div``

const Container = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  background-color: #222222;
  min-height: 100vh;
`

export default Dashboard
