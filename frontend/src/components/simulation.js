import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Simulation() {
  const [sensorData, setSensorData] = useState({
    acetone: 0,
    nitric_oxide: 0,
    isoprene: 0,
    ammonia: 0,
    methane: 0,
    hydrogen_sulfide: 0,
    carbon_monoxide: 0,
    hydrogen: 0,
    ethanol: 0,
  });

  const [prediction, setPrediction] = useState("Analyzing...");

  useEffect(() => {
    const interval = setInterval(() => {
      const newSensorData = {
        acetone: parseFloat((Math.random() * 5).toFixed(2)),
        nitric_oxide: parseFloat((Math.random() * 5).toFixed(2)),
        isoprene: parseFloat((Math.random() * 5).toFixed(2)),
        ammonia: parseFloat((Math.random() * 5).toFixed(2)),
        methane: parseFloat((Math.random() * 5).toFixed(2)),
        hydrogen_sulfide: parseFloat((Math.random() * 5).toFixed(2)),
        carbon_monoxide: parseFloat((Math.random() * 5).toFixed(2)),
        hydrogen: parseFloat((Math.random() * 5).toFixed(2)),
        ethanol: parseFloat((Math.random() * 5).toFixed(2)),
      };
      setSensorData(newSensorData);

      // Send data to backend for prediction
      fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sensors: newSensorData }),
      })
        .then((response) => response.json())
        .then((data) => setPrediction(data.prediction))
        .catch((error) => console.error("Error fetching prediction:", error));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Breath Analysis Simulation</h1>
      
      {/* Human Animation with Exhalation Effect */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Human Figure with Breathing Effect */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-24 h-40 bg-gray-300 rounded-lg flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 bg-gray-500 rounded-full"></div> {/* Head */}
          <div className="w-16 h-24 bg-gray-400 mt-2"></div> {/* Body */}
        </motion.div>
        
        {/* Exhalation Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-14 h-14 bg-blue-400 rounded-full absolute top-20 left-16"
        ></motion.div>
      </motion.div>
      <p className="text-lg mt-4">Simulated Exhalation</p>

      {/* Display Simulated Sensor Data */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg w-72 text-center">
        {Object.entries(sensorData).map(([key, value]) => (
          <motion.p key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <strong>{key.replace("_", " ")}:</strong> {value} ppm
          </motion.p>
        ))}
      </div>
      
      {/* Display Prediction */}
      <div className="mt-4 bg-gray-700 p-4 rounded-lg shadow-lg w-72 text-center">
        <h2 className="text-xl font-semibold">Prediction</h2>
        <motion.p className="text-lg font-bold mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {prediction}
        </motion.p>
      </div>
    </div>
  );
}
