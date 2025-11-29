import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import DefectDetector from './pages/DefectDetector';
import OptimizerAgent from './pages/OptimizerAgent';
import Home from './pages/Home';
import ComprehensiveDashboard from './pages/ComprehensiveDashboard';
import DetectionLayer from './pages/DetectionLayer';
import SafetyLayer from './pages/SafetyLayer';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comprehensive" element={<ComprehensiveDashboard />} />
              <Route path="/defect-detector" element={<DefectDetector />} />
              <Route path="/detection-layer" element={<DetectionLayer />} />
              <Route path="/safety-layer" element={<SafetyLayer />} />
              <Route path="/optimizer" element={<OptimizerAgent />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
