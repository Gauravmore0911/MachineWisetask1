import React, { useEffect, useState } from "react";

export default function App() {
  const [sensorData, setSensorData] = useState({
    current: 0,
    voltage: 0,
    temperature: 0,
    vibration: 0,
    status: "Healthy",
  });

  // Function to simulate sensor data
  const generateMockData = () => {
    const temperature = Math.floor(Math.random() * 120); // 0-120 °C
    const vibration = Math.floor(Math.random() * 40); // 0-40 mm/s
    const current = (Math.random() * 100).toFixed(2); // Amps
    const voltage = (Math.random() * 480).toFixed(2); // Volts

    // Apply status logic
    let status = "Healthy";
    if (temperature > 80 && vibration > 20) {
      status = "Critical";
      alert(" Critical Alert: High Temperature & Vibration!");
    } else if (temperature > 80 || vibration > 20) {
      status = "Warning";
      alert(" Warning: Threshold exceeded!");
    }

    return { current, voltage, temperature, vibration, status };
  };

  // Update every 5 seconds
  useEffect(() => {
    const updateData = () => {
      setSensorData(generateMockData());
    };

    updateData(); // initial run
    const interval = setInterval(updateData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontFamily: "system-ui, Arial, sans-serif",
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
         Machine Sensor Dashboard
      </h1>

      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          padding: 20,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <p>
          <strong> Current:</strong> {sensorData.current} A
        </p>
        <p>
          <strong> Voltage:</strong> {sensorData.voltage} V
        </p>
        <p>
          <strong> Temperature:</strong> {sensorData.temperature} °C
        </p>
        <p>
          <strong> Vibration:</strong> {sensorData.vibration} mm/s
        </p>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginTop: 20,
            color:
              sensorData.status === "Critical"
                ? "red"
                : sensorData.status === "Warning"
                ? "orange"
                : "green",
          }}
        >
          Status: {sensorData.status}
        </p>
      </div>
    </div>
  );
}
