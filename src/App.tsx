import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const MainScreen = lazy(() => import('./pages/Main/index'));
/**
 * @returns {JSX.Element} The main Application
 */
function App(): JSX.Element {
  return (
    <Router>
      <React.Suspense >
        <Routes>
          <Route
            path="/"
            element={<Navigate to="RegisterPage/" />}
          />
          <Route path="RegisterPage/" element={<MainScreen />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
