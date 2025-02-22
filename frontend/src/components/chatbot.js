"use client";
import React, { useState, useEffect, useRef } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm your AI Health Assistant. I can help you with general health questions, interpreting breath analysis results, and providing health recommendations. Please note that I'm not a replacement for professional medical advice - always consult with healthcare professionals for medical decisions.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { type: "user", content: inputMessage.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { type: "ai", content: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "I apologize, but I'm having trouble responding right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white font-inter">
                BreathAI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["Prediction", "chatbot", "Health Tips", "About Us"].map((item, index) => (
                <a
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-inter"
                >
                  {item}
                </a>
              ))}
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
              {["Prediction Model", "AI Health Assistant", "Health Tips", "About Us"].map((item, index) => (
                <a
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 font-inter"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Chatbot Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter mb-4">
            AI Health Assistant
          </h1>
          <p className="text-gray-700 dark:text-gray-300 font-inter">
            Get instant answers to your health questions, understand your breath
            analysis results, and receive personalized health recommendations.
            Remember, this AI assistant provides general guidance only - always
            consult healthcare professionals for medical advice.
          </p>
        </div>

        {/* Chat Window */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="h-[500px] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.type === "ai" ? "flex justify-start" : "flex justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 font-inter ${
                    message.type === "ai"
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <i className="fas fa-spinner fa-spin text-gray-900 dark:text-white"></i>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="border-t border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gray-500 focus:border-gray-500 font-inter"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-md font-inter hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-all disabled:opacity-50"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
