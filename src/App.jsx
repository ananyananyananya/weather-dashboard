import { useState, useEffect, useRef } from "react"
import StatCard from "./components/StatCard"
import SensorChart from "./components/SensorChart"

const DUMMY_DATA = {
  temperature: 28.4,
  humidity: 65.2,
  pressure: 1013.1,
  uv_index: 3.2,
  co2: 450,
  tvoc: 12,
  timestamp: "14:32:05"
}

export default function App() {
  const [latest, setLatest] = useState(DUMMY_DATA)
  const [history, setHistory] = useState([DUMMY_DATA])
  const [connected, setConnected] = useState(false)
  const wsRef = useRef(null)

  useEffect(() => {
    // Simulate incoming data every 3 seconds (swap this for real WebSocket later)
    const interval = setInterval(() => {
      const newData = {
        temperature: +(28 + Math.random() * 4).toFixed(1),
        humidity: +(60 + Math.random() * 10).toFixed(1),
        pressure: +(1010 + Math.random() * 8).toFixed(1),
        uv_index: +(Math.random() * 8).toFixed(1),
        co2: Math.floor(400 + Math.random() * 200),
        tvoc: Math.floor(5 + Math.random() * 30),
        timestamp: new Date().toLocaleTimeString()
      }
      setLatest(newData)
      setHistory(prev => [...prev.slice(-49), newData])
    }, 3000)

    return () => clearInterval(interval)
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