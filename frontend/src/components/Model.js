"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";

function Model() {
  const [formData, setFormData] = useState({
    acetone: "",
    nitric_oxide: "",
    isoprene: "",
    ammonia: "",
    methane: "",
    hydrogen_sulfide: "",
    carbon_monoxide: "",
    hydrogen: "",
    ethanol: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const ranges = {
    acetone: { min: 0, max: 1000, unit: "ppb" },
    nitric_oxide: { min: 0, max: 500, unit: "ppb" },
    isoprene: { min: 0, max: 400, unit: "ppb" },
    ammonia: { min: 0, max: 2000, unit: "ppb" },
    methane: { min: 0, max: 100, unit: "ppm" },
    hydrogen_sulfide: { min: 0, max: 100, unit: "ppb" },
    carbon_monoxide: { min: 0, max: 100, unit: "ppm" },
    hydrogen: { min: 0, max: 100, unit: "ppm" },
    ethanol: { min: 0, max: 1000, unit: "ppb" },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        return `Please fill in the ${key.replace("_", " ")} field.`;
      }

      const numValue = Number(value);
      const range = ranges[key];
      if (isNaN(numValue) || numValue < range.min || numValue > range.max) {
        return `${key.replace("_", " ")} must be between ${range.min} and ${range.max} ${range.unit}`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, Number(value)])
          )
        ),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to submit reading. Please try again.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Disease Prediction Report", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Predicted Disease: ${result.disease}`, 20, 40);
    doc.text("Biomarker Values:", 20, 60);
    Object.entries(formData).forEach(([key, value], index) => {
      doc.text(`${key.replace("_", " ")}: ${value} ${ranges[key].unit}`, 20, 70 + index * 10);
    });
    doc.save("Disease_Prediction_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-inter mb-4">
            Breath Analysis Prediction Model
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-inter">
            Enter biomarker values from your breath sample for AI analysis
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(ranges).map(([key, range]) => (
                <div key={key} className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-2">
                    {key.replace("_", " ").charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")}
                    <span className="ml-1 text-gray-500">({range.unit})</span>
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    min={range.min}
                    max={range.max}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-inter"
                    placeholder={`${range.min}-${range.max}`}
                    required
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm font-inter mt-2">
                {error}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button type="submit" disabled={loading} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-md font-inter">
                {loading ? "Processing..." : "Analyze Sample"}
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className="mt-12 flex flex-col items-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.disease}
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Recommendations</button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg">Chatbot</button>
              <button onClick={generatePDF} className="px-6 py-2 bg-red-500 text-white rounded-lg">Download Report</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Model;
