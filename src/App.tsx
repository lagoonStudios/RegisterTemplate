import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const RegisterScreen = lazy(() => import('./pages/Register/index'));
const LoginScreen = lazy(() => import('./pages/Login/index'));
/**
 * @returns {JSX.Element} The main Application
 */
function App(): JSX.Element {
  return (
      <Router>
        <React.Suspense >
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </React.Suspense>
      </Router>
  );
}

export default App;
