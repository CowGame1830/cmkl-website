import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import DefectDetector from './pages/DefectDetector';
import OptimizerAgent from './pages/OptimizerAgent';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/defect-detector" element={<DefectDetector />} />
                  <Route path="/optimizer" element={<OptimizerAgent />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
