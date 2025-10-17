import React, { useEffect, useState, useMemo } from "react";
import { db, ref, onValue } from "./firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Format timestamps for chart display
const formatTime = (timestamp, range) => {
  const date = new Date(timestamp);
  switch (range) {
    case "1d":
    case "5d":
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    case "1m":
    case "3m":
    case "6m":
      return date.toLocaleDateString([], { day: "2-digit", month: "short" });
    case "1y":
    case "all":
      return date.toLocaleDateString([], { month: "short", year: "numeric" });
    default:
      return date.toLocaleString();
  }
};

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState("1d");

  // --- Fetch data from Firebase ---
  useEffect(() => {
    const sensorRef = ref(db, "sensorData");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const rawData = snapshot.val();
      if (!rawData) return;

      const formatted = Object.keys(rawData)
        .map((key) => {
          const year = +key.substring(0, 4);
          const month = +key.substring(4, 6) - 1;
          const day = +key.substring(6, 8);
          const hour = +key.substring(9, 11);
          const minute = +key.substring(11, 13);
          const second = +key.substring(13, 15);
          const timestamp = new Date(year, month, day, hour, minute, second).getTime();
          return {
            time: timestamp,
            humidity: rawData[key].humidity,
            light: rawData[key].light,
            temperature: rawData[key].temperature,
          };
        })
        .sort((a, b) => a.time - b.time);

      setData(formatted);
    });

    return () => unsubscribe();
  }, []);

  // --- Filter data by selected time window ---
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    const now = Date.now();
    const ranges = {
      "1d": now - 86400000,
      "5d": now - 5 * 86400000,
      "1m": now - 30 * 86400000,
      "3m": now - 90 * 86400000,
      "6m": now - 180 * 86400000,
      "1y": now - 365 * 86400000,
      "all": 0,
    };
    return data.filter((d) => d.time >= (ranges[timeWindow] ?? 0));
  }, [data, timeWindow]);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>🌱 AgRo Greenhouse Dashboard 🌱</h2>

      {/* Time range selector */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Select Time Range:</label>
        <select
          value={timeWindow}
          onChange={(e) => setTimeWindow(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="1d">1 Day</option>
          <option value="5d">5 Days</option>
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="6m">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* Humidity Chart */}
      <h3>💧 Humidity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(t) => formatTime(t, timeWindow)} />
          <YAxis />
          <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
          <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Light Chart */}
      <h3>💡 Light</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(t) => formatTime(t, timeWindow)} />
          <YAxis />
          <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
          <Line type="monotone" dataKey="light" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      {/* Temperature Chart */}
      <h3>🌡️ Temperature</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(t) => formatTime(t, timeWindow)} />
          <YAxis />
          <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
