// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LicenseKeyPage from './components/LicenseKeyPage';
import Footer from './components/Footer';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';

const Main = () => {
  const location = useLocation();
  const definedPaths = ['/', '/customer-data', '/license-key'];
  const isNotFoundPage = !definedPaths.includes(location.pathname)

  return (
    <>
      {!isNotFoundPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer-data" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/license-key" element={
          <PrivateRoute>
            <LicenseKeyPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>
      {!isNotFoundPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Main />
  )
}

export default App;