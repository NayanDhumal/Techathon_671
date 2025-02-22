"use client";
import React, { useState, useEffect } from "react";

function HealthTips() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tips, setTips] = useState([]);
  const [expandedCards, setExpandedCards] = useState(new Set());

  const fetchHealthTips = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/get-health-tips", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch health tips");
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      setTips(result);
      setExpandedCards(new Set());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);

  const toggleCard = (index) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-gray-900 dark:text-white mb-4"></i>
          <p className="text-gray-700 dark:text-gray-300 font-inter">
            Loading health tips...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-700 dark:text-gray-300 font-inter">{error}</p>
          <button
            onClick={fetchHealthTips}
            className="mt-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-md font-inter"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-inter mb-4">
            Health Tips
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-inter">
            Stay healthy with these AI-generated wellness tips.
          </p>
        </div>

        <div className="space-y-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleCard(index)}
                className="w-full text-left p-6 focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                    {tip.title}
                  </h3>
                  <i
                    className={`fas fa-chevron-${expandedCards.has(index) ? "up" : "down"} text-gray-900 dark:text-white transition-transform duration-300`}
                  ></i>
                </div>
              </button>
              <div className={`px-6 pb-6 ${expandedCards.has(index) ? "block" : "hidden"}`}>
                <p className="text-gray-900 dark:text-white font-inter mb-4">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={fetchHealthTips}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-md font-inter hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-all"
          >
            Refresh Tips
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealthTips;
