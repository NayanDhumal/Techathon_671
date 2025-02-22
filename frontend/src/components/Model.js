"use client";
import React, { useState } from "react";

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

  const tooltips = {
    acetone: "Elevated levels may indicate diabetes or ketosis",
    nitric_oxide: "Important for respiratory health assessment",
    isoprene: "Related to cholesterol synthesis",
    ammonia: "Can indicate kidney or liver dysfunction",
    methane: "Associated with gut microbiome activity",
    hydrogen_sulfide: "May indicate bacterial growth",
    carbon_monoxide: "Important for smoking-related conditions",
    hydrogen: "Related to gut bacterial fermentation",
    ethanol: "Can indicate yeast overgrowth or diabetes",
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
      const response = await fetch("/api/create-reading", {
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
                  <span title={tooltips[key]}>
                    <i className="fas fa-info-circle ml-2 text-gray-400 cursor-help"></i>
                  </span>
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
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-md font-inter hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </span>
                ) : (
                  "Analyze Sample"
                )}
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-inter mb-4">
              Analysis Results
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              {result.prediction ? (
                <p className="text-lg font-semibold text-green-600">
                  Predicted Disease: {result.prediction}
                </p>
              ) : (
                <pre className="text-sm text-gray-700 dark:text-gray-300 font-inter whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Model;
