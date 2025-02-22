"use client";
import React from "react";
import { useState } from "react";


function MainComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                BreathAI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/prediction"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
              >
                Prediction Model
              </a>
              <a
                href="/chatbot"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
              >
                AI Health Assistant
              </a>
              <a
                href="/health-tips"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
              >
                Health Tips
              </a>
              <a
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
              >
                About Us
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/prediction"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 font-inter"
              >
                Prediction Model
              </a>
              <a
                href="/chatbot"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 font-inter"
              >
                AI Health Assistant
              </a>
              <a
                href="/health-tips"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 font-inter"
              >
                Health Tips
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 font-inter"
              >
                About Us
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-inter mb-4">
                Early Disease Detection Through AI Breath Analysis
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-inter mb-8">
                Advanced artificial intelligence technology to detect early
                signs of disease through breath analysis
              </p>
              <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-md font-inter hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-all">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="https://media.istockphoto.com/id/530196490/photo/3d-illustration-of-lungs-medical-concept.jpg?s=612x612&w=0&k=20&c=JWac3KM2myfIS5O8vcMXXnBlSQiOGeN7h2OZUvzwgPI="
                alt="AI-powered medical analysis visualization"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-inter text-center mb-12">
              Our Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                <i className="fas fa-chart-line text-4xl text-gray-900 dark:text-white mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-2">
                  Prediction Model
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-inter mb-4">
                  Advanced AI algorithms analyze breath patterns to predict
                  potential health issues
                </p>
                <a
                  href="/prediction"
                  className="text-gray-900 dark:text-white font-inter hover:underline"
                >
                  Learn more →
                </a>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                <i className="fas fa-robot text-4xl text-gray-900 dark:text-white mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-2">
                  AI Health Assistant
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-inter mb-4">
                  24/7 AI-powered health assistant to answer your medical
                  queries
                </p>
                <a
                  href="/chatbot"
                  className="text-gray-900 dark:text-white font-inter hover:underline"
                >
                  Learn more →
                </a>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                <i className="fas fa-heart text-4xl text-gray-900 dark:text-white mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-2">
                  Health Lifestyle Tips
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-inter mb-4">
                  Personalized recommendations for maintaining optimal health
                </p>
                <a
                  href="/health-tips"
                  className="text-gray-900 dark:text-white font-inter hover:underline"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-inter text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-2">
                Breath Sample
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-inter">
                Provide a breath sample using our specialized device
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-2">
                AI Analysis
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-inter">
                Our AI processes the sample using advanced algorithms
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-2">
                Results & Recommendations
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-inter">
                Receive detailed analysis and personalized health insights
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainComponent;