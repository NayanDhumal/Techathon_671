import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "./components/MainComponent"; // Home Page
import PredictionPage from "./components/Model"; // Prediction Page
import Chatbot from "./components/chatbot";
import HealthTips from "./components/HealthTips";
import Simulation from "./components/simulation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/health-tips" element={<HealthTips />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </Router>
  );
}

export default App;

