import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "./components/MainComponent"; // Home Page
import PredictionPage from "./components/Model"; // Prediction Page
import Chatbot from "./components/chatbot";
import HealthTips from "./components/HealthTips";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/health-tips" element={<HealthTips />} />
      </Routes>
    </Router>
  );
}

export default App;

