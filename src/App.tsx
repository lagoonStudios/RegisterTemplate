import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const MainScreen = lazy(() => import('./pages/Main/index'));
/**
 * @returns {React.ReactNode} The main Application
 */
function App(): React.ReactNode {
  return (
    <Router>
      <React.Suspense >
        <Routes>
          <Route path="/" element={<MainScreen />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
