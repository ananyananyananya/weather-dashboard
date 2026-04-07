import { useState, useEffect, useRef } from "react"
import StatCard from "./components/StatCard"
import SensorChart from "./components/SensorChart"

export default function App() {
  const [latest, setLatest] = useState({})
  const [history, setHistory] = useState([])
  const [connected, setConnected] = useState(false)
  const wsRef = useRef(null)

  useEffect(() => {
    const ws = new WebSocket("ws://ESP32_IP_ADDRESS/ws")

    ws.onopen = () => setConnected(true)
    ws.onclose = () => setConnected(false)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setLatest(data)
      setHistory(prev => [...prev.slice(-49), data])
    }

    wsRef.current = ws
    return () => ws.close()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>ESP32 Weather Station</h1>
        <span className={`status ${connected ? "online" : "offline"}`}>
          {connected ? "● Live" : "● Simulated"}
        </span>
      </header>

      <div className="dashboard">
        <div className="left">
          <div className="cards">
            <StatCard label="Temperature" value={latest.temperature} unit="°C" />
            <StatCard label="Humidity" value={latest.humidity} unit="%" />
            <StatCard label="Pressure" value={latest.pressure} unit="hPa" />
            <StatCard label="UV Index" value={latest.uv_index} unit="" />
            <StatCard label="CO₂" value={latest.co2} unit="ppm" />
            <StatCard label="TVOC" value={latest.tvoc} unit="ppb" />
          </div>
        </div>
        <div className="right">
          <SensorChart title="Temperature (°C)" dataKey="temperature" color="#ff6b6b" history={history} />
          <SensorChart title="Humidity (%)" dataKey="humidity" color="#4ecdc4" history={history} />
          <SensorChart title="CO₂ (ppm)" dataKey="co2" color="#45b7d1" history={history} />
       </div>
      </div>

      <footer>Last updated: {latest.timestamp}</footer>
    </div>
  )
}