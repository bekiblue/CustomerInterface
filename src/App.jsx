import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LicenseKeyPage from './components/LicenseKeyPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/license-key" element={<LicenseKeyPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;