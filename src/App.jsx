import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Audio from "./pages/Audio";
import PosterGenerator from "./pages/PosterGenerator";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/poster" element={<PosterGenerator />} />
      </Routes>
    </Router>
  );
}