"use client";
import React, { useState } from "react";

function HealthTips() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [disease, setDisease] = useState("");
  const [lifestyleFactors, setLifestyleFactors] = useState("");

  const fetchHealthTips = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disease: disease,
          lifestyle_factors: lifestyleFactors.split(",").map((f) => f.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch health tips");
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      setRecommendation(result.recommendation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                BreathAI
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Get Personalized Health Recommendations
        </h1>

        <form onSubmit={fetchHealthTips} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <div>
            <label className="block text-gray-900 dark:text-white font-medium">Disease</label>
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter disease name (e.g., Diabetes, Asthma)"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 dark:text-white font-medium">Lifestyle Factors</label>
            <input
              type="text"
              value={lifestyleFactors}
              onChange={(e) => setLifestyleFactors(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter lifestyle factors (e.g., Sedentary, High Sugar Intake)"
              required
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Enter multiple factors separated by commas.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
          >
            {loading ? "Generating..." : "Get Recommendations"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-500">
            <i className="fas fa-exclamation-circle"></i> {error}
          </p>
        )}

        {recommendation && (
          <div className="mt-6 bg-green-100 dark:bg-green-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Personalized Health Plan</h2>
            <ul className="list-disc list-inside text-gray-900 dark:text-white space-y-2">
            {recommendation.split("\n").map((point, index) => (
                <li key={index}>{point.replace("•", "").trim()}</li>
            ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthTips;
